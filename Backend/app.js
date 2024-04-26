import express from 'express'
import session from 'express-session';
import cors from 'cors'
import bodyParser from 'body-parser'
import {config} from 'dotenv'
import ConnectMongoDBSession from 'connect-mongodb-session';
import userRoutes from './routes/user.js'

export const app = express();

config({          // to use .env file variables
    path:"./data/config.env"
})
const mongodbStore = ConnectMongoDBSession(session);
const store = new mongodbStore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true , limit: '50mb'}));

app.use(session({
    secret: "key that will sign the cookie",
    resave:false,
    saveUninitialized:true,       
    cookie: {secure:true},
    store:store
}));

// app.use(cors({
//     origin:"*",
//     credentials:true,
// }))

app.use('/users',userRoutes);

app.get('/',(req,res)=>{
    req.session.isAuth = true;
    console.log(session);
    res.send("Hello Guys Welcome");
})


