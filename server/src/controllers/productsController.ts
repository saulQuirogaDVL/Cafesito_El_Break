import { Request, Response } from 'express'

import pool from '../database'

class ProductsController {
    public async listAll(req: Request, res: Response) {
        const products = await pool.query("SELECT * FROM productos");
        res.json(products);
    }

    public async listEnabled(req: Request, res: Response) {
        const products = await pool.query("SELECT * FROM productos where habilitado = 1");
        res.json(products);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const products = await pool.query("SELECT * FROM productos WHERE id=?", [id]);
        if (products.length > 0) {
            return res.json(products[0]);
        }
        res.status(404).json({ Text: "The product doesn't exist" })

    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO productos set ?", [req.body]);
        res.json({ text: "Product Saved" })
    }

    public delete(req: Request, res: Response) {
        const { id } = req.params;
        pool.query("DELETE FROM productos WHERE id=?", [id]);
        res.json({ message: "The Product was deleted" })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query("UPDATE productos set ? WHERE id = ?", [req.body, id])
        res.json({ message: "The Products was updated" })
    }

    public async photoState(req: Request, res: Response): Promise<void> {
        //await pool.query("INSERT INTO productos set ?", [req.body]);
        res.json({ text: "Photo Saved" })
    }
}

export const productsController = new ProductsController(); 