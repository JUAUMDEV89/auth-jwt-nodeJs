import { Router } from 'express';
import { auth } from './middlewares/auth';
import { saveUser, getUsers, login } from './controller/UserController';

const route = Router();

route.post('/users/login', login);

route.use(auth);

route.post('/users', saveUser); // C
route.get('/users', getUsers);  // R

export default route;

