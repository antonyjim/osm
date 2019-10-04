import { IFieldMessage } from '../../types/api'
import { IDictionary } from '../../types/server'
import { IMetaInfo } from '../../types/queries'

export interface IApiResponse<T> {
  errors?: IFieldMessage[]
  warnings?: IFieldMessage[]
  info?: IFieldMessage[]
  data: IDictionary<T>
  meta?: IMetaInfo
  success: boolean
}

/**
 * @class ApiResponse
 * @description Returns a response object to return to client.
 */

export class ApiResponse<T> {
  private responseMessage: IApiResponse<T>

  constructor(props) {}
}
