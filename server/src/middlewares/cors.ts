// import { Request, Response, NextFunction } from "express";

// type CORS = (req: Request, res: Response, next: NextFunction) => void;

// let regex =
//   /^(?:https?:\/\/(?:vkaswin\.github\.io|localhost:\d+|vercel\.com))$/;

// let allowedHeaders = ["Authorization", "Content-Type"];

// const cors: CORS = (req, res, next) => {
//   let origin = req.headers.origin;
//   let method = req.method;

//   if (origin && regex.test(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "*");
//     res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(", "));
//     res.setHeader("Access-Control-Allow-Credentials", "true");

//     return method == "OPTIONS" ? res.status(200).end() : next();
//   }

//   return !origin ? next() : res.status(403).end();
// };

// export default cors;


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

// Allow only specific frontend URLs
let regex = /^(?:https?:\/\/(?:google-sheets-clone-one\.vercel\.app|localhost:\d+))$/;
let allowedHeaders = ["Authorization", "Content-Type"];

const cors = (req, res, next) => {
    let origin = req.headers.origin;
    let method = req.method;

    if (origin && regex.test(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin); // ✅ Allow only the request's origin
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(", "));
        res.setHeader("Access-Control-Allow-Credentials", "true");

        if (method === "OPTIONS") {
            return res.status(200).end();
        }
        return next();
    }

    return !origin ? next() : res.status(403).json({ error: "CORS Policy: Origin not allowed" });
};

exports.default = cors;

