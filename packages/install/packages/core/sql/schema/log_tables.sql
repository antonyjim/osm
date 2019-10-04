CREATE TABLE sys_log (
    PRIMARY KEY(log_key),
    log_key INT AUTO_INCREMENT,
    log_time DATETIME DEFAULT CURRENT_TIMESTAMP(),
    log_message TEXT,
    log_severity INT(1) DEFAULT 3
);

CREATE TABLE sys_user_log LIKE sys_log;
ALTER TABLE sys_user_log ADD COLUMN log_user CHAR(36) NOT NULL;
CREATE TABLE sys_log_request LIKE sys_log;
ALTER TABLE sys_log_request ADD COLUMN request_method VARCHAR(6) DEFAULT 'GET';
ALTER TABLE sys_log_request ADD COLUMN request_uri VARCHAR(100) DEFAULT '/';


/* CREATE TABLE log_message (
  PRIMARY KEY(sys_auto_id),
  sys_auto_id INT AUTO_INCREMENT,
  log_message VARCHAR(255)
); */