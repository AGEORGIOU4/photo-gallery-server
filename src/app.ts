import express from "express";
const cors = require('cors');

import authRouter from "./_Auth/routes/index";
import keyRouter from "./_Keys/routes/index";
import protocolRouter from "./_Protocols/routes/index";


import eventRouter from "./_Events/routes/index";

import userRouter from "./_User/routes/index";



const app = express();
app.use(cors());

// Advanced CORS setup - Customize allowed origins and other options
// Replace 'http://example.com' with your actual allowed origin
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: 'GET, POST, PUT, DELETE', // Customize allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Customize allowed headers
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1", authRouter);
app.use("/api/v1", keyRouter);
app.use("/api/v1", protocolRouter);


app.use("/api/v1", eventRouter);

app.use("/api/v1", userRouter);

export default app;
