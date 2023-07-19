import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import pool from '../database'

class LoginController {

    public async singin(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email=?", [email]);
        if (user.length === 0) { return res.status(404).json({ Text: "The user doesn't exist" }) }
        if (user[0].password != password) { return res.status(401).json({ Text: "The password is wrong " }) }
        const data = JSON.stringify(user[0])
        const token = jwt.sign(data, "secretkey")
        res.json(token);
    }
}

export const loginController = new LoginController(); 