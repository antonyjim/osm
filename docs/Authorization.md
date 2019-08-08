# Authorization in OSM

Most authorization in OSM is simply based on authentication. Custom routing modules can expose pre-authenticated routes by setting the `pre_auth` flag on the `sys_route_module` table.

Global routes to `/api` routes are accessible based on the `scope` attribute of the authentication token. This behavior is controlled by the `global_access` flag on the `sys_app_scope` table. Calls to `/api/app` are exempt from this rule as they are required for the application to function properly.

The `scope` attribute also will control access to `/api/scope` routes. Global scopes do not have access to sub-solution scopes, but sub-solution scopes will have access to global routes depending on the `global_access` flag on the `sys_app_scope`.

```typescript
    function authorize(
        {role, resource, scope}: {role: string, resource: string}, 
        handler: (reqHandle: Request, resHandle: Response) => void
    ) {
        return function(req: Request, res: Response) {
            if (req.auth.roles.includes(role)) {
                handler(req, res)
            } else {
                res.status(403).json({
                    errors: [
                        {
                            error: true,
                            message: 'User unauthorized with current privileges'
                        }
                    ],
                    data: {}
                })
            }
        }
    }
```
