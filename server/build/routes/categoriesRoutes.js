"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesController_1 = require("../controllers/categoriesController");
class CategoriesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', categoriesController_1.categoriesController.list);
        this.router.get('/:id', categoriesController_1.categoriesController.getOne);
        this.router.post('/', categoriesController_1.categoriesController.create);
        this.router.put('/:id', categoriesController_1.categoriesController.update);
    }
}
const categoriesRoutes = new CategoriesRoutes();
exports.default = categoriesRoutes.router;
