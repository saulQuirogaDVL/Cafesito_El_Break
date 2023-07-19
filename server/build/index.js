"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const categoriesRoutes_1 = __importDefault(require("./routes/categoriesRoutes"));
const detailsRoutes_1 = __importDefault(require("./routes/detailsRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const ordersRoutes_1 = __importDefault(require("./routes/ordersRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/products', productsRoutes_1.default);
        this.app.use('/categories', categoriesRoutes_1.default);
        this.app.use('/details', detailsRoutes_1.default);
        this.app.use('/users', userRoutes_1.default);
        this.app.use('/login', loginRoutes_1.default);
        this.app.use('/orders', ordersRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'));
        console.log(`Server On Port ${this.app.get('port')}`);
    }
}
const server = new Server();
server.start();
