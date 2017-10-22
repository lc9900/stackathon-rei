const db = require('./');
const { Sequelize } = db;

//Models
const {User, Transaction, Property} = require('./models');


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
            Transaction.create({
                description: 'roof repair',
                amount: '-1000',
                userId: 1,
                year: 2017,
                month: 'June',
                propertyId: 1
            }),
            Transaction.create({
                description: 'rent',
                amount: '1300',
                userId: 1,
                year: 2017,
                month: 'June',
                propertyId: 1
            }),
            Transaction.create({
                description: 'lawn maintenance',
                amount: '-100',
                userId: 1,
                year: 2017,
                month: 'June',
                propertyId: 1
            }),

            Transaction.create({
                description: 'agent fee',
                amount: '-500',
                userId: 1,
                year: 2017,
                month: 'June',
                propertyId: 2
            }),
            Transaction.create({
                description: 'rent',
                amount: '1000',
                userId: 1,
                year: 2017,
                month: 'June',
                propertyId: 2
            }),
            Transaction.create({
                description: 'lawn maintenance',
                amount: '-100',
                userId: 1,
                year: 2017,
                month: 'June',
                propertyId: 2
            }),
        ])
    })
}


