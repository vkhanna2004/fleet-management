import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import app from "app.js";

const PORT=process.env.PORT || 5000;

(async()=>{
    try{
        await connectDB();
        app.listen(PORT,()=>console.log(`🚀 Server running on  localhost:${PORT}`))
    }
    catch(error){
        console.error("Error starting the server:", error);
        process.exit(1);
    }
})();