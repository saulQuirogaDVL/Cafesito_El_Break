import { Request, Response } from 'express'
import pool from '../database'

class UsersController {
    public async list(req: Request, res: Response) {
        const categories = await pool.query("SELECT * FROM users");
        res.json(categories);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const categories = await pool.query("SELECT * FROM users WHERE id=?", [id]);
        if (categories.length > 0) {
            return res.json(categories[0]);
        }
        res.status(404).json({ Text: "The user doesn't exist" })

    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO users set ?", [req.body]);
        res.json({ text: "User Saved" })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query("UPDATE users set ? WHERE id = ?", [req.body, id])
        res.json({ message: "The User was updated" })
    }
}

export const usersController = new UsersController(); 