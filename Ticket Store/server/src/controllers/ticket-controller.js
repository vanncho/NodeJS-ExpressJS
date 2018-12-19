const Ticket = require('../models/').Ticket;

const log4js = require('log4js');
log4js.configure({
    appenders: { 'ticket-controller': { type: 'file', filename: 'errors.log' } },
    categories: { default: { appenders: ['ticket-controller'], level: 'ALL' } },
});

const logger = log4js.getLogger('ticket-controller');

module.exports = {

    addTicket: (req, res) => {

        const ticket = Ticket.build({
            count: req.body.ticketsCount,
            price: req.body.price,
            priceCategory: req.body.priceCategory,
            eventId: req.body.eventId
        });

        ticket.save().then(() => {

            res.status(200).send({ data: 'Success', errors: [] });
        }).catch(err => {

            logger.error(err);
        });
        
    },
    getAllTickets: (req, res) => {
        
        Ticket.findAll({ where: { eventId: req.params.id } }).then(tickets => {

            res.status(200).send({ data: tickets, errors: [] });
        }).catch(err => {

            logger.error(err);
        });
    },
    getTicketById: (req, res) => {

        Ticket.findByPk(req.params.id).then(ticket => {
            
            res.status(200).send({ data: ticket, errors: [] });
        }).catch(err => {

            logger.error(err);
        });
    },
    editTicket: (req, res) => {

        const ticket = {
            count: req.body.ticketsCount
        };

        if (req.body.price && req.body.priceCategory) {

            ticket['price'] = req.body.price;
            ticket['priceCategory'] = req.body.priceCategory;
        }

        Ticket.update(ticket, { where: { id: req.body.id } }).then(rows => {

            res.status(200).send({ errors: [] });
        }).catch(err => {

            logger.error(err);
        });
    },
    deleteTicket: (req, res) => {

        const ticketId = req.params.id;

        Ticket.destroy({ where: { id: ticketId } }).then(() => {

            res.status(200).send({ data: 'Success', errors: [] });
        }).catch(err => {

            logger.error(err);
        });
    }
}