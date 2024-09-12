import express from "express";
import router from "./routes";
import loggingMiddleware from "./middleware/log.middleware";
import cors from "cors";
// import swaggerjsdoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import swaggerOptions from "./docs/swagger";
// import cookieParser from "cookie-parser";

const corsOptions = {
  origin: "*", // Allow all origins
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(loggingMiddleware);
// app.use(cookieParser());
app.use(router);

// const swaggerDocs = swaggerjsdoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3000, () => {
  console.log("[*] App running on port :3000...");
});
