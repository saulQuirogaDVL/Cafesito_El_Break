"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class VentasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/');
    }
}
const ventasRoutes = new VentasRoutes();
exports.default = ventasRoutes.router;
