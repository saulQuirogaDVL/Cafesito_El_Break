import { Router } from 'express';
import { productsController } from '../controllers/productsController'
const multer = require('multer');
const path = require('path');

class ProductsRoutes {

    public router: Router = Router();

    storage = multer.diskStorage({
        destination: function (req: any, file: any, cb: any) {
            cb(null, 'uploads/');
        },
        filename: function (req: any, file: any, cb: any) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    });

    upload = multer({ storage: this.storage });

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', productsController.listEnabled);
        this.router.get('/getAll', productsController.listAll);
        this.router.get('/getOne/:id', productsController.getOne);
        this.router.post('/savePhoto', this.upload.single('imagen'), productsController.photoState);
        this.router.post('/', productsController.create);
        this.router.put('/:id', productsController.update);
    }

}

const productsRoutes = new ProductsRoutes();

export default productsRoutes.router;