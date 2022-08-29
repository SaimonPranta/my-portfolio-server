const handleNodeMailer = require("../../ContactMailer/ContactMailer");

const message = async (req, res) => {
    try {
        handleNodeMailer(req.body)
            .then(data => {
                if (data.messageId) {
                    res.send({ sucess: 'sucess' })
                } else {
                    res.status(500).send({ message: 'Failed to send Mail, please try again' });
                }
            })
            .catch(err => {
                res.status(500).send({ message: 'Failed to send Mail, please try again' });
            })
    } catch (error) {
        res.status(500).send({ message: 'Failed to send Mail, please try again' });
    }
}

module.exports = message ;