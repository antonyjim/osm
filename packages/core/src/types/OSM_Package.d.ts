type OSMClientType = 'core' | 'standalone' | 'proxy' | 'none'
type OSMLibBindingType = 'shared' | 'package'

export interface IOSMPackageOpt {
  client: OSMClientType
  basePath: string
  baseApiPath?: string
  entry: {
    lib?: string
    proxy?: string
    spawn?: string
    client?: string
    api?: string
  }
  lib: OSMLibBindingType
}
