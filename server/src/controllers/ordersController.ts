import { Request, Response } from 'express'
import pool from '../database'

class OrdersController {
    public async list(req: Request, res: Response) {
        const products = await pool.query("SELECT * FROM pedidos");
        res.json(products);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const products = await pool.query("SELECT * FROM pedidos WHERE id=?", [id]);
        if (products.length > 0) {
            return res.json(products[0]);
        }
        res.status(404).json({ Text: "The detail doesn't exist" })

    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO pedidos set ?", [req.body]);

        const todayDate: Date = new Date();
        let dateFormated = `${todayDate.getFullYear()}-${('0' + (todayDate.getMonth() + 1)).slice(-2)}-${todayDate.getDate()}`;

        const lastOrder = await pool.query(`SELECT * FROM pedidos WHERE fecha_venta LIKE '%${dateFormated}%' ORDER BY id DESC LIMIT 1`);
        res.json({ id: lastOrder[0].id })
    }

    public async getLast(req: Request, res: Response) {
        const todayDate: Date = new Date();
        let dateFormated = `${todayDate.getFullYear()}-${('0' + (todayDate.getMonth() + 1)).slice(-2)}-${todayDate.getDate()}`;
        const lastOrder = await pool.query(`SELECT * FROM pedidos WHERE fecha_venta LIKE '%${dateFormated}%' ORDER BY id DESC LIMIT 1`);

        if (lastOrder.length == 0) {
            res.json({
                "orden_actual": 1,
                "orden_dia": 1
            })
        } else {
            if (lastOrder[0].orden_actual == 20) lastOrder[0].orden_actual = 1;
            else lastOrder[0].orden_actual++;

            lastOrder[0].orden_dia++;
            res.json(lastOrder[0])
        }
    }
}

export const ordersController = new OrdersController(); 