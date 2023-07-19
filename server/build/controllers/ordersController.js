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
exports.ordersController = void 0;
const database_1 = __importDefault(require("../database"));
class OrdersController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query("SELECT * FROM pedidos");
            res.json(products);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const products = yield database_1.default.query("SELECT * FROM pedidos WHERE id=?", [id]);
            if (products.length > 0) {
                return res.json(products[0]);
            }
            res.status(404).json({ Text: "The detail doesn't exist" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO pedidos set ?", [req.body]);
            const todayDate = new Date();
            let dateFormated = `${todayDate.getFullYear()}-${('0' + (todayDate.getMonth() + 1)).slice(-2)}-${todayDate.getDate()}`;
            const lastOrder = yield database_1.default.query(`SELECT * FROM pedidos WHERE fecha_venta LIKE '%${dateFormated}%' ORDER BY id DESC LIMIT 1`);
            res.json({ id: lastOrder[0].id });
        });
    }
    getLast(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const todayDate = new Date();
            let dateFormated = `${todayDate.getFullYear()}-${('0' + (todayDate.getMonth() + 1)).slice(-2)}-${todayDate.getDate()}`;
            const lastOrder = yield database_1.default.query(`SELECT * FROM pedidos WHERE fecha_venta LIKE '%${dateFormated}%' ORDER BY id DESC LIMIT 1`);
            if (lastOrder.length == 0) {
                res.json({
                    "orden_actual": 1,
                    "orden_dia": 1
                });
            }
            else {
                if (lastOrder[0].orden_actual == 20)
                    lastOrder[0].orden_actual = 1;
                else
                    lastOrder[0].orden_actual++;
                lastOrder[0].orden_dia++;
                res.json(lastOrder[0]);
            }
        });
    }
}
exports.ordersController = new OrdersController();
