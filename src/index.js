const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const add_porject = require('./routes/privet_route/add_porject');
const update_porject = require('./routes/privet_route/update_porject');
const delete_porject = require('./routes/privet_route/delete_porject');
const message = require('./routes/privet_route/message');
const porject_porvider = require('./routes/public/porject_porvider');
const single_project_provider = require('./routes/privet_route/single_project_provider');
const root = require('./routes/root');
const login = require('./routes/privet_route/login');
const authentication = require('./routes/privet_route/authentication');
const authGard = require('./routes/middleware/auth_gard');


// ===========Initial Variable===========
require('dotenv').config();
const app = express();
const port = process.env.PORT || 7000;

// ===========Middleware===========
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "images/porject_image")))
app.use(fileUpload());


// ===========Roote Route===========
app.get("/", root);


// ===========Handle Website Message===========
app.post("/get_message", message)

// ===========Login Route===========
app.post("/login", login)

// ===========authentication Route===========
app.get("/authentication", authentication)




// ===========Get Projects Route===========
app.get("/api/porjects", porject_porvider);


// ===========Add Project Route===========
app.post("/api/porjects",authGard, add_porject);

// ===========Update Project Route===========
app.patch("/api/porjects",authGard, update_porject);

// ===========Get Single Project Route===========
app.get("/api/single_porject", authGard, single_project_provider);

// ===========Delete Project Route===========
app.delete("/api/single_porject", authGard, delete_porject);


// ===========Error Handleing Middleware===========
app.use((error, req, res, next) => {
    console.log(error)
    if (error.message) {
        res.status(500).send({ message: error.message })
    }
})


app.listen(port, () => {
    console.log(`listening to port ${port}`)
})