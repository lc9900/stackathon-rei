const router = require('express').Router();
const {User, Transaction, Property} = require('../db/models');

module.exports = router;

// router.get('/:id', (req, res, next) => {
//     User.findById(req.params.id)
//         .then(user => res.send(user))
// })

// // Find all transaction under the user
// router.get('/:id/transactions', (req, res, next) => {
//     Transaction.findAll({
//         where: {userId: req.params.id * 1},
//         include: [Property]
//     }).then( transactions => res.send(transactions))
//     .catch(next);
// })

// // Find all properties under the user
// router.get('/:id/properties', (req, res, next) => {
//     Property.findAll({
//         where: {userId: req.params.id * 1},
//         include: [Transaction]
//     }).then(properties => res.send(properties))
//     .catch(next);
// })
