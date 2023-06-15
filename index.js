const express = require('express');
const app = express();
const { db } = require('./config/db');

const categoryRoutes = require('./Routes/categoryRoutes');

const serviceRoutes = require('./Routes/serviceRoutes');


app.use(express.json());


db.connect();





app.use("/categories",categoryRoutes);
app.use("/services",serviceRoutes);



app.listen(8080, () => {
    console.log('Server is running...');
})





