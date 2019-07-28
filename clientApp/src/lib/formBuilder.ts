import { IFormTab } from '../types/forms'
import { IPillProps, IPillBody } from '../common/PillLayout'

export function buildForm(tabDetails: IFormTab) {
  if (tabDetails.fields) {
    return {
      body:
        // <FieldForm
        //   form={tabDetails.fields}
        //   model={dataModel}
        //   primaryKey={tabDetails.primaryKey}
        //   changeHandler={handleChange}
        //   deleteHandler={handleDelete}
        //   submitHandler={handleSubmit}
        // />
        'dfa',
      title: tabDetails.title,
      name: tabDetails.name
    }
  }
}
