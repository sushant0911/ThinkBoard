import express from 'express'
import cors from "cors";
import dotenv from 'dotenv';

import notesRoutes from "./src/routes/notesRoutes.js"
import { connectDB } from './src/config/db.js';
import rateLimiter from './src/middleware/rateLimiter.js';

dotenv.config();

const app = express();

// middleware
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(rateLimiter)

app.use("/api/notes",notesRoutes);

const PORT = process.env.PORT || 5001;


connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server Up on PORT ${PORT}`);
  })
})