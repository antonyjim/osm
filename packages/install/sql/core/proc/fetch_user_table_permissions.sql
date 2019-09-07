/*
    Return a list of user table permissions for the specified table in the specified scope.
*/
DROP PROCEDURE IF EXISTS osm.fetch_user_table_permissions//

CREATE PROCEDURE osm.fetch_user_table_permissions (
    IN user_id CHAR(36),
    IN scope CHAR(3),
    IN table_name VARCHAR(40)
)
BEGIN
    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE can_read BOOLEAN DEFAULT FALSE;
    DECLARE can_edit BOOLEAN DEFAULT FALSE;
    DECLARE can_delete BOOLEAN DEFAULT FALSE;
    DECLARE read_required_role CHAR(36) DEFAULT NULL;
    DECLARE edit_required_role CHAR(36) DEFAULT NULL;
    DECLARE delete_required_role CHAR(36) DEFAULT NULL;
    DECLARE local_role CHAR(36) DEFAULT NULL;

    /* Declare the cursor for all roles assigned to the specified user */
    DECLARE role_cursor CURSOR FOR SELECT
        sr.sys_id
    FROM
        sys_role sr
    WHERE
        sr.sys_id
    IN
        (
            SELECT
                sgr.role_id
            FROM
                sys_group_role sgr
            INNER JOIN
                sys_role sri
            ON
                sri.sys_id = sgr.role_id
            INNER JOIN
                sys_group_membership sgm
            ON
                sgr.group_id = sgm.group_id
            WHERE
                sri.app_scope = scope
            AND
                sgm.user_id = user_id
        )
    OR
        sr.sys_id
    IN
        (
            SELECT
                sur.role_id
            FROM
                sys_user_role sur
            INNER JOIN
                sys_role srii
            ON
                sur.role_id = srii.sys_id
            WHERE
                srii.app_scope = scope
            AND
                sur.user_id = user_id
        );
    /* End cursor declaration */

    /* Set the handler _after_ the cursor */
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    SELECT 
        sdo.read_role,
        sdo.edit_role,
        sdo.delete_role
    INTO 
        read_required_role,
        edit_required_role,
        delete_required_role
    FROM
        sys_db_object AS sdo
    WHERE
        name = table_name;

    /* Query for user roles */
    OPEN role_cursor;

    /*
        Loop through each and every role, and on each
        iteration, check to see if that role is for the
        read, edit or delete permissions.
    */
    permission_gather_loop: LOOP
        FETCH role_cursor INTO local_role;

        IF done THEN
            LEAVE permission_gather_loop;
        END IF;

        IF NOT can_read AND local_role = read_required_role THEN
            SET can_read = TRUE;
        ELSEIF NOT can_edit AND local_role = edit_required_role THEN
            SET can_edit = TRUE;
        ELSEIF NOT can_delete AND local_role = delete_required_role THEN
            SET can_delete = TRUE;
        END IF;
        ITERATE permission_gather_loop;
    END LOOP permission_gather_loop;

    CLOSE role_cursor;

    SELECT can_read AS `read`, can_edit AS `edit`, can_delete AS `delete`;
END//

/* END fetch_user_table_permissions */

/* Test */
-- CALL fetch_user_table_permissions('b42a1170-096a-11e9-b568-0800200c9a66', 'SYS', 'sys_group');