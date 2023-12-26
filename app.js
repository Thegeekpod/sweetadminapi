const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload');
const dotenv = require('dotenv');
const { fileURLToPath } = require('url');
const multer = require('multer');
const authRoutes = require('./routes/admin/authroutes.js');
const profileRoutes = require('./routes/admin/profileRoutes.js');
const { checkLogin } = require('./utils/authUtils.js');
const api = require('./apiconfig.json');
dotenv.config({ path: './config.env' });
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, 'config.env') });
const app = express();
app.use(upload());
app.use(express.json());
app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }));
app.use(cookieParser());
app.use(expressLayouts);
app.use(cookieParser());
// console.log(`${api.ROOTAPI}/${api.API_FIRSTPOINT.LOGIN}`)
app.use(`${api.ROOTAPI}${api.API_FIRSTPOINT.LOGIN}`, authRoutes);
app.use(`${api.ROOTAPI}${api.API_FIRSTPOINT.PROFILE}`, profileRoutes);
app.use('/', (req, res) => {
  res.status(200).json({ 'hello': 'sweetdeveloper' });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
