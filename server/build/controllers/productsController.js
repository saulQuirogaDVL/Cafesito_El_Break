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
exports.productsController = void 0;
const database_1 = __importDefault(require("../database"));
class ProductsController {
    listAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query("SELECT * FROM productos");
            res.json(products);
        });
    }
    listEnabled(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query("SELECT * FROM productos where habilitado = 1");
            res.json(products);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const products = yield database_1.default.query("SELECT * FROM productos WHERE id=?", [id]);
            if (products.length > 0) {
                return res.json(products[0]);
            }
            res.status(404).json({ Text: "The product doesn't exist" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //await pool.query("INSERT INTO productos set ?", [req.body]);
            console.log("si entro");
            res.json({ text: "Product Saved" });
        });
    }
    delete(req, res) {
        const { id } = req.params;
        database_1.default.query("DELETE FROM productos WHERE id=?", [id]);
        res.json({ message: "The Product was deleted" });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("UPDATE productos set ? WHERE id = ?", [req.body, id]);
            res.json({ message: "The Products was updated" });
        });
    }
    photoState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //await pool.query("INSERT INTO productos set ?", [req.body]);
            res.json({ text: "Photo Saved" });
        });
    }
}
exports.productsController = new ProductsController();
