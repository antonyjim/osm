/*
    Set the delimiter to declare procedures
*/
DELIMITER //

/*
	Validate every endpoint on every request
*/
    DROP FUNCTION IF EXISTS endpoint_validation //
    CREATE FUNCTION endpoint_validation (_role CHAR(7), _path VARCHAR(120), _method VARCHAR(6))
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
                    sys_navigation.navPriv = sys_role.role_priv
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

/* Create new users */
DROP PROCEDURE IF EXISTS newUser //
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
                sys_id,
                userName,
                userPass,
                email,
                userDefaultNonsig,
                userIsLocked,
                userIsConfirmed,
                userConfirmation,
                userFirstName,
                userLastName,
                userPhone
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
                _userConfirmation,
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

/* Update user passwords */
DROP FUNCTION IF EXISTS changePassword //
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
            sys_id = _userId;

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

/* Confirm new users */
DROP FUNCTION IF EXISTS confirmUser //
CREATE FUNCTION confirmUser(_confirmation CHAR(36), _password BINARY(60))
    RETURNS BOOLEAN
    BEGIN
        DECLARE _storedConfirmation CHAR(36);
        DECLARE _userId CHAR(36);

        SELECT
            userConfirmation,
            sys_id
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
                sys_id = _userId;
        ELSE RETURN 1;
        END IF;
        RETURN 0;
    END //

/* Set the forgot password indicator */
DROP FUNCTION IF EXISTS setForgotPassword //
CREATE FUNCTION setForgotPassword(_userName VARCHAR(36), _userEmail VARCHAR(90), _passwordResetToken CHAR(36))
    RETURNS VARCHAR(90)
    BEGIN
        DECLARE _userId CHAR(36);
        DECLARE _resolvedEmail VARCHAR(90);
        IF NOT ISNULL(_userName) THEN
            SELECT
                sys_id,
                email
            INTO
                _userId,
                _resolvedEmail
            FROM
                sys_user
            WHERE
                userName = _userName;
        ELSEIF NOT ISNULL(_userEmail) THEN
            SELECT
                sys_id,
                email
            INTO
                _userId,
                _resolvedEmail
            FROM
                sys_user
            WHERE
                email = _userEmail;
        ELSE RETURN NULL;
	END IF;

    IF NOT ISNULL(_userId) THEN
        UPDATE 
            sys_user
        SET
            userConfirmation = _passwordResetToken,
            userAwaitingPassword = 1
	    WHERE
		sys_id = _userId;
    ELSE RETURN NULL;
	END IF;
        RETURN _resolvedEmail;
    END //

/* Add new customers */
DROP FUNCTION IF EXISTS AddCustomer //
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
	END IF; 
       RETURN 0;
    END //

DROP FUNCTION IF EXISTS tbl_validation //
CREATE FUNCTION tbl_validation (
    _role CHAR(7),
    _table VARCHAR(40),
    _action VARCHAR(10)
)
RETURNS BOOLEAN
BEGIN
    DECLARE _authorized BOOLEAN;
    DECLARE _authorized_for_own BOOLEAN;
    DECLARE _priv VARCHAR(36);

    IF _action = 'SELECT' THEN
        SELECT
            auth_can_read
        FROM
            (
                SELECT
                    sys_authorization.auth_can_read,
                    sys_role.*,
                    sys_db_object.name
                FROM
                    sys_authorization
                INNER JOIN
                    sys_db_object
                ON
                    sys_authorization.auth_table = sys_db_object.sys_id
                INNER JOIN
                    sys_role
                ON
                    sys_authorization.auth_priv
                    = sys_role.role_priv
                WHERE
                    rpId = _role
                AND
                    sys_db_object.name = _table
                ORDER BY
                    sys_authorization.auth_can_read_own,
                    sys_authorization.auth_can_read
                DESC
                LIMIT 1
            ) 
            AS authed
        INTO
            _authorized;
        RETURN _authorized;
    ELSEIF _action = 'INSERT' THEN
        SELECT
            auth_can_create
        FROM
            (
                SELECT
                    sys_authorization.auth_can_create,
                    sys_role.*,
                    sys_db_object.name
                FROM
                    sys_authorization
                INNER JOIN
                    sys_db_object
                ON
                    sys_authorization.auth_table = sys_db_object.sys_id
                INNER JOIN
                    sys_role
                ON
                    sys_authorization.auth_priv
                    = sys_role.role_priv
                WHERE
                    rpId = _role
                AND
                    sys_db_object.name = _table
                ORDER BY
                    sys_authorization.auth_can_create_own,
                    sys_authorization.auth_can_create
                DESC
                LIMIT 1
            ) 
            AS authed
        INTO
            _authorized;
        RETURN _authorized;
    ELSEIF _action = 'UPDATE' THEN
        SELECT
            auth_can_edit
        FROM
            (
                SELECT
                    sys_authorization.auth_can_edit,
                    sys_role.*,
                    sys_db_object.name
                FROM
                    sys_authorization
                INNER JOIN
                    sys_db_object
                ON
                    sys_authorization.auth_table = sys_db_object.sys_id
                INNER JOIN
                    sys_role
                ON
                    sys_authorization.auth_priv
                    = sys_role.role_priv
                WHERE
                    rpId = _role
                AND
                    sys_db_object.name = _table
                ORDER BY
                    sys_authorization.auth_can_edit_own,
                    sys_authorization.auth_can_edit
                DESC
                LIMIT 1
            ) 
            AS authed
        INTO
            _authorized;
        RETURN _authorized;
    ELSEIF _action = 'DELETE' THEN
        SELECT
            auth_can_delete
        FROM
            (
                SELECT
                    sys_authorization.auth_can_delete,
                    sys_role.*,
                    sys_db_object.name
                FROM
                    sys_authorization
                INNER JOIN
                    sys_db_object
                ON
                    sys_authorization.auth_table = sys_db_object.sys_id
                INNER JOIN
                    sys_role
                ON
                    sys_authorization.auth_priv
                    = sys_role.role_priv
                WHERE
                    rpId = _role
                AND
                    sys_db_object.name = _table
                ORDER BY
                    sys_authorization.auth_can_delete_own,
                    sys_authorization.auth_can_delete
                DESC
                LIMIT 1
            ) 
            AS authed
        INTO
            _authorized;
        RETURN _authorized;
    ELSE RETURN 0;
    END IF;
    RETURN 0;
END //

/* DROP PROCEDURE IF EXISTS create_table //
CREATE PROCEDURE create_table (
    IN _table_name VARCHAR(40),
    IN _table_id CHAR(36)
)
BEGIN
    DECLARE _existing_table_id CHAR(36);
    DECLARE _statement VARCHAR(255);

    SET _statement = CONCAT(
        'CREATE TABLE IF NOT EXISTS ',
        _table_name,
        ' (',
            'PRIMARY KEY(sys_id),',
            'sys_id CHAR(36)',
        ');'
    );
    PREPARE stmt FROM _statement;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;


    SELECT sys_id 
    INTO  _existing_table_id 
    FROM sys_db_object
    WHERE name = _table_name;

    IF _existing_table_id IS NULL THEN
        INSERT INTO sys_db_object
        (sys_id, name, label)
        VALUES (_table_id, _table_name, label);
        -- RETURN _table_id;
    ELSE
        SET _table_id = _existing_table_id;
    END IF;

    SELECT * FROM sys_db_object WHERE sys_id = _table_id;

END // */
DELIMITER ;
