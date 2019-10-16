/* Create tables related to documentation */

CREATE TABLE {{database}}.doc_article_info (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    sys_created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
    sys_created_by CHAR(36),
    sys_updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP(),
    sys_updated_by CHAR(36) NOT NULL,
    doc_title VARCHAR(80) NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    parent_module VARCHAR(40),
    view_count INT,
)