
/**
 * lib/ql/API.ts
 * Provide API URL parsing and field validation
*/

// Node Modules


// NPM Modules


// Local Modules
import { Querynator } from "../../connection";
import { Log } from "../../log";
import { resolve } from "dns";


// Constants and global variables

interface APIResponse {
    status: number,
    body: {
        errors?: [{
            message: string
        }],
        data?: any[]
    }
}


export default class APICall extends Querynator {
    response: APIResponse

    constructor(context) {
        super(context)
    }

    protected sendResponse() {
        this.context.res.status(this.response.status).json(this.response.body)
    }

    protected handleError(err: Error, terminatingError?: boolean) {
        const requestFailure = () => {
            this.context.res.status(500).send(this.response)
        }
        this.response.body.errors.push({message: err.message})
        if (terminatingError) {
            requestFailure()
            new Log(err.message).error(3)          
        }
        new Log(err.message).error(4)
    }

    private async fieldValidation(fields: string) {
        let query = 'SELECT column_name, type, length FROM sys_db_dictionary WHERE table_name = ? AND admin_view = ? AS FIELDS'
        let params = [this.context.req.params.table_name, this.context.req.auth.isAdmin || false]
        let validFields: string[] = []
        let format = await this.createQ({query, params}, 'CALL')
        .catch((err: Error) => this.handleError(err))
        if (format)
        format.FIELDS.forEach(field => {
          if (fields.includes(field.column_name)) validFields.push(field.column_name)  
        })
        Promise.resolve(validFields)
    }


    /*
	PRIMARY KEY(sys_id),
    sys_id CHAR(36), -- Primary key used for linking to other fields 
    reference_id CHAR(36), -- Foreign key used to reference other fields
	column_name VARCHAR(40),
    visible BOOLEAN NOT NULL DEFAULT 1, -- Whether the field shows up on a form or not, overridden by admin_view flag
    admin_view BOOLEAN NOT NULL DEFAULT 0, -- Whether the field can be exposed to non-admin users
    readonly BOOLEAN NOT NULL DEFAULT 0,
	label VARCHAR(40), -- Friendly name
	hint VARCHAR(40), -- Popup hint
	type VARCHAR(10), -- Type (boolean, varchar, char, etc...)
	length INT, -- Length of field, applies to varchar, char
	table_name VARCHAR(40),
    */

    /*
        ('a2f69413-c3f7-4804-bf20-bafdb8fc951b', NULL, 'sys_id', 0, 0, 1, 'ID', NULL, 'CHAR', 36, 'f2919b64-8b7c-4f53-ab41-29aff632e919'),
        ('6ccd7d09-dad3-4fc8-8a22-7fe815a33629', 'a2f69413-c3f7-4804-bf20-bafdb8fc951b', 'reference_id', 0, 0, 0, 'Reference Column', NULL, 'CHAR', 36, 'f2919b64-8b7c-4f53-ab41-29aff632e919'),
        ('880ebeab-5001-4328-8835-ac40eba2c604', NULL, 'column_name', 0, 0, 1, 'Column', NULL, 'VARCHAR', 40, 'f2919b64-8b7c-4f53-ab41-29aff632e919'),
        ('1a87125a-1516-43e8-82b2-906568f6ee77', NULL, 'visible', 1, 0, 0, 'Visible', 'Toggles form visibility', 'BOOLEAN', NULL, 'f2919b64-8b7c-4f53-ab41-29aff632e919'),
        ('b745e12a-0b48-4d32-9759-db6982b2afe2', NULL, 'admin_view', 1, 0, 0, 'Admin Only', 'Field is visible only to admins', 'BOOLEAN', NULL, 'f2919b64-8b7c-4f53-ab41-29aff632e919'),
        ('dd9b3c0b-9ba6-4d5d-a1b7-5c632fe56e94', NULL, 'readonly', 1, 0, 0, 'Readonly', NULL, 'BOOLEAN', NULL, 'f2919b64-8b7c-4f53-ab41-29aff632e919'),
        ('ea05e35b-3b3e-4423-bf86-e67f674b2fbc', NULL, 'label', 1, 0, 0, 'Label', 'Friendly name to display on forms', 'VARCHAR', 40, 'f2919b64-8b7c-4f53-ab41-29aff632e919'),
        ('8044fbcf-61d3-40c3-b001-21dc3fb98ae4', NULL, 'hint', 1, 0, 0, 'Hint', 'this', 'VARCHAR', 40, 'f2919b64-8b7c-4f53-ab41-29aff632e919'),
        ('60bb2a8a-e00e-4238-abf7-de8452043a6e', NULL, 'type', 1, 0, 0, 'Date Type', NULL, 'VARCHAR', 40, 'f2919b64-8b7c-4f53-ab41-29aff632e919'),
        ('856fc90b-cb3d-4e8f-b279-8bba74afbb97', NULL, 'table_name', 1, 0, 0, 'Table', NULL, 'CHAR', 36, 'f2919b64-8b7c-4f53-ab41-29aff632e919')
        ('0e293f0b-7282-4c73-adf0-32c1529b45dc', 'sys_customer', 'Customer Master', NULL),
        ('25b33613-0edc-4fe1-83af-9d00222d90a1', 'sys_user', 'User Registration', NULL),
        ('258d3db0-e1a5-4356-a225-970bfd618ecd', 'sys_db_object', 'Tables', NULL),
        ('f2919b64-8b7c-4f53-ab41-29aff632e919', 'sys_db_dictionary', 'Database Fields', NULL)
        ('25c8b14e-3c81-421f-8ab7-178e2791721f', NULL, 'sys_id', 0, 0, 1, 'SYS ID', NULL, 'CHAR', 36, '258d3db0-e1a5-4356-a225-970bfd618ecd'),
        ('83fa0c7a-bf1c-46c2-a005-2476ac9d7fcf', NULL, 'name', 1, 0, 0, 'Name', NULL, 'VARCHAR', 40, '258d3db0-e1a5-4356-a225-970bfd618ecd'),
        ('0d1ba42a-dd86-4bc2-9b82-242cfe4419fd', NULL, 'label', 1, 0, 0, 'Label', NULL, 'VARCHAR', 40, '258d3db0-e1a5-4356-a225-970bfd618ecd'),
        ('2404fccd-2e44-425c-acee-aff034359e02', NULL, 'description', 1, 0, 0, 'Description', NULL, 'VARCHAR', 80, '258d3db0-e1a5-4356-a225-970bfd618ecd')
        ('214103bc-50c6-47f8-bdf9-50b4c70ecd89', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('fa8d760b-2c8b-4092-9f98-cd7eaccbbe27', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('582ffed2-4894-4f2d-8272-3911395d89a3', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('8f6c4d78-ccf9-4e31-9923-48ad742a3c83', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('80e70fab-8506-4b2b-98de-3fd3f64058e6', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('f178ba58-e4ff-4ebd-ba1b-588c93618b3a', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('a594a86c-4fc1-4039-8495-16dcd770c05c', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('1d2ec6c2-e756-4435-ad2e-9657fe3c14f6', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('11be907c-a374-4e90-8a48-e56decb4ac66', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('2e76586b-5608-4ce6-9863-aecc664486b2', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('1debf143-84e3-43f9-891a-273a80101800', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('b12e72af-a272-4902-aa13-898a4e8c507c', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('4d9ac34f-d3e8-4d08-8330-c49be4cef862', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('665fcd68-d273-4f2c-910d-33e1c6bdc14b', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary'),
        ('dcc0f292-82e5-4a18-853d-4988e9523303', NULL, '', 1, 0, 0, '', NULL, '', , 'sys_db_dictionary')
    */

    // ('8b25bb3f-3bb0-450a-a6dc-e4adda46b99d', NULL, 'nsNonsig', 1, 0, 1, 'Nonsig', 'Goodyear Customer Number', 'CHAR', 9, 'sys_customer')
    // ('dc036307-ad91-441d-b08f-c8e8c62aacf2', NULL, 'nsTradeStyle', 1, 0, 0, 'Tradestyle', 'Name of business', 'VARCHAR', 100, 'sys_customer')
    // ,('76dce7ab-f383-4200-88b8-7fab7bef4252', NULL, 'nsAddr1', 1, 0, 0, 'Address', 'Address line 1', 'VARCHAR', 40, 'sys_customer')
    // ,('d5817895-1823-44cc-b47c-2e4ba5b2a171', NULL, 'nsAddr2', 1, 0, 0, 'Address', 'Address line 2', 'VARCHAR', 40, 'sys_customer')
    // ,('de6f1c09-8a51-44a6-8648-2a07d2b99172', NULL, 'nsCity', 1, 0, 0, 'City', 'City of location', 'VARCHAR', 40, 'sys_customer')
    // ,('f9df0ae9-ccaf-4166-a356-965299d90735', NULL, 'nsState', 1, 0, 0, 'State / Province', NULL, 'CHAR', 2, 'sys_customer')
    // ,('e659bd5d-25f8-458d-8fbc-07fa1abc8faa', NULL, 'nsPostalCode', 1, 0, 0, 'Postal Code', 'Postal code / Zip code', 'VARCHAR', 10, 'sys_customer')
    // ,('51619dc2-b7bd-4063-afcb-9cf9c2b7c221', NULL, 'nsCountry', 1, 0, 0, 'Country', NULL, 'CHAR', 2, 'sys_customer')
    // ,('7b7cb64a-a606-4029-aee1-ddd2625ce5af', NULL, 'nsBrandKey', 1, 0, 0, 'Brand Key', 'Brand key of authorized merchandise', 'VARCHAR', 4, 'sys_customer')
    // ,('191764e3-6262-4f84-b745-cb7b153216cf', NULL, 'nsIsActive', 1, 0, 0, 'Active', 'Whether nonsig is active', 'BOOLEAN', NULL, 'sys_customer')
    // ,('a5f4087c-0a8f-4ce2-8ec3-0271b49f4856', NULL, 'nsIsActiveTHQ', 1, 1, 0, 'Active Tire-HQ', 'Whether nonsig is active on THQ', 'BOOLEAN', NULL, 'sys_customer')
    // ,('07e38f72-8700-4779-9efe-1598fba335fa', NULL, 'nsType', 1, 0, 1, 'Type', 'Type of customer', 'CHAR', 3, 'sys_customer')


    // ('e910fd2b-cf79-421e-9bee-fb1cfb87f6c9', NULL, 'userFirstName', 1, 0, 0, 'First Name', NULL, 'VARCHAR', 40, 'sys_user')
    // ,('e5030031-a848-4c4a-af17-3cfbf5fb88ba', NULL, 'userLastName', 1, 0, 0, 'Last Name', NULL, 'CHAR', 36, 'sys_user')
    // ,('38c64d82-b0bf-4d75-9f85-3d0e59ab543b', NULL, 'userName', 1, 0, 0, 'Username', NULL, 'CHAR', 36, 'sys_user')
    // ,('c3737ca1-b820-439b-b13a-ea73993480de', NULL, 'userPhone', 0, 0, 0, 'Phone Number', 'Phone number that you can be reached at.', 'VARCHAR', 12, 'sys_user')
    // ,('d2560c79-d59a-4645-acd7-33d4ba13d347', NULL, 'userPass', 0, 0, 0, 'Password', NULL, 'BINARY', 60, 'sys_user')
    // ,('bebb0c0a-f9d4-4562-8a18-54baffc609c6', NULL, 'userEmail', 1, 0, 0, 'Email', NULL, 'VARCHAR', 90, 'sys_user')
    // ,('0e932a87-b935-422f-adc0-6643b30483de', NULL, 'userNewEmail', 0, 0, 0, 'Confirmation Email', NULL, 'VARCHAR', 90, 'sys_user')
    // ,('fc4d8e95-fb96-4569-b43a-ba5a17a8e46a', NULL, 'userIsLocked', 1, 1, 0, 'Locked', 'Indicates wheter a user has been locked', 'BOOLEAN', NULL, 'sys_user')
    // ,('ba023933-6ca1-4ae4-88dc-4d6dcacd16ab', NULL, 'userInvalidLoginAttempts', 0, 0, 0, 'Invalid Logins', NULL, 'INT', NULL, 'sys_user')
    // ,('4545701c-aa63-4c0b-a977-9f9d48448f0d', '8b25bb3f-3bb0-450a-a6dc-e4adda46b99d', 'userDefaultNonsig', 1, 0, 0, 'Primary Nonsig', NULL, 'CHAR', 9, 'sys_user')
    // ,('117fad36-ebbc-4e17-9f8e-194094b399d9', NULL, 'userConfirmation', 0, 0, 0, 'Confirmation Token', 'User confirmation for email/password', 'CHAR', 36, 'sys_user')
    // ,('a3a2ab41-a18d-4c67-9152-86f4ae18744e', NULL, 'userAwaitingPassword', 0, 0, 0, 'Awaiting Password', 'Password reset indicator', 'BOOLEAN', NULL, 'sys_user')
    // ,('7b73b470-9cd7-464c-9940-4e8847e3aafb', NULL, 'userLastLogin', 1, 0, 0, 'Last Login', 'Last successful login', 'DATE', NULL, 'sys_user')
    // ,('1aba68f5-8372-49b5-b6bb-25887bd8a9c2', NULL, 'userLastPasswordChange', 1, 0, 0, 'Password Changed', 'Last time the password was updated', 'DATE', NULL, 'sys_user')    




    protected prepareQuery() {

    }
}