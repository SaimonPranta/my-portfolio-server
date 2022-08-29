const path = require('path');
const porject_collection = require('../../db/mongoConnection/mongoConnection.');
const date_provider = require('../../functions/date_provider');

const add_porject = async (req, res) => {
    try {
        const currentDate = await date_provider(new Date())
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
            if (req.body.title && req.body.gitHub && req.body.liveLink && image) {

                const extention = await image.mimetype.split("/")[1]
                image.name = await image.name.split(".")[0] + Math.floor(Math.random() * 10) + Date.now() + "." + extention
                const img_path = await path.join(__dirname, `../privet_route/../../images/porject_image/${image.name}`)
                const imageUpload = await image.mv(img_path)
                const projectInfo = await {
                    title: req.body.title,
                    gitHub: req.body.gitHub,
                    liveLink: req.body.liveLink,
                    date: currentDate,
                    img: image.name
                }

                const ress = await porject_collection.insertOne(projectInfo);
                if (ress.acknowledged && ress.insertedId) {
                    res.status(201).send({ sucess: "SucessFully added porject!" })
                } else {
                    res.status(500).send({ message: "Failed to create Project!" })
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
}

module.exports = add_porject;
