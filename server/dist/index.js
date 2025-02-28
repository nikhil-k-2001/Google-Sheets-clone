"use strict";
// import express from "express";
// import dotenv from "dotenv";
// import cors from "./src/middlewares/cors";
// import connect from "./src/database/config";
// import router from "./src/routes";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const port = process.env.PORT;
// const app = express();
// app
//   .use(cors)
//   .use(express.json())
//   .use(express.urlencoded({ extended: false }))
//   .use(router);
// connect().then(() => {
//   app.listen(port, () => {
//     console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
//   });
// });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("./src/middlewares/cors"));
const config_1 = __importDefault(require("./src/database/config"));
const routes_1 = __importDefault(require("./src/routes"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app
    .use(cors_1.default)
    .use(express_1.default.json())
    .use(express_1.default.urlencoded({ extended: false }))
    // ✅ Add this default route for "/"
    .get("/", (req, res) => {
    res.send("✅ Backend is running!");
})
    .use(routes_1.default);
(0, config_1.default)().then(() => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
