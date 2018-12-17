const userController = require('./user-controller');
const roleController = require('./role-controller');
const categoryController = require('./category-controller');
const eventController = require('./event-controller');
const ticketController = require('./ticket-controller');

module.exports = {
    userController: userController,
    roleController: roleController,
    categoryController: categoryController,
    eventController: eventController,
    ticketController: ticketController
};