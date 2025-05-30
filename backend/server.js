import express from 'express'
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';

import notesRoutes from "./src/routes/notesRoutes.js"
import { connectDB } from './src/config/db.js';
import rateLimiter from './src/middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

// middleware
if(process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173"
  }));
}
app.use(express.json());
app.use(rateLimiter)

app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,  "../frontend/dist")));

  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use(express.static(path.join(__dirname,"../frontend/dist")))


connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server Up on PORT ${PORT}`);
  })
})