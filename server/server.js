const mongoose = require("mongoose");
const Document = require("./Document");

mongoose.connect('mongodb+srv://sherif:sherif123@team27db.pbvhn.mongodb.net/?retryWrites=true&w=majority');

const io = require("socket.io")(process.env.PORT , { 
    cors:{
        origin: "*",
        methods: ["GET", "POST"],
    },
})