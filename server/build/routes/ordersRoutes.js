"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ordersController_1 = require("../controllers/ordersController");
class OrdersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', ordersController_1.ordersController.list);
        this.router.get('/getLast', ordersController_1.ordersController.getLast);
        this.router.get('/:id', ordersController_1.ordersController.getOne);
        this.router.post('/', ordersController_1.ordersController.create);
    }
}
const ordersRoutes = new OrdersRoutes();
exports.default = ordersRoutes.router;
