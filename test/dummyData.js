/**
 * Generate dummy data in the database
 */

const uuid = require('uuid/v4')


const usersToGenerate = 150000
const customersToGenerate = 1000000
const firstNames = [
    'Savannah',
    'Todd',
    'Mary',
    'Anthony',
    'Jim',
    'Susan',
    'Dave',
    'Mike',
    'Michael',
    'Ted',
    'Dean',
    'Art',
    'Jean',
    'Taylor',
    'Tessa',
    'Scarlet',
    'Sidney',
    'Deitrich',
    'Abraham',
    'Kayla',
    'Kim',
    'Carly',
    'Amy',
    'Jennifer'
]

const surNames = [
    'Lincoln',
    'Smith',
    'Avery',
    'White',
    'Black',
    'Iguban',
    'Arban',
    'Mozart',
    'Washington',
    'Trump',
    'Bush',
    'Burns',
    'Anderson',
    'Frazier',
    'Reid',
    'Johnson',
    'Jones',
    'Williams',
    'Lawrence',
    'McClean'
]

const types = [
    'USD',
    'USA',
    'USP',
    'GYE',
    'GYA',
    'GYH',
    'CAD',
    'CAA',
    'CAP'
]

const tradePt1 = [
    'Midtown',
    'Uptown',
    'Hometown',
    'Midland',
    'Homeland',
    'Central',
    'Coastal',
    'Heartland',
    'Trusted',
    'Authentic'
]

const tradePt2 = [
    ' Tire and Service',
    ' Parts and Service',
    ' Tire Care',
    ' Travel Stop',
    ' Tire',
    ' Brakes and Service',
    ' Lube and Battery'
]

const states = [
    'AL',
    'AK',
    'TX',
    'LA',
    'OH',
    'NV',
    'VT',
    'NY',
    'WA',
    'CA',
    'NM',
    'AZ',
    'CO',
    'MT',
    'WY',
    'OR',
    'ID',
    'ND',
    'SD',
    'NE',
    'KS',
    'MO',
    'IA',
    'WI',
    'MN',
    'MI',
    'IL',
    'KY',
    'AR',
    'PA'
]

const roles = [
    'No-Conf',
    'GYRepre',
    'CAStore',
    'USStore',
    'SiteAdm'
]

const rand = (max) => {return ~~(Math.random() * max)}
const randKey = (arr) => {
    return arr[rand(arr.length)]
}

const lPad = (str, len = 9) => {
    while(str.length < len) {
        str = '0' + str
    }
    return str
}

const defaultPass = '$2a$10$r.Nlitz0cVeWeuVa4Lf/Sugw/LZlwBPEZGSqYU52KRz1Be73Dgwsi'

let generatedCustomers = []
let generatedUsers = []

console.log('INSERT INTO `sys_customer` (sys_id, nsNonsig, nsTradeStyle, nsState, nsPostalCode, nsCountry, nsType) VALUES \n')
for(var j = 0; j < customersToGenerate; j++) {
    let tradestyle = randKey(tradePt1) + randKey(tradePt2)
    let type = randKey(types)
    let custNum = lPad(rand(100000000).toString())
    console.log(`('${uuid()}', '${custNum}', '${tradestyle}', '${randKey(states)}', '${rand(10000)}', '${type.slice(0, 2)}', '${type}'),`)
    generatedCustomers.push(custNum)
}

console.log('INSERT INTO `sys_user` (sys_id, username, userFirstName, userLastName, userPass, email, userIsLocked, userIsConfirmed, userDefaultNonsig) VALUES \n')
for(var i = 0; i < usersToGenerate; i++) {
    let firstName = randKey(firstNames)
    let lastName = randKey(surNames)
    let email = `${firstName}_${lastName}_${i}@testexample.com`
    let sys_id = uuid()
    let customer = randKey(generatedCustomers)
    generatedUsers.push({
        sys_id,
        customer
    })
    console.log(`('${sys_id}', '${firstName}_${lastName}_${i}', '${firstName}', '${lastName}', '${defaultPass}', '${email}', 0, 1, '${customer}'),`)
}

console.log('INSERT INTO `sys_user_nsacl` (nsaUserId, nsaNonsig, nsaRole, nsaConfirmedByAdmin) VALUES \n')
generatedUsers.forEach(user => {
    console.log(`('${user.sys_id}', '${user.customer}', '${randKey(roles)}', 1),`)
})