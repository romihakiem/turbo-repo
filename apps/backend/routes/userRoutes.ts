import { Router } from 'express';
import { UserCollection } from '../repository/userCollection';
import { ApiController } from '../controller/api';
import auth from '../middleware/authMiddleware';

const userCollection = new UserCollection();
const apiController = new ApiController(userCollection);

const router = Router();
router.get('/user', auth, apiController.fetchUsers);
router.post('/user', auth, apiController.createUser);
router.post('/user/:id', auth, apiController.updateUser);
router.delete('/user/:id', auth, apiController.deleteUser);
router.post('/register', apiController.signUp);
router.post('/login', apiController.signIn);
router.post('/logout', apiController.signOut);

export default router;