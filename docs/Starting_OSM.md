# Starting OSM

OSM utitilizes several environment variables to control the application's behavior. These variables are documented here:

| Variable |  Type  | Default | Description                                                |
|:---------|:------:|:-------:|------------------------------------------------------------|
| DB_DB    | string |  osm    | Which database to connect to (or create)                   |
| DB_HOST  | string |localhost| Where the mysql/mariadb database instance is located       |
| DB_PORT  | int    |  3306   | Which port to use when connecting to the database          |
| DB_USER  | string |  node   | Which user to authenticate against the database            |
| DB_PASS  | string |         | What password to use for the provided user                 |
| DB_POOL_LIMIT | int |  2    | When creating a database pool, defines the connection limit|
|SERVER_PORT| int   | 8080    | Define what port to listen on                              |
| NODE_ENV | string | development | Defines which mode to run the application in           |
| CLUSTER_COUNT | int | # of cpu cores | Defines the number of cluster processes to run in production mode |
| DEBUG    | string |         | Defines logging namespaces, OSM uses app:* namespace       |
| TOKEN_EXPIRATION | string | 10h | Defines authentication token expiration period         |
| SMTP_HOST | string | smtp.ethereal.email | Defines the SMTP host for nodemailer to connect to |
| SMTP_PORT | int   | 587     | Defines which port nodemailer will use when sending mail   |
| SMTP_USER | string |        | Defines the authenticated user for the selected SMTP server|
| SMTP_PASS | string |        | Defines the password to connect to the selected SMTP server|
| STATEMENT_LOGGING| bool | false | Controls whether SQL statements are logged when queried|


