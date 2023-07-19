import { Router } from 'express';
import { categoriesController } from '../controllers/categoriesController'

class CategoriesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', categoriesController.list);
        this.router.get('/:id', categoriesController.getOne);
        this.router.post('/', categoriesController.create);
        this.router.put('/:id', categoriesController.update);
    }
}

const categoriesRoutes = new CategoriesRoutes();

export default categoriesRoutes.router;