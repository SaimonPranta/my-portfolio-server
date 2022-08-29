const porject_collection = require("../../db/mongoConnection/mongoConnection.")

const porject_porvider = async (req, res) => {
    try {
        const projects = await porject_collection.find({})
            .toArray((err, document) => {
                if (document.length) {
                    res.status(200).send(document)
                } else {
                    res.status(200).send([])
                }
            })
    } catch (error) {
        res.status(200).send([])
    }
}

module.exports = porject_porvider;