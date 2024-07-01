const app = require('./app');
const connectDB = require("./config/db");

const port = 3000;

connectDB();




app.listen(port,() => {
    console.log(`Server Listening on Port http://localhost:${port}`);
})