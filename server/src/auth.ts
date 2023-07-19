import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

function verifyToken(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) return res.status(401).json({ Text: "Don't Authorized " })

    const token = req.headers.authorization.split(' ')[1]; console.log(token)
    if(token!=null){
        const verifiedToken = jwt.verify(token, 'secretkey');
        console.log(verifiedToken);
        next();
    }else{
        res.status(400).json({text: "Unathorize Token"})
    }
}

export default verifyToken