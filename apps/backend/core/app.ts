import express, { Request, Response } from 'express';
import cors from 'cors';
import userRoutes from '../routes/userRoutes';

const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
app.use('/api', userRoutes);

app.listen(3100, () => {
    console.log('Server is running on port 3100')
});