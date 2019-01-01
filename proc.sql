-- Create all procedures
DELIMITER //
CREATE PROCEDURE thq.getNavigation (IN role CHAR(36))
    BEGIN
        SELECT
            navigation.*,
            rolePermissions.*
        FROM 
            rolePermissions
        INNER JOIN
            navigation
        ON
            navigation.navPriv = rolePermissions.rpPriv
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
        INSERT INTO navigation (
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
                    navigation.navActive,
                    rolePermissions.*
                FROM
                    navigation
                INNER JOIN
                    rolePermissions
                ON
                    navigation.navPriv = rolePermissions.rpPriv
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

DELIMITER ;