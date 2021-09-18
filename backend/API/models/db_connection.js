const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "coolpals_db"
})

db.connect((error)=>{
    if(error) {
        console.log("error connecting to database")
        throw error;
    }
    else {
        console.log("successfully connected to database")
    }
})

module.exports = db;
