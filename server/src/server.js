import app from "./app/app.js";
import config from "./config/config.js";
import connectDB from "./config/db.js";

await connectDB();

const Port = config.PORT || 4000;
app.listen(Port, ()=>{
    console.log("Server is running on port 3000");
});