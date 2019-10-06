/* Update user passwords */
DROP FUNCTION IF EXISTS {{database}}.change_user_password;
CREATE FUNCTION {{database}}.change_user_password(_userId CHAR(36), _confirmation CHAR(36), _hashedPassword BINARY(60))
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
    END ;

/* Confirm new users */
DROP FUNCTION IF EXISTS {{database}}.confirm_new_user ;
CREATE FUNCTION {{database}}.confirm_new_user(_confirmation CHAR(36), _password BINARY(60))
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
    END ;

/* Set the forgot password indicator */
DROP FUNCTION IF EXISTS {{database}}.set_user_password_reset ;
CREATE FUNCTION {{database}}.set_user_password_reset(_userName VARCHAR(36), _userEmail VARCHAR(90), _passwordResetToken CHAR(36))
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
    END ;