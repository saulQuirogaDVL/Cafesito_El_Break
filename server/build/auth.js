"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).json({ Text: "Don't Authorized " });
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (token != null) {
        const verifiedToken = jsonwebtoken_1.default.verify(token, 'secretkey');
        console.log(verifiedToken);
        next();
    }
    else {
        res.status(400).json({ text: "Unathorize Token" });
    }
}
exports.default = verifyToken;
