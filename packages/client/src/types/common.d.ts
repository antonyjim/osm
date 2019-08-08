/**
 * Export all of our common components into one big declaration so that it
 * may be loaded in the customComponent generator.
 */
export namespace Common {
  export interface ITableColumn {
    [label: string]: {
      boundTo: string
      type: string
    }
  }
}
