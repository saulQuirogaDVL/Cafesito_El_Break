import { Router } from 'express';
import { detailsController } from '../controllers/detailsController'

class DetailsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', detailsController.list);
        this.router.get('/:id', detailsController.getOne);
        this.router.post('/', detailsController.create);
        this.router.put('/:id', detailsController.update);
    }
}

const detailsRoutes = new DetailsRoutes();

export default detailsRoutes.router;