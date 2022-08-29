
const { ObjectId } = require('mongodb');
const path = require('path');
const porject_collection = require('../../db/mongoConnection/mongoConnection.');
const date_provider = require('../../functions/date_provider');
const fs = require('fs-extra');

const update_porject = async (req, res) => {
    try {
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
                const new_img_path = await path.join(__dirname, `../privet_route/../../images/porject_image/${image.name}`)
                const findItem = await porject_collection.findOne({ _id: ObjectId(req.body.id) })
                if (findItem._id) {
                    const ress = await porject_collection.updateOne(
                        { _id: ObjectId(req.body.id) },
                        {
                            $set: {
                                title: req.body.title,
                                gitHub: req.body.gitHub,
                                liveLink: req.body.liveLink,
                                img: image.name
                            }
                        })
                    if (ress.modifiedCount > 0 && ress.matchedCount > 0) {
                        const previous_img_path = await path.join(__dirname, `../privet_route/../../images/porject_image/${findItem.img}`)

                        const imageUpload = await image.mv(new_img_path)
                            fs.remove(previous_img_path, err => {
                                res.status(201).send({ sucess: "SucessFully updated porject!" })
                            })

                    } else {
                        res.status(500).send({ message: "Failed to update Project!" })
                    }
                }
            } else {
                res.status(500).send({ message: "Failed to update Project!" })
            }

        }
    } catch (error) {
        if (error.message) {
            res.status(500).send({ message: error.message })
        } else {
            res.status(500).send({ message: "Failed to update Project!" })
        }
    }
}

module.exports = update_porject;
