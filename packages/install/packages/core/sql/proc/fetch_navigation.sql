/*
  Fetch a list of authorized navigation routes for a
  particular user in a particular scope.
*/

DROP PROCEDURE IF EXISTS osm.fetch_navigation ;


CREATE PROCEDURE osm.fetch_navigation (IN user_id CHAR(36), IN scope CHAR(3))
    BEGIN
        SELECT
            sn.inner_text,
            sn.method,
            CONCAT(
                sn.path_name,
                '?',
                IFNULL(sn.query_string, '')
            ) AS href,
            sn.header,
            sn.menu
        FROM
            sys_navigation sn
        WHERE
            sn.role_required IN (
                SELECT
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
                        )
            )
        ORDER BY 
            sn.menu, 
            sn.header, 
            sn.inner_text;
END ;