"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const multer = require('multer');
const path = require('path');
class ProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            },
        });
        this.upload = multer({ storage: this.storage });
        this.config();
    }
    config() {
        this.router.get('/', productsController_1.productsController.listEnabled);
        this.router.get('/getAll', productsController_1.productsController.listAll);
        this.router.get('/getOne/:id', productsController_1.productsController.getOne);
        this.router.post('/savePhoto', this.upload.single('imagen'), productsController_1.productsController.photoState);
        this.router.post('/', productsController_1.productsController.create);
        this.router.put('/:id', productsController_1.productsController.update);
    }
}
const productsRoutes = new ProductsRoutes();
exports.default = productsRoutes.router;
