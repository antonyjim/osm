
/*
  Ensure each user has at the minimum the global app scope.
*/
CREATE TRIGGER ins_sys_user BEFORE INSERT ON sys_user FOR EACH ROW
    IF NEW.app_scope IS NULL THEN
        SET NEW.app_scope = 'SYS';
    END IF//