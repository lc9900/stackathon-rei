const db = require('./');
const { Sequelize } = db;

//Models
const {User, Transaction, Property, Investment} = require('./models');


db.sync({force:true})
    .then(() => {
        return seed();
    })
    .then(() => {
        console.log('***********************Seeded***********************');
    })
    .catch(err => { throw err; });

const seed = () => {
    return User.create({name: 'Han Gu', email: "han@han.com", password: '123'})
    .then(() => {
        return Property.create({
            address: ' 1 test Rd',
            city: 'REIA',
            state: 'NY',
            zip: '00001',
            userId: 1
        })
    }).then(() => {
        return Property.create({
            address: ' 2 test Rd',
            city: 'REIA',
            state: 'NY',
            zip: '00001',
            userId: 1
        })
    })
    .then(() => {
        return Promise.all([
                    Investment.create({invested: '53000', propertyId: 1, userId: 1}),
                    Investment.create({invested: '15000', propertyId: 2, userId: 1}),
                ]);
    })

    .then(() => {
        return Promise.all([
            Transaction.create({
                description: 'Roof repair',
                amount: '-1000',
                userId: 1,
                year: 2017,
                month: 'Janurary',
                propertyId: 1
            }),
            Transaction.create({
                description: 'Rent',
                amount: '1300',
                userId: 1,
                year: 2017,
                month: 'Janurary',
                propertyId: 1
            }),
            Transaction.create({
                description: 'Lawn maintenance',
                amount: '-100',
                userId: 1,
                year: 2017,
                month: 'Janurary',
                propertyId: 1
            }),

            Transaction.create({
                description: 'Agent fee',
                amount: '-500',
                userId: 1,
                year: 2017,
                month: 'Janurary',
                propertyId: 2
            }),
            Transaction.create({
                description: 'Rent',
                amount: '1000',
                userId: 1,
                year: 2017,
                month: 'Janurary',
                propertyId: 2
            }),
            Transaction.create({
                description: 'Lawn maintenance',
                amount: '-100',
                userId: 1,
                year: 2017,
                month: 'Janurary',
                propertyId: 2
            }),
            Transaction.create({
                description: 'Leaking pipe',
                amount: '-100',
                userId: 1,
                year: 2016,
                month: 'December',
                propertyId: 2
            }),
            Transaction.create({
                description: 'Rent',
                amount: '1000',
                userId: 1,
                year: 2016,
                month: 'December',
                propertyId: 2
            }),
            Transaction.create({
                description: 'Clogged drain',
                amount: '-100',
                userId: 1,
                year: 2016,
                month: 'December',
                propertyId: 2
            }),
            Transaction.create({
                description: 'Trimming tree branches',
                amount: '-300',
                userId: 1,
                year: 2016,
                month: 'December',
                propertyId: 1
            }),
            Transaction.create({
                description: 'Rent',
                amount: '1300',
                userId: 1,
                year: 2016,
                month: 'December',
                propertyId: 1
            }),
            Transaction.create({
                description: 'Replace shower head',
                amount: '-50',
                userId: 1,
                year: 2016,
                month: 'December',
                propertyId: 1
            }),
        ])
    })
}


