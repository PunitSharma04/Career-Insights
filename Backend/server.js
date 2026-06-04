require("dotenv").config()
const connectToDB = require("./src/config/database")
const app = require('./src/app');



connectToDB()


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})