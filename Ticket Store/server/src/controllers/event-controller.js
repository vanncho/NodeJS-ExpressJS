const Sequelize = require('sequelize');
const Event = require('../models/').Event;
const Category = require('../models/').Category;

const log4js = require('log4js');
log4js.configure({
    appenders: { 'event-controller': { type: 'file', filename: 'errors.log' } },
    categories: { default: { appenders: ['event-controller'], level: 'ALL' } },
});

const logger = log4js.getLogger('event-controller');

module.exports = {

    addEvent: (req, res) => {

        const event = Event.build({
            title: req.body.title,
            url: req.body.url,
            location: req.body.location,
            date: req.body.date,
            time: req.body.time,
            town: req.body.town,
            description: req.body.description,
            categoryId: req.body.categoryId
        });

        event.save().then(() => {

            res.status(200).send();
        }).catch(err => {

            logger.error(err);
        });
    },
    getAllEvents: (req, res) => {

        Event.findAll({
            attributes: ['id', 'description', 'location', 'title'],
            include: [{ 
                model: Category,
                as: 'category',
                required: true,
                attributes: ['id', 'name']
            }] 
        }).then(events => {

            res.status(200).send(events);
        }).catch(err => {

            logger.error(err);
        });
    },
    deleteEvent: (req, res) => {

        const eventId = req.params.id;

        Event.destroy({ where: { id: eventId } }).then((rows) => {

            if (rows > 0) {
                res.status(200).send();
            } else {
                res.status(400).send('Event with provided id does not exists!');
            }
        }).catch(err => {

            logger.error(err);
        });
    },
    getEventById: (req, res) => {

        Event.findByPk(req.params.id,
            {
                attributes: ['id', 'date', 'description', 'location', 'time', 'title', 'town', 'url'],
                include: { 
                    model: Category,
                    as: 'category',
                    required: true,
                    attributes: ['id', 'name']
                }
            }).then(event => {

            res.status(200).send(event);
        }).catch(err => {

            logger.error(err);
        });
    },
    editEvent: (req, res) => {

        const eventEdit = {
            title: req.body.title,
            url: req.body.url,
            location: req.body.location,
            date: new Date(req.body.date),
            time: req.body.time,
            town: req.body.town,
            description: req.body.description,
            categoryId: req.body.categoryId
        };

        Event.update(eventEdit, { where: { id: req.body.id } }).then(rows => {

            res.status(200).send();
        }).catch(err => {

            logger.error(err);
        });

    },
    searchEvent: (req, res) => {

        const eventTitle = (req.body.eventTitle).toLowerCase();

        Event.findAll({
            attributes: ['id', 'description', 'location', 'title'],
            include: [{ 
                model: Category,
                as: 'category',
                required: true,
                attributes: ['id', 'name']
            }],
            where: { 
                name: Sequelize.where(Sequelize.fn('lower', Sequelize.col('title')), `LIKE`, `%${eventTitle}%`)
            }} ).then(events => {

            res.status(200).send(events);
        }).catch(err => {

            logger.error(err);
        });

    }
};
