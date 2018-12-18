const Cart = require('../models/').Cart;

module.exports = {

    getCart: (req, res) => {

        // TODO: get user cart
    },
    addToCart: (req, res) => {

        const cart = Cart.build({
            userId: req.session.user.id,
            eventId: req.body.eventId,
            ticketId: req.body.ticketId,
            ticketsCount: req.body.count
        });

        cart.save().then(() => {

            res.status(200).send({ data: 'Success', errors: [] });
        }).catch(err => {

            logger.error(err);
        });
        
    }
};