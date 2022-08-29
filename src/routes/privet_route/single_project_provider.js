const { ObjectId } = require("mongodb")
const porject_collection = require("../../db/mongoConnection/mongoConnection.")

const single_project_provider = async (req, res) => {
    try {
        const porjectID = req.query.id
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
}

module.exports = single_project_provider;