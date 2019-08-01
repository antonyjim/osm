
# Authentication and Application Scope in OSM

OSM is built to be scalable to any organization, whether there 16 levels of organization or 1, OSM needs to adapt to its environment. When it comes to authentication and scope, there are 3 key concepts to understand:
 - Organization Level
 - Organizational Units
 - Application Scope

### Organizational Level

At the root of any OSM instance, there exists a _root organization level_ from which all other organizational levels branch out. For example, a simple 3 tiered organizational heirarchy may look like this:

```
    root node
        â©
    cost center
        â©
    department
        â©
    team sector
```

The root node exists across all _application scopes_ (discussed further down). Organizational levels can then be restricted to a certain application scope, or available to the general scope. This organizational chart is stored in the `sys_organization` table which, for this particular organization would look something like so:

```
+--------------------+-------------+---------+--------------+
| organization_level | beholden_to | claim   | scope_prefix |
+--------------------+-------------+---------+--------------+
| Root Node          | Root Node   | global  | SYS          |
| Cost Center        | Root Node   | cstcntr | SYS          |
| Department         | Cost Center | dept    | SYS          |
| Team Sector        | Department  | tmsctr  | SYS          |
+--------------------+-------------+---------+--------------+
```

When a user is defined to a specific organizational level, they will only be able to see records from tables whose `sys_ol_claim` is less than or equal to their organizational level. For example, consider a table of internal news articles:

```
+------------+---------------------+--------------+--------------+
| created_at | title               | sys_ol_claim | sys_ou_claim |
+------------+---------------------+--------------+--------------+
| 2019-08-01 | Good News Everyone! | cstcntr      | 09S667       |
| 2019-08-01 | Sad News Everyone   | tmsctr       | 7CS354       |
+------------+---------------------+--------------+--------------+
```

The first article would be visible to everyone who is assigned to Cost Center 09S667, as well as everyone who is assigned to any Team Sector that falls under of Cost Center 09S667. The sad post would be visible to anyone in Team Sector 7CS354, as well as anyone assigned to the Cost Center which that Team Sector falls under. However, other users that are assigned to other Team Sectors under that Cost Center would not be able to see the sad news article.

### Organizational Units

With Organizational Levels defining the overall layout of the organization, _Organizational Units_ implement that layout. Consider this selection from the `sys_organization_unit` table:

```
+--------+---------------------+-------------+---------------+------------+
| sys_id | unit_name           | ou_level    | descendent_of | auth_claim |
+--------+---------------------+-------------+---------------+------------+
| cst667 | Cost Center #09S667 | Cost Center | 789EEF        | 09S667     |
| tsc354 | Team Sector #7CS354 | Team Sector | 09S667        | 7CS354     |
+--------+---------------------+-------------+---------------+------------+
```

Here we can see a simple heirarchy. From our news example above, it is clear how our `auth_claim` field is used and where it comes from. Users are defined to these Organizational Units in the `sys_user_org` table. Consider the following selection from that table:

```
+---------------+----------+
| user_id       | org_unit |
+---------------+----------+
| administrator | tsc354   |
+---------------+----------+
```

As we can see here, the "administrator" user is defined to the Team Sector #7CS354 Organizational Unit. The system also knows that for any applications the user is accessing in the `SYS` scope, that user will only be shown information available to that Organizational Unit.

### Application Scope

Because OSM has the option for several different _application scopes_, it's important to understand how Organization Levels and Organizational Units interact with those application scopes.

Simply put, an Application Scope is a way to separate permissions and data between solutions. Technically, all solutions may be a part of the global application scope. This may cause problems if, for example, a certain solution is publicly accessible and you wish to prevent public users from accessing api data that may be a part of the global application scope.

Scopes themselves are very minimal. They are only there to provide a high level authentication and authorization scheme. A sample scope may look something like so:

```
+---------------+--------------+---------------+
| friendly_name | scope_prefix | global_access |
+---------------+--------------+---------------+
| Point of Sale | POS          | false         |
+---------------+--------------+---------------+
```

The `scope_prefix` is typically how scopes are identified, though they do have a `sys_id` as well.

By default, users are able to query any global route from any application. For example, a user of the `SYS` scope can query any table using the `/api/q/tablename` route, but they are restricted from accessing `/api/scope/POS`. Users that are part of another scope can access global routes such as `/api/q/tablename` as well as scope-specific routes such as `/api/scope/POS/csearch/`. This behavior can be controlled using the `global_access` flag on the `sys_app_scope` table.

When designing solutions, the scoping is handled automatically provided standard routing functions are used. This concept is described more in `Designing and Implementing Solutions`.
