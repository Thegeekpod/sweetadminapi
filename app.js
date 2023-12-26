const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload');
const dotenv = require('dotenv');
const apiconfig = require('./apiconfig.json')
const authRoutes = require('./routes/admin/authroutes')

dotenv.config({ path: "./config.env" });

app.use(upload());
app.use(express.json());
app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(`${apiconfig.ROOTAPI}${apiconfig.API_FIRSTPOINT.LOGIN}`, authRoutes);
app.use('/', (req, res) => {
  res.status(200).json({ 'hello': 'sweetdeveloper' });
});



const http = require("http").createServer(app);
http.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));