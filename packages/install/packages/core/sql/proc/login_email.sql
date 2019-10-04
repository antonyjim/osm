/**
  Fetches a user's login information by email
*/

DROP PROCEDURE IF EXISTS osm.login_username ;
CREATE PROCEDURE osm.login_email (IN u_email VARCHAR(90))
    BEGIN
        SELECT
            su.sys_id,
            su.username,
            su.given_name,
            su.surname,
            su.pass_hash,
            su.password_email_sent,
            su.is_active,
            su.is_locked,
            su.is_confirmed,
            su.invalid_login_count,
            su.last_pass_change,
            su.app_scope,
            so.claim,
            sou.auth_claim
        FROM
            sys_user su
        LEFT JOIN
            sys_user_org suo
        ON
            su.sys_id = suo.user_id
        LEFT JOIN
            sys_organization_unit sou
        ON
            suo.org_unit = sou.sys_id
        LEFT JOIN
            sys_organization so
        ON
            so.sys_id = sou.ou_level
        WHERE
            su.app_scope = so.scope_prefix
        AND
            su.email = u_email;
END ;