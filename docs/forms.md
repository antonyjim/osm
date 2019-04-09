```
+---------------------------------------------------+
| 1. Form Title                                     |
|  +------------------------------------------+ <== 2. Form Input Group
|  |  3. Input           3. Input             |     |
|  |  3. Input           3. Input             |     |
|  +------------------------------------------+     |
|                                                   |
|  +----------+  +------------+  +------------+ <== 4. Related lists
|  | 5. Table |  | 5. Table   |  | 5. Table   |     |
|  +----------+  +------------+  +------------+     |
+---------------------------------------------------+

+-------------------------------------------------+ <== 1. Form Table
| 1. Form Title                                   |
|  +---------+  +-------------------------------+ <== 3. Form Input Group
|  | 2. Tab 1|  | 4. Input           4. Input   | |
|  +---------+  | 4. Input           4. Input   | |
|  +---------+  | 4. Input           4. Input   | |
|  | 2. Tab 2|  +-------------------------------+ |
|  +---------+  OR                                |
|  +---------+  +-------------------------------+ <== 3. Table group
|  | 2. Tab 3|  |  5. Table Header, Table Args  | |
|  +---------+  +-------------------------------+ |
+-------------------------------------------------+

In the database:

sys_form:
+--------+-----------+------------+
| sys_id | form_name | form_title |
+--------+-----------+------------+
| 123    | sys_user  | User       |
+--------+-----------+------------+

sys_form_tab:
+--------+---------+----------+---------------------+-------------------+
| sys_id | form_id | tab_name | tab_title           | validation_script |
+--------+---------+----------+---------------------+-------------------+
| 65455  | 123     | General  | General Information | ...               |
| 79595  | 123     | Related  | Related Records     | NULL              |
+--------+---------+----------+---------------------+-------------------+

sys_db_dictionary:
+--------+--------------+-----------------+-----------+-------------+
| sys_id | name         | label           | plural    | description |
+--------+--------------+-----------------+-----------+-------------+
| 0e293f | sys_customer | Customer Master | Customers | Customer... |
+--------+--------------+-----------------+-----------+-------------+

sys_db_dictionary:
+--------+-------------+-------------+------------+
| sys_id | column_name | label       | table_name |
+--------+-------------+-------------+------------+
| 00e479 | request_uri | request_uri | 0e293f     |
+--------+-------------+-------------+------------+

sys_form_body:
+--------+--------+-----------+--------------------------------+------------+
| sys_id | tab_id | table_ref | table_args                     | field_name |
+--------+--------+-----------+--------------------------------+------------+
| ...    | 79595  | 0e293f    | inline_input=true&sys_id=12345 | NULL       |
| ...    | 65455  | NULL      | NULL                           | 00e479     |
+--------+--------+-----------+--------------------------------+------------+

```

```sql
CREATE TABLE sys_form (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    form_name VARCHAR(40), -- Name of the form <== #1
    form_title VARCHAR(40),
    has_state BOOLEAN -- To be used in the future
) CHARSET = utf8;

CREATE TABLE sys_form_tab (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    form_id CHAR(36), -- Reference to sys_form
    tab_name VARCHAR(40) DEFAULT 'General', -- <== 4. Related lists
    tab_title VARCHAR(40) DEFAULT 'General Information',
    validation_script CHAR(36),

    FOREIGN KEY(form_id)
        REFERENCES sys_form(sys_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) CHARSET = utf8;

CREATE TABLE sys_form_body (
    PRIMARY KEY(sys_id),
    sys_id CHAR(36),
    tab_id CHAR(36),
    table_ref CHAR(36),
    table_args VARCHAR(100),
    field_name CHAR(36),

    FOREIGN KEY(table_ref)
        REFERENCES sys_db_object(sys_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    FOREIGN KEY(field_name)
        REFERENCES sys_db_dictionary(sys_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) CHARSET = utf8;
```
