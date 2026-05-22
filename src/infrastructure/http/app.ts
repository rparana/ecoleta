import express from "express";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import routes from "./routes";

const app = express();

// Load OpenAPI specification
const swaggerDocument = yaml.load(path.resolve(__dirname, "..", "..", "..", "openapi.yaml"));

app.use(cors());
app.use(express.json());

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "..", "..", "uploads")));

export default app;
