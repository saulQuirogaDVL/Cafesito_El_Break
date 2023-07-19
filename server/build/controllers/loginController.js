"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
class LoginController {
    singin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield database_1.default.query("SELECT * FROM users WHERE email=?", [email]);
            if (user.length === 0) {
                return res.status(404).json({ Text: "The user doesn't exist" });
            }
            if (user[0].password != password) {
                return res.status(401).json({ Text: "The password is wrong " });
            }
            const data = JSON.stringify(user[0]);
            const token = jsonwebtoken_1.default.sign(data, "secretkey");
            res.json(token);
        });
    }
}
exports.loginController = new LoginController();
