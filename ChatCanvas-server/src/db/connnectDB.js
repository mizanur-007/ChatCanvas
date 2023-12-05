const mongoose = require('mongoose')
require('dotenv').config()

const getConnectString = ()=>{
    let connectURI;

    if(process.env.NODE_ENV =='development'){
        connectURI = process.env.DATABASE
        connectURI = connectURI.replace('<username>', process.env.DB_USER)
        connectURI = connectURI.replace('<password>', process.env.DB_PASSWORD)
    }
    else{
        connectURI = process.env.DATABASE
        connectURI = connectURI.replace('<username>', process.env.DB_USER)
        connectURI = connectURI.replace('<password>', process.env.DB_PASSWORD)
    }

    return connectURI;
}

const connectToDB = async()=>{
    const url = getConnectString()
    
    await mongoose.connect(url,{dbName: process.env.DB_NAME})
    console.log('database connected')
}

module.exports = connectToDB