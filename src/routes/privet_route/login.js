// pr@nta6969
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin_collecion = require("../../db/mongoConnection/db_admin_connection");

const login = async (req, res) => {
    try {
        const { email, password } = await req.body

        if (email && password) {
            const userArry = await admin_collecion.findOne({ email: email });

            if (userArry._id) {
                bcrypt.compare(password, userArry.password, async (err, result) => {
                    if (result) {
                        const token = await jwt.sign(
                            {
                                email: userArry.email,
                                id: userArry._id
                            },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: "1d" }
                        );
                        res.status(200).json({
                            token: token,
                            sucess: "You are sucessfully login"
                        })
                    } else {
                        res.status(401).json({ failed: "user/password are invalid, please try again." })
                    }
                })

            } else {
                res.status(401).json({ failed: "user/password are invalid, please try again." })
            }
        } else {
            res.status(401).json({ failed: "user/password are invalid, please try again." })
        }

    } catch (err) {
        res.status(401).json({ failed: "user/password are invalid, please try again." })
    }
}




module.exports = login;
