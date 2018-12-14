const Category = require('../models/').Category;

module.exports = {

    addCategory: (req, res) => {

        const category = req.body.name;

        if (category !== '') {

            const categorySave = Category.build({
                name: category
            });

            categorySave.save().then(() => {

                res.status(200).send({ data: 'Success', errors: [] });
            }).catch(e => {

                // TODO:
                console.log(e);
            });
        } else {

            res.status(200).send({ errors: ['Invalid category name!'] });
        }

    },
    getCategories: (req, res) => {

        Category.findAll({ raw: true }).then(categories => {

            res.status(200).send({ data: categories, errors: [] });
        }).catch(e => {

            // TODO:
            console.log(e);
        });
    },
    getCategoryById: (req, res) => {

    },
    editCategory: (req, res) => {

    },
    deleteCategory: (req, res) => {

        const categoryId = req.params.id;

        Category.destroy({ where: { id: categoryId } }).then((ed) => {

            res.status(200).send({ data: 'Success', errors: [] });
        }).catch(e => {

            // TODO:
            console.log(e);
        });
    },
    searchCategory: (req, res) => {

    }
};
