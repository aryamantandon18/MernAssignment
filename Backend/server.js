import { app } from "./app.js";
import { connectDB } from "./data/database.js";
import cors from "cors"

// app.use(cors());

const corsOptions = {
    origin: 'http://localhost:5173', // Allow all origins
  };

app.use(cors(corsOptions));
connectDB();

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is working on http://localhost:${port} in ${process.env.node_env} mode`);
})