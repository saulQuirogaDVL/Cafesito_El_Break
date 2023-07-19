import { Request, Response } from 'express'
import pool from '../database'

class DetailsController {
    public async list(req: Request, res: Response) {
        const products = await pool.query("SELECT * FROM detalles");
        res.json(products);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const products = await pool.query("SELECT * FROM detalles WHERE id=?", [id]);
        if (products.length > 0) {
            return res.json(products[0]);
        }
        res.status(404).json({ Text: "The detail doesn't exist" })

    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO detalles set ?", [req.body]);
        res.json({ text: "Detail Saved" })
    } 

    public delete(req: Request, res: Response) {
        const { id } = req.params;
        pool.query("DELETE FROM detalles WHERE id=?", [id]);
        res.json({ message: "The detail was deleted" })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query("UPDATE detalles set ? WHERE id = ?", [req.body, id])
        res.json({ message: "The detail was updated" })
    }
}

export const detailsController = new DetailsController(); 