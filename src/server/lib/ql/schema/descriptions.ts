import { rootQueries } from "./queries";
import { Querynator } from "../../connection";

/**
 * lib/ql/schemadescriptions.ts
 * Provide descriptions for views and tables
*/

// Node Modules


// NPM Modules


// Local Modules


// Constants and global variables

export default class Description extends Querynator {
    constructor(context, table) {
        super(context)
        if (table.toLowerCase().slice(-5) === '_list') this.tableName = table.slice(0, -5)
        else this.tableName = table
        this.verifyAndReturnFields()
    }

    /**
     * Return the columns that are visible and queryable on any given table
     */
    public async verifyAndReturnFields() {
        return new Promise((resolve) => {
            /* Message to be returned with the response */
            let message: string = 'Details for view ' + this.tableName
            /* Provide the key to be used when pushing updates */
            let updateKey: string = '' 
            /* Describe the fields to the tableview */
            let formattedFields = {}
            /* Privileges that the user has on the table 
                one or more of: ['READ', 'UPDATE', 'DELETE', 'CREATE'] */
            let privs: string[] = []

            this.once('notFound', (e) => {
                return resolve({
                    errors: [
                        {
                            message: 'No data found for table ' + this.tableName
                        }
                    ]
                })
            })
            this.once('fieldDescriptors', (e) => {
                return resolve({
                    message,
                    privs,
                    id: updateKey,
                    cols: formattedFields
                })
            })
            const query = 'SELECT * FROM sys_db_dictionary_list WHERE table_name = ?'
            const params = [this.tableName]
            this.createQ({query, params}, 'CALL')
            .then(fields => {
                if (fields.length > 0) {
                    fields.map(field => {
                        if (field.update_key) updateKey = field.column_name
                        if (field.visible && field.selectable) {
                            formattedFields[field.label] = {
                                boundTo: field.column_name,
                                type: field.type,
                                linkable: field.reference_id !== null || field.base_url ? true : false,
                                baseURL: field.base_url
                            }
                        }
                    })
                    /* Return a query for the user's authorized actions */
                    return this.createQ({
                        query: 'SELECT * FROM ??',
                        params: ['sys_authorization']
                    })
                } else {
                    return this.emit('notFound')
                }
            })
            .then(authorization => {
                privs = authorization[0]
                this.emit('fieldDescriptors')
            })
            .catch(err => {
                this.emit('error')
            })
        })
    }
}

/*

('sys_db_dictionary_list', 'View Descriptions', '60bb2a8a-e00e-4238-abf7-de8452043a6e'),
('sys_db_dictionary_list', 'View Descriptions', '6ccd7d09-dad3-4fc8-8a22-7fe815a33629'),
('sys_db_dictionary_list', 'View Descriptions', '856fc90b-cb3d-4e8f-b279-8bba74afbb97'),
('sys_db_dictionary_list', 'View Descriptions', '880ebeab-5001-4328-8835-ac40eba2c604'),
('sys_db_dictionary_list', 'View Descriptions', 'a2f69413-c3f7-4804-bf20-bafdb8fc951b'),
('sys_db_dictionary_list', 'View Descriptions', 'dd9b3c0b-9ba6-4d5d-a1b7-5c632fe56e94'),
('sys_db_dictionary_list', 'View Descriptions', 'ea05e35b-3b3e-4423-bf86-e67f674b2fbc'),
('sys_db_dictionary_list', 'View Descriptions', ''),
('sys_db_dictionary_list', 'View Descriptions', ''),
('sys_db_dictionary_list', 'View Descriptions', ''),
('sys_db_dictionary_list', 'View Descriptions', ''),
('sys_db_dictionary_list', 'View Descriptions', ''),
('sys_db_dictionary_list', 'View Descriptions', ''),
('sys_db_dictionary_list', 'View Descriptions', ''),
('sys_db_dictionary_list', 'View Descriptions', ''),
('sys_db_dictionary_list', 'View Descriptions', ''),
('sys_db_dictionary_list', 'View Descriptions', ''),
('sys_db_dictionary_list', 'View Descriptions', ''),
('sys_db_dictionary_list', 'View Descriptions', ''),
('sys_db_dictionary_list', 'View Descriptions', ''),
('sys_db_dictionary_list', 'View Descriptions', ''),
05fce701-c1bf-4a09-8446-4d9d9fc9996b
9027cdb8-bfd6-4c66-921c-b9bd126e778e
42d25ea9-062c-45e0-a14e-362f0fe62a25
1b4f9b8d-0c4b-45be-8bf8-e86f63b676c8
941dac6f-ea55-4c92-9491-fa4f63f5a7c9
9ca39c76-5f5a-4293-ac99-e1e7363636c0
524e0d57-affb-4b86-b65f-d9d40bcaf7de
90ecc5e3-7763-4f28-b5e0-a3204547e392
f383ea92-fb2c-4be7-b0c3-e377bed9f851
ae57edc7-3ad8-475f-ad27-f55adc20a01d
a87103e3-0fda-458a-9eb4-367a0f91faaf
d637fceb-211f-45bc-8918-ef87af668fd9
f5fbf0c2-2818-40ef-ad10-c3db9295f286
bc9882b5-324e-44a1-81d6-40353fec5652
0808be22-7e73-4d66-b94f-9cd565807b4c
85e92b98-c6c3-4a83-993a-5faa2be3f2f7
658a7d28-67eb-4852-a382-62700c8801de
32c0bbb8-0b90-4c68-9a3f-b9f1c03ec430
fd27192d-a1d3-4d49-85f9-d105b045aebd
7bfa3642-e155-4ee0-b802-358b51baaa27
d691dd04-f205-4533-bf8c-51f5b3bb13b2
40d57415-46db-423f-92ee-64b3a1fb6e33
7180d28d-a119-4b9f-9be9-0eb94af6aa24
71610b6b-3ca3-4798-817a-6f2b85c897bd
8dd5eddf-2f46-49ee-af2c-cd83c339f2ac
db56a55f-983d-45b0-aa08-62fd8d59f603
0e1192b3-e885-49c8-9c17-37cff7117689
9017df5a-3a94-4061-b642-94616ba14693
88217dc4-dfc0-480e-9fe5-8f0acbc2d95f
4b8f62a4-aa92-4d6e-b110-4b4f6ca2d3c9
6dd3a7da-4ecf-4df3-a87f-7cf2e5ca8af5
a2362117-5ac7-4054-b340-1929482b37e2
5caa0fbe-50c1-46a8-a183-a1df44c762a7
64915f5a-b159-4246-97f2-b124bc28d142
afd60d87-28ea-4160-b173-bb1e6fd8ab36
973d26b0-5a7f-4360-b94c-1db66378a49c
03b63e74-ee04-4703-9db8-5e73370cce9a
50d7623b-8e6c-4380-b5f7-6fe135396144
a13afa36-de8d-44b4-a9c8-c2d3ac781787
b7e5ebc2-71cb-4179-b576-b82a09aacf76
36351d15-7dce-434b-a0d8-034bbdc86b25
995d4293-7802-4a95-91dc-4375481f1116
8d64c31c-cb74-42ee-9f74-54d7fdd0a0ea
6078f8c4-1f72-40f4-ab1e-0f23fe69b772
e5d6f7f4-d6bf-4cc2-96e4-a97cb3b63faa
80f13cc3-be3e-462e-bcc9-4b944d861a7d
a1a03b44-c49f-4bfd-a19a-29f9c8ba388c
1f46e9c4-fb3f-42c3-941c-861ca755915c
18486267-4c9a-4d1e-9c92-763f99b1e829
9e64f0c4-99df-4a5c-a382-9278baf15c2b
23fa6375-136f-46d1-b1b3-2fc618d4d2c0
1111c2e7-3101-42c0-a7cd-527244b88393
6c73acae-5a57-4bfe-94cd-30ded2d8e01f
a315498b-8699-437a-bd02-0350dcae1793
b8c840e1-c572-40fd-8f74-c9c8135bb1fd
0b6b5447-bf26-4bf0-a87f-759056e77b72
1b9392f9-66e7-4c48-948b-ea27a3400299
6fd2da81-919b-44e3-b843-74783f19e838
f482613e-2d6f-404c-8db7-5cb6b155bf0c
32e9c69e-89a0-4477-a4c6-8f5ca1c69fdb
9b40a50c-2f6f-4e9f-8104-c878bd5981a2
d4359d65-d9b0-4db6-be3c-4d313851ce31
15a82d2d-1937-4155-a429-be4637ca95f2
8262d683-49d3-4422-978a-335dc83227b9
0502f095-caaa-451f-8dbc-18eaf195b173
47df9bde-2885-4902-a9f0-9b3cb4b0b1c7
a9e23253-0b97-489a-b14d-c90dc9164e37
05dd59fe-823e-4c9a-a551-e6af796194c8
4489f520-8c56-4b49-a9e8-e80c367947e8
*/