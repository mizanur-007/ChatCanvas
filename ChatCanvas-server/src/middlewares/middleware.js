const cors = require("cors")
const express = require("express");
const cookieParser = require("cookie-parser")
const { LOCAL_CLIENT } = require("../config/corsconfig");

const middlewares = (app)=>{
    app.use(cors({
        origin: [LOCAL_CLIENT,"https://chatcanvas-460ce.web.app","https://chatcanvas-460ce.firebaseapp.com"],
        credentials: true
    }));
    app.use(express.json());
    app.use(cookieParser())
}

module.exports = middlewares;