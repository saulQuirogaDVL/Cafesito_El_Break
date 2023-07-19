import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';


import indexRoutes from './routes/indexRoutes';
import productsRoutes from './routes/productsRoutes'
import categoriesRoutes from './routes/categoriesRoutes'
import detailsRoutes from './routes/detailsRoutes'
import usersRoutes from './routes/userRoutes'
import loginRoutes from './routes/loginRoutes'
import orderRoutes from './routes/ordersRoutes'

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }))
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/products', productsRoutes);
        this.app.use('/categories', categoriesRoutes);
        this.app.use('/details', detailsRoutes);
        this.app.use('/users', usersRoutes);
        this.app.use('/login', loginRoutes);
        this.app.use('/orders', orderRoutes)
    }

    start(): void {
        this.app.listen(this.app.get('port'));
        console.log(`Server On Port ${this.app.get('port')}`)
    }
}

const server = new Server();
server.start();