const Cart = require('../models/').Cart;
const Event = require('../models/').Event;
const Ticket = require('../models/').Ticket;

const log4js = require('log4js');
log4js.configure({
    appenders: { 'cart-controller': { type: 'file', filename: 'errors.log' } },
    categories: { default: { appenders: ['cart-controller'], level: 'ALL' } },
});

const logger = log4js.getLogger('cart-controller');

module.exports = {

    getCart: (req, res) => {

        Cart.findAll({ where: { userId: req.session.user.id },
                       attributes: ['id', 'ticketsCount'],
                       include: [
                           { model: Event, as: 'event', attributes: ['id', 'date', 'time', 'url', 'title'], required: true },
                           { model: Ticket, as: 'ticket', attributes: ['id', 'price', 'count', 'priceCategory'], required: true }
                        ]
                    }).then(userCart => {

            res.status(200).send(userCart);

        }).catch(err => {

            logger.error(err);
        });
    },
    getCartItemsCount: (req, res) => {

        Cart.findAndCountAll({ where: { userId: req.session.user.id } }).then(cartItems => {

            res.status(200).send(cartItems.count + '');
        }).catch(err => {

            logger.error(err);
        });
    },
    addToCart: (req, res) => {

        const cart = Cart.build({
            userId: req.session.user.id,
            eventId: req.body.eventId,
            ticketId: req.body.ticketId,
            ticketsCount: req.body.count
        });

        cart.save().then(() => {

            res.status(200).send('Success');
        }).catch(err => {

            logger.error(err);
        });
        
    },
    deleteFromCart: (req, res) => {

        const cartId = req.params.id;

        Cart.destroy({ where: { id: cartId } }).then((rows) => {

            if (rows > 0) {
                res.status(200).send();
            } else {
                res.status(400).send('Cart with provided id does not exists!');
            }
        }).catch(err => {

            logger.error(err);
        });
    }
};