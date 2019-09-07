# Requesting API Resourcdes

When writing a custom module, OSM uses a custom webpack loader to transform normal objects in source code to something that can be stored in the database and dynamically loaded on the api.

To illustrate this, we will make an api resource request from within our client side code:

```ts
// Lets fetch a list of users under the same scope as current user
new ApiResource({
  table: 'sys_user',
  role: 'admin',
  fields: ['sys_id', 'user_name', 'last_login', 'last_app_scope'],
  conditions: {
    last_app_scope: OSM.currentScope,
    active: true,
    'last_login[<]': new Date(),
    search: state.searchPhrase
  }
})
```

When webpack is bundling the files for this client side module, it will output something like:

```ts
fetch(`/api/_/fda4oi5?search=${state.searchPhrase}`)
```

The `fda4oi5` in the previous example is a randomly generated hash created by the loader and stored in the `sys_generated_resource` table. There are several different options that can be passed to the ApiResource constructor:

| Key          | Required  | Value                                                                                                        |
| ------------ | :-------: | ------------------------------------------------------------------------------------------------------------ |
| `role`       |     N     | Can be a string or array of strings used to ensure unauthorized access does not occur                        |
| `able`       | Sometimes | A simple string representing the name of a table that is being queried. Is not required when `raw` is passed |
| `conditions` |     N     | An object describing the query to be used in the sql `WHERE` clause.                                         |
| `fields`     |     Y     | An array representing the fields to fetch from the request                                                   |
