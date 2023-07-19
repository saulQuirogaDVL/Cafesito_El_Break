import { Request, Response } from 'express'

class IndexController {
    public index(req: Request, res: Response) {
        res.send("Pantalla inicial");
    }
}

export const indexController = new IndexController(); 