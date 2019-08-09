/*
  Ensure we never encounter a null app_scope.
*/

CREATE TRIGGER upd_sys_user BEFORE UPDATE ON sys_user FOR EACH ROW 
    IF NEW.app_scope IS NULL THEN
        SET NEW.app_scope = 'SYS';
    END IF//