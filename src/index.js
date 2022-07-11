const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

// internal module
const db = require("../src/db/mongoConnection/mongoConnection.");
const handleNodeMailer = require('./ContactMailer/ContactMailer.js');
const { ObjectId } = require('mongodb');


// initial variable
const app = express();
const port = process.env.PORT || 7000;

// middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Handle Website Message
app.post("/get_message", async (req, res) => {
    try {
        handleNodeMailer(req.body)
            .then(data => {
                if (data.messageId) {
                    res.send({ sucess: 'sucess' })
                } else {
                    res.status(500).send({ message: 'Error' });
                }
            })
            .catch(err => {
                res.status(500).send({ message: 'Error' });
            })
    } catch (error) {
        res.status(500).send({ message: 'Error' });
    }
})


// DB Conection Bulding
db.connect(err => {
    const porject_collection = db.db("Projects").collection("project_lists");

    // Update Project Route
    app.patch("/api/porjects", async (req, res) => {
        try {
            const currentDate = new Date();
            const image = req.files.image;
            if (
                image.mimetype !== "image/jpg" &&
                image.mimetype !== "image/png" &&
                image.mimetype !== "image/jpeg"
            ) {
                res.status(500).send({ message: "Only .jpg .png or .jpeg format allowed!" })
            } else if (image.size >= "1500012") {
                res.status(500).send({ message: "File are too large!" })
            } else {
                const encodedImage = image.data.toString('base64');
                const base64Image = {
                    contentType: image.mimetype,
                    size: image.size,
                    data: Buffer.from(encodedImage, 'base64')
                }

                const projectInfo = {
                    title: req.body.title,
                    gitHub: req.body.gitHub,
                    liveLink: req.body.liveLink,
                    date: currentDate
                }

                if (req.body.title && req.body.gitHub && req.body.liveLink && image) {
                    const ress = await porject_collection.updateOne(
                        { _id: ObjectId(req.body.id) },
                        { $set: { ...projectInfo, image: base64Image } }
                    );
                    if (ress.modifiedCount) {
                        res.status(201).send({ sucess: "SucessFully updated porject!" })
                    } else {
                        res.status(500).send({ message: "Failed to update Project!" })
                    }
                }

            }

        } catch (error) {
            if (error.message) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(500).send({ message: "Failed to create Project!" })
            }
        }
    });

    // Get Projects Route
    app.get("/api/porjects", async (req, res) => {
        try {
            const projects = await porject_collection.find({})
                .toArray((err, document) => {
                    if (document.length) {
                        res.send(document)
                    }
                })
        } catch (error) {
            if (error.message) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(500).send({ message: "Failed to load data!" })
            }
        }
    });


    // Get Single Project Route
    app.get("/api/single_porject", async (req, res) => {
        const porjectID = req.query.id
        try {
            const projects = await porject_collection.find({ _id: ObjectId(porjectID) })
                .toArray((err, document) => {
                    if (!err) {
                        res.send(document)
                    }
                })
        } catch (error) {
            if (error.message) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(500).send({ message: "Failed to load data!" })
            }
        }
    });

    // Delete Project Route
    app.delete("/api/single_porject", async (req, res) => {
        try {
            const {id} = req.query;
            const result = await porject_collection.deleteOne({_id: ObjectId(id)});
            if (result.deletedCount > 0) {
                res.status(200).send({ sucess: "SucessFully deleted porject!" })
            }
        } catch (error) {
            if (error.message) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(500).send({ message: "Failed to load data!" })
            }
        }
    });


});


// Home Route
app.get("/", (req, res) => {
    res.send("Your server are online now....")
});


// Error Handleing Middleware
app.use((error, req, res, next) => {
    if (error.message) {
        res.status(500).send({ message: error.message })
    }
})


app.listen(port, () => {
    console.log(`listening to port ${port}`)
})
