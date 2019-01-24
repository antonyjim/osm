-- Create all procedures
DELIMITER //
CREATE PROCEDURE thq.getNavigation (IN role CHAR(36))
    BEGIN
        SELECT
            sys_navigation.*,
            sys_role.*
        FROM 
            sys_role
        INNER JOIN
            sys_navigation
        ON
            sys_navigation.navPriv = sys_role.rpPriv
        WHERE 
            navIsNotApi = 1
        AND
            rpId = @role;
    END //

CREATE PROCEDURE thq.addNav(
        IN _navInnerText VARCHAR(40),
        IN _navPathName VARCHAR(120),
        IN _navQueryString VARCHAR(120),
        IN _navMethod VARCHAR(6),
        IN _navHeader VARCHAR(40),
        IN _navMenu VARCHAR(40),
        IN _navActive BOOLEAN,
        IN _navPriv VARCHAR(36),
        IN _navIsNotApi BOOLEAN
    )
    BEGIN
        INSERT INTO sys_navigation (
            navInnerText,
            navPathName,
            navQueryString,
            navMethod,
            navHeader,
            navMenu,
            navActive, 
            navPriv,
            navIsNotApi
        ) VALUES (
            _navInnerText,
            _navPathName,
            _navQueryString,
            _navMethod,
            _navHeader,
            _navMenu,
            _navActive,
            _navPriv,
            _navIsNotApi
        );
    END//

    CREATE FUNCTION endpointValidation (_role CHAR(7), _path VARCHAR(120), _method VARCHAR(6))
        RETURNS BOOLEAN
        BEGIN
            DECLARE _authorized BOOLEAN;
            SELECT navActive
            FROM 
            (
                SELECT 
                    sys_navigation.navActive,
                    sys_role.*
                FROM
                    sys_navigation
                INNER JOIN
                    sys_role
                ON
                    sys_navigation.navPriv = sys_role.rpPriv
                WHERE
                    navActive = 1
                AND
                    rpId = _role
                AND
                    navPathName = _path
                AND
                    navMethod = _method
            ) AS authed
            INTO 
                _authorized;
            
            RETURN _authorized;
        END//

CREATE PROCEDURE newUser (
    IN _userId CHAR(36),
    IN _userName VARCHAR(36),
    IN _userPass BINARY(60),
    IN _userEmail VARCHAR(90),
    IN _userDefaultNonsig BINARY(9),
    IN _userIsLocked BOOLEAN,
    IN _userIsConfirmed BOOLEAN,
    IN _userFirstName VARCHAR(30),
    IN _userLastName VARCHAR(30),
    IN _userPhone VARCHAR(13),
    IN _userConfirmation CHAR(36)
)
    BEGIN
        INSERT INTO sys_user
            (
                userId,
                userName, 
                userPass,
                userEmail,
                userDefaultNonsig,
                userIsLocked,
                userIsConfirmed,
                userConfirmation
            )
        VALUES
            (
                _userId,
                _userName,
                _userPass,
                _userEmail,
                _userDefaultNonsig,
                _userIsLocked,
                _userIsConfirmed,
                _userConfirmation
            );
        
        INSERT INTO userInformation
            (
                userId,
                userFirstName,
                userLastName,
                userPhone
            )
        VALUES 
            (
                _userId,
                _userFirstName,
                _userLastName,
                _userPhone
            );

        INSERT INTO sys_user_nsacl
            (
                nsaUserId,
                nsaNonsig,
                nsaRole,
                nsaIsAdmin,
                nsaConfirmedByAdmin
            )
        VALUES
            (
                _userId,
                _userDefaultNonsig,
                'No-Conf',
                0,
                0
            );
    END//

CREATE FUNCTION changePassword(_userId CHAR(36), _confirmation CHAR(36), _hashedPassword BINARY(60))
    RETURNS BOOLEAN
    BEGIN
        DECLARE _storedConfirmation CHAR(36);
        DECLARE _userPendingPassword BOOLEAN;

        SELECT
            userConfirmation,
            userAwaitingPassword
        INTO
            _storedConfirmation,
            _userPendingPassword
        FROM
            sys_user
        WHERE
            userId = _userId;

        IF _userPendingPassword = 0 THEN RETURN 1;
        ELSE
            IF _storedConfirmation = _confirmation THEN
                UPDATE
                    sys_user
                SET
                    userAwaitingPassword = 0,
                    userPass = _hashedPassword,
                    userConfirmation = NULL;
            ELSE RETURN 1;
            END IF;
        END IF;
        RETURN 0;
    END //

CREATE FUNCTION confirmUser(_confirmation CHAR(36), _password BINARY(60))
    RETURNS BOOLEAN
    BEGIN
        DECLARE _storedConfirmation CHAR(36);
        DECLARE _userId CHAR(36);

        SELECT 
            userConfirmation,
            userId
        INTO
            _storedConfirmation,
            _userId
        FROM
            sys_user
        WHERE
            userConfirmation = _confirmation;

        IF _userID IS NULL THEN RETURN 1;
        END IF;

        IF _storedConfirmation = _confirmation THEN
            UPDATE
                sys_user
            SET
                userIsConfirmed = 1,
                userConfirmation = NULL,
                userPass = _password,
                userAwaitingPassword = 0
            WHERE
                userId = _userId;
        ELSE RETURN 1;
        END IF;
        RETURN 0;
    END //

CREATE FUNCTION setForgotPassword(_userName VARCHAR(36), _userEmail VARCHAR(90), _passwordResetToken CHAR(36))
    RETURNS BOOLEAN
    BEGIN
        DECLARE _userId CHAR(36);

        IF NOT ISNULL(_userName) THEN
            SELECT
                userId
            INTO
                _userId
            FROM
                sys_user
            WHERE
                userName = _userName;
        ELSEIF NOT ISNULL(_userEmail) THEN
            SELECT
                userId
            INTO
                _userId
            FROM
                sys_user
            WHERE
                userEmail = _userEmail;
        ELSE RETURN 1;

        IF NOT ISNULL(_userId) THEN
            UPDATE 
                sys_user
            SET
                userConfirmation = _passwordResetToken,
                userAwaitingPassword = 1;
        ELSE RETURN 1;
        RETURN 0;
    END //

CREATE FUNCTION AddCustomer(
        _nsNonsig CHAR(9),
        _nsTradeStyle VARCHAR(100),
        _nsAddr1 VARCHAR(40),
        _nsAddr2 VARCHAR(40),
        _nsCity VARCHAR(40),
        _nsState CHAR(2),
        _nsCountry CHAR(2),
        _nsPostalCode VARCHAR(10),
        _nsBrandKey VARCHAR(4),
        _nsIsActive BOOLEAN,
        _nsIsActiveTHQ BOOLEAN,
        _nsType CHAR(3)
    )
    RETURNS BOOLEAN
    BEGIN
        DECLARE _nsNonsigExisting CHAR(9);

        SELECT
            nsNonsig
        INTO
            _nsNonsigExisting
        FROM
            sys_customer
        WHERE
            nsNonsig = _nsNonsig;

        IF ISNULL(_nsNonsigExisting) THEN
            INSERT INTO sys_customer
                (
                    nsNonsig,
                    nsTradeStyle,
                    nsAddr1,
                    nsAddr2,
                    nsCity,
                    nsState,
                    nsCountry,
                    nsPostalCode,
                    nsBrandKey,
                    nsIsActive,
                    nsIsActiveTHQ,
                    nsType
                )
            VALUES
                (
                    _nsNonsig,
                    _nsTradeStyle,
                    _nsAddr1,
                    IFNULL(_nsAddr2, ''),
                    _nsCity,
                    _nsState,
                    _nsCountry,
                    _nsPostalCode,
                    _nsBrandKey,
                    _nsIsActive,
                    _nsIsActiveTHQ,
                    _nsType
                );
        ELSE RETURN 1;
        RETURN 0;
    END //
DELIMITER ;