import  Express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import  cors  from "cors";

const app = express();

const Connection_url = 'mongodb+srv://ud:<password>@cluster0.hte1fdr.mongodb.net/?retryWrites=true&w=majority';

const port = process.env.port || 5000 ;

mongoose.connect(Connection_url,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    () => console.log("Connected database")
)