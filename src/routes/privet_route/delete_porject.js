const { ObjectId } = require('mongodb');
const path = require('path');
const fs = require('fs-extra');
const porject_collection = require('../../db/mongoConnection/mongoConnection.');


const delete_porject = async (req, res) => {
    try {
        const { id, ImgName } = await req.query;

        const previous_img_path = await path.join(__dirname, `../privet_route/../../images/porject_image/${ImgName}`)

        const result = await porject_collection.deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount > 0) {
            fs.remove(previous_img_path, err => {
                res.status(200).send({ sucess: "SucessFully deleted porject!" })
            })
        }
    } catch (error) {
        if (error.message) {
            res.status(500).send({ message: error.message })
        } else {
            res.status(500).send({ message: "Failed to load data!" })
        }
    }
}

module.exports = delete_porject ;
