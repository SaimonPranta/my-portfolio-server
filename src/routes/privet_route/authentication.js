const jwt = require("jsonwebtoken");


const authentication = async (req, res) => {
    try {
        const token = await req.headers.authorization.split(" ")[1]
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded && decoded.email) {
            res.status(200).json({sucess: "you are authenticate person."})

        } else {
            res.status(401).json({ error: "Unauthorized  attempt, please try out latter." })
        }
    } catch (error) {
        res.status(401).json({ error: "Unauthorized  attempt, please try out latter." })
    }
}

module.exports = authentication;




