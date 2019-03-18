# Towel Class

The Towel class is closely modeled after the ServiceNow GlideRecord class. However, there are some very important differences between how GlideRecord and Querynator differ from Towel.

# Instantiating a new Towel

To create a new Towel:

```js
import Towel from 'towel'

const table = 'sys_user'
const towel = new Towel(table)
```

The Towel constructor accepts exactly 1 argument: `table`. This is a string representing the name of the underlying database table. Creating a new Towel will not cause anything to happen immediately, but it will allow configuration before a query is made. After a new Towel is created, the ability to make any CRUD operation is opened.

# General Notes

1.  Anywhere that fields are set by the user (e.g. with `order` or `setFields`) the supplied data will be validated against the schema. If a non-existent field is provided then it will be discarded. If no valid fields are provided, then the towel will default to displaying all defaults.

2.  Generally speaking, Towel queries can be written in the same way on the server and the client. The only potentially breaking difference is the fact that server-side Towel queries will not invoke the table hooks UNLESS `useHooks` is invoked before

# Specifying Return Fields

```js
const fields = [
  'sys_id',
  'username',
  'last_login',
  'default_customer',
  'default_customer_display'
]
towel.setFields(fields)
```

If no fields are supplied with `setFields` before any of the query provokers (`get`, `update`, `delete`, `insert`), the default fields from the schema will be automatically selected.

# Specifying Pagination Info

```js
// Limit the number of results that will be returned from query
towel.setLimit(25)

// Set the offset of the query
towel.setOffset(10)
```

When selecting records from an `_list` view, optionally set the offset for the query and limit of the results. By default the limit will be `25` and the offset will be `0`. There is a hard limit of 2500 records for performance reasons.

# Specifying Order

```js
// Set the field and the direction
towel.order('username', 'DESC')

// Or just set the field
towel.order('username')
```

Set the order of the results that will be received. The first argument is a mandatory string representing the field to order by. The second argument is optional, and specifies the direction to order the prior field by. If the direction is not provided, ASC will be supplied. If anything besides ASC or DESC is provided, ASC will be used.
