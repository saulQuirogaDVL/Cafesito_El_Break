import { Request, Response } from 'express'
import pool from '../database'

class CategoriesController {
    public async list(req: Request, res: Response) {
        const categories = await pool.query("SELECT * FROM categorias");
        res.json(categories);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const categories = await pool.query("SELECT * FROM categorias WHERE id=?", [id]);
        if (categories.length > 0) {
            return res.json(categories[0]);
        }
        res.status(404).json({ Text: "The category doesn't exist" })

    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO categorias set ?", [req.body]);
        res.json({ text: "Category Saved" })
    }

    public delete(req: Request, res: Response) {
        const { id } = req.params;
        pool.query("DELETE FROM categorias WHERE id=?", [id]);
        res.json({ message: "The Category was deleted" })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query("UPDATE categorias set ? WHERE id = ?", [req.body, id])
        res.json({ message: "The Category was updated" })
    }
}

export const categoriesController = new CategoriesController(); 