import express from "express"
import cors from "cors"
import { dbConnect } from "./config/dbConnect.js";
dbConnect()
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"
import resturantRoutes from "./routes/resturantRoutes.js"
import menuRoutes from "./routes/menuRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
const corsOptions = {
    origin: ['http://localhost:5173', '*'],
    credentials: true,
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};
app.use(cors(corsOptions));
app.use("/user", userRoutes);
app.use("/resturant", resturantRoutes)
app.use("/menu", menuRoutes)
app.use('/carts', cartRoutes)
app.get("/", (req, res) => {
    res.send("Hello World!");

});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "rajaramsahoo1998@gmail.com", // Your Gmail address
//     pass: "drye whxb utfa dalf", // Use the App Password (not your actual Gmail password)
//   },
// });

// const mailOptions = {
//   from: "rajaramsahoo1998@gmail.com",
//   to: "luminaryitishree@gmail.com",
//   subject: "Test Email from Nodemailer",
//   text: "Hello! This is a test email sent using Nodemailer.",
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log("Error:", error);
//   } else {
//     console.log("Email sent:", info);
//   }
// });
