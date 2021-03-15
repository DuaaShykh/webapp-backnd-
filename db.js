const mysql = require('mysql');
// const express = require('express');
// const app = express();


var connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "9990",
    database: "fyp_db",
    port: "3306"
})

connection.connect((err)=>{
    if(err){
        throw err
    }
    else{
        console.log("connected")
    }
})

module.exports = connection;