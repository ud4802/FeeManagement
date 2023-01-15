import mongoose from "mongoose";
//const connection = ()=> {};
const connection = () => {
    mongoose.connect('mongodb+srv://ud:umangdasaniya@cluster0.hte1fdr.mongodb.net/?retryWrites=true&w=majority', () => {
        console.log("Successfuly connected with database");
    });

    mongoose.set('strictQuery', false);
    // process.env.PORT is set in deployment by hosting site
    //const port = process.env.PORT | 5000;
    //app.listen(port, () => console.log(`Server is up and running on${port}`));
}

export default connection;

