import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import upload from 'express-fileupload';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import multer from 'multer';
import authRoutes from './routes/admin/authroutes.js';
import profileRoutes from './routes/admin/profileRoutes.js';
import { checkLogin } from './utils/authUtils.js';

dotenv.config({ path: './config.env' });
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, 'config.env') });
const app = express();
app.use(upload());
app.use(express.json());
app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }));
app.use(cookieParser());
app.use(expressLayouts);
// app.use('/', route);
app.use(cookieParser());

// Configure multer for handling multipart/form-data
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// Use middleware to handle form data uploads
// app.use(upload.none());
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/',(req,res)=>{
  res.status(200).json({'hellow':'sweetdev'})
})
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
