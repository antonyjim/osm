/* Create domain information tables */

/* Store top-level domain information */
/* DROP TABLE IF EXISTS {{database}}.ds_tl_domain;
CREATE TABLE {{database}}.ds_tl_domain (
  PRIMARY KEY(sys_id),
  sys_id CHAR(36),
  domain_name VARCHAR(253),
  created_at DATETIME,
  last_updated DATETIME,
  last_viewed DATETIME
) CHARSET=utf8; */

/* Store each record and that record's information */
/* DROP TABLE IF EXISTS {{database}}.ds_domain_record;
CREATE TABLE {{database}}.ds_domain_record (
  PRIMARY KEY(sys_id),
  sys_id CHAR(36),
  tl_domain CHAR(36),
  record_type VARCHAR(4),
  record_name VARCHAR(100),
  record_data VARCHAR(60),
  record_ttl INT,

  FOREIGN KEY(tl_domain)
    REFERENCES ds_tl_domain(sys_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) CHARSET=utf8; */