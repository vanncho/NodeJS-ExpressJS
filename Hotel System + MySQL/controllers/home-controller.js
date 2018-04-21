module.exports = {

    index: (req, res) => {

        let error = req.query.error;

        let data = {};

        if (error) {
            data.error = error;
        }

        res.render('home/index', {data});
        
    },
    about: (req, res) => {

        res.render('home/about');
    }
};