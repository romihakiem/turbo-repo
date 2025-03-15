import { Request, Response, NextFunction } from 'express';

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        if (!token) {
            throw new Error('Authentication failed. Token missing.')
        }
        next()
    } catch (err) {
        res.status(401).send({ message: 'Authentication failed.' })
    }
}

export default auth;