import  express from "express";
import cors from "cors";
//import mongoose from "mongoose";

//import bodyParser from "body-parser";
import connection from "./db.js";

//import postroutes from "./route/post.js";

import userRoutes from "./route/login.js";
import authRoutes from "./route/register.js";

const app = express();

connection();

app.use(express.json());
app.use(cors());

app.use("/api/login",userRoutes);
app.use("/api/register",authRoutes);

/*async function fin(){mongoose.connect('mongodb+srv://ud:umangdasaniya@cluster0.hte1fdr.mongodb.net/?retryWrites=true&w=majority', () => {
  console.log("Successfuly connected with database");
 });
 // process.env.PORT is set in deployment by hosting site
 const port = process.env.PORT | 5000;
 app.listen(port, () => console.log(`Server is up and running on
 ${port}`));
}*/

/*async function fin1()
{const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  //email: { type: String, required: false, unique: true },
  //password: { type: String, required: true, min: 6 },
  //isVerified: { type: Boolean, default: false },
 });
}

 fin();
 fin1();*/

 //app.use('/post',postroutes);
 const port = process.env.PORT | 5000;
 app.listen(port, () => console.log(`Server is up and running on${port}`));

 //export {mongoose,userSchema};

 
 












