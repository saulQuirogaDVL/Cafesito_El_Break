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
exports.categoriesController = void 0;
const database_1 = __importDefault(require("../database"));
class CategoriesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield database_1.default.query("SELECT * FROM categorias");
            res.json(categories);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const categories = yield database_1.default.query("SELECT * FROM categorias WHERE id=?", [id]);
            if (categories.length > 0) {
                return res.json(categories[0]);
            }
            res.status(404).json({ Text: "The category doesn't exist" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO categorias set ?", [req.body]);
            res.json({ text: "Category Saved" });
        });
    }
    delete(req, res) {
        const { id } = req.params;
        database_1.default.query("DELETE FROM categorias WHERE id=?", [id]);
        res.json({ message: "The Category was deleted" });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("UPDATE categorias set ? WHERE id = ?", [req.body, id]);
            res.json({ message: "The Category was updated" });
        });
    }
}
exports.categoriesController = new CategoriesController();
