const router = require('express').Router();
const {User, Transaction, Property, Investment} = require('../db/models');

module.exports = router;

router.get('/:id', (req, res, next) => {
    Property.findById(req.params.id)
        .then(property => res.send(property))
        .catch(next);
})

// Find all transaction for a property
router.get('/:id/transactions', (req, res, next) => {
    Transaction.findAll({
        where: {propertyId: req.params.id * 1},
    }).then( transactions => res.send(transactions))
    .catch(next);
});


router.get('/:id/investments', (req, res, next) => {
    Investment.findAll({
        where: {propertyId: req.params.id * 1},
    }).then( investment => res.send(investment))
    .catch(next);
});
// // Find all properties under the user
// router.get('/:id/properties', (req, res, next) => {
//     Property.findAll({
//         where: {userId: req.params.id * 1},
//         include: [Transaction]
//     }).then(properties => res.send(properties))
//     .catch(next);
// })
