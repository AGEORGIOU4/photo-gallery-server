import express from "express";
const cors = require('cors');

import photoRouter from "./_Photo/routes/index";
import searchRouter from "./_Search/routes/index";

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
app.use("/api/v1", searchRouter);

export default app;
