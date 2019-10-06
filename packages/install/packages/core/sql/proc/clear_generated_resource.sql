
CREATE PROCEDURE {{database}}.clear_generated_resource
BEGIN
  DELETE FROM sys_generated_resource;
END;