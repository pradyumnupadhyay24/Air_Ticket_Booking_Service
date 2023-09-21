const express = require('express');

const bodyParser= require('body-parser');

const db = require('./models/index');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index')

const app = express();

const setupAndStartServer = () => {

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use('/api',apiRoutes);


    app.listen(PORT, () => {
        console.log(`Server Started on Port: ${PORT}`);

        if(process.env.DN_SYNC){
            db.sequelize.sync({alter:true});
        }
    });
}   

setupAndStartServer();