import express from "express";
const cors = require('cors');

import photoRouter from "./src/_Photo/routes/index";

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

app.use("/api/v1", photoRouter);

export default app;
