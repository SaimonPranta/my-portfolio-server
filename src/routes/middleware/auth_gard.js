const jwt = require("jsonwebtoken");


const authGard = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1]
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded && decoded.email) {
            req.email = decoded.email
            req.id = decoded.id
            next()

        } else {
            res.status(401).json({ error: "Unauthorized  attempt, please try out latter." })
        }
    } catch (error) {
        res.status(401).json({ error: "Unauthorized  attempt, please try out latter." })
    }
}


module.exports = authGard;