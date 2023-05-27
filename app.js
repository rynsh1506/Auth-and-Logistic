const express = require("express");
const authRoutes = require("./routes/authRoutes");
const logisticRoutes = require("./routes/logisticRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();

// db connection
connectDB();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/logistic", logisticRoutes);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
