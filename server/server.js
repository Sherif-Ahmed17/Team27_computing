const mongoose = require("mongoose");
const Document = require("./Document");

mongoose.connect('mongodb+srv://sherif:sherif123@team27db.pbvhn.mongodb.net/?retryWrites=true&w=majority');

const io = require("socket.io")(process.env.PORT , { 
    cors:{
        origin: "*",
        methods: ["GET", "POST"],
    },
})
const defaultValue = ""

io.on("connection", socket => {

    socket.on("get-document", async documentId => {

        const document = await findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit("load-document", document.data)

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta) 
        })

    socket.on("save-document", async data => {

        await Document.findByIdAndUpdate(documentId, { data })
    })

    })
    //console.log("connected")
})