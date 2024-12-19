const express = require('express');
const connect = require('./db');
const cors = require('cors');

const productRoute = require('./routes/products');
const notesRoute = require('./routes/notes');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const roadmapRoute = require('./routes/roadmap');

const app = express();
const port = 4001;

app.use(express.json());
app.use(cors({origin : '*'}));
connect.connect();

app.use('/products', productRoute.route);
app.use("/notes", notesRoute.route);
app.use("/auth", authRoute.route);
app.use("/users", userRoute.route);
app.use("/roadmaps", roadmapRoute.route);

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});