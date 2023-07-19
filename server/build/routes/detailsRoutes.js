"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detailsController_1 = require("../controllers/detailsController");
class DetailsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', detailsController_1.detailsController.list);
        this.router.get('/:id', detailsController_1.detailsController.getOne);
        this.router.post('/', detailsController_1.detailsController.create);
        this.router.put('/:id', detailsController_1.detailsController.update);
    }
}
const detailsRoutes = new DetailsRoutes();
exports.default = detailsRoutes.router;
