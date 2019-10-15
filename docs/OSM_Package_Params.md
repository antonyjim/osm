# OSM Package Parameters

OSM packages allow special parameters to be passed through the `package.json` on the `OSM` object. These parameters are defined here:

```js
{
  "OSM": {
    "client": "core" | "standalone" | "proxy" | "none", // What kind of client app
    "basePath": "/client mount point", // Where the client mounts
    "entry": {
      "lib": '',
      "proxy": '', // If client == proxy, list the host & port to listen to
      "spawn": '' // If client == proxy, list the command and arguments to spawn a process for your app
    }
  }
}
```
