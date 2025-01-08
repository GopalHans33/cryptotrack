import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) // to accecpt JSON
app.use(express.urlencoded({extended: true, limit:"16kb"})) // data from url in decoded form
app.use(express.static("public")) // folder to access publicily
app.use(cookieParser()) // to use and set cookies


import userRouter from "./routes/user.routes.js"

app.use("/user",userRouter)

export { app }