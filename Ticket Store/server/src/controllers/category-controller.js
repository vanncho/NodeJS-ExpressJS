const Sequelize = require('sequelize');
const Category = require('../models/').Category;

const log4js = require('log4js');
log4js.configure({
    appenders: { 'category-controller': { type: 'file', filename: 'errors.log' } },
    categories: { default: { appenders: ['category-controller'], level: 'ALL' } },
});

const logger = log4js.getLogger('category-controller');


module.exports = {

    addCategory: (req, res) => {

        const category = req.body.name;

        if (category !== '') {

            const categorySave = Category.build({
                name: category
            });

            categorySave.save().then(() => {

                res.status(200).send();
            }).catch(err => {

                logger.error(err);
            });
        } else {

            res.status(400).send('Invalid category name!');
        }

    },
    getCategories: (req, res) => {

        Category.findAll({ raw: true }).then(categories => {

            res.status(200).send(categories);
        }).catch(err => {

            logger.error(err);
        });
    },
    getCategoryById: (req, res) => {

        const categoryId = req.params.id;

        Category.findByPk(categoryId).then(category => {

            res.status(200).send(category);
        }).catch(err => {

            logger.error(err);
        });
    },
    editCategory: (req, res) => {

        const updateCategory = {
            name: req.body.name
        };

        Category.update(updateCategory, { where: { id: req.body.id} }).then(rows => {

            if (rows > 0) {
                res.status(200).send();
            } else {
                res.status(400).send('Category is not updated.');
            }
        }).catch(err => {

            logger.error(err);
        });
    },
    deleteCategory: (req, res) => {

        const categoryId = req.params.id;

        Category.destroy({ where: { id: categoryId } }).then((rows) => {

            if (rows > 0) {
                res.status(200).send();
            } else {
                res.status(400).send('Category with provided id does not exists!');
            }
            
        }).catch(err => {

            logger.error(err);
        });
    },
    searchCategory: (req, res) => {

        const categoryName = (req.body.categoryName).toLowerCase();

        Category.findAll({ 
            where: { 
                name: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), `LIKE`, `%${categoryName}%`)
            }} ).then(categories => {

            res.status(200).send(categories);
        }).catch(err => {

            logger.error(err);
        });
    }
};
