import { Router } from 'express';

import authorize from '../middlewares/auth.middleware.js';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js';
import isAdmin from '../middlewares/role.middleware.js';

const userRouter = Router();

userRouter.get('/', authorize, isAdmin, getUsers); // for admin only

userRouter.get('/:id', authorize, getUser); // :id is a dynamic parameter

userRouter.post('/', authorize, isAdmin, createUser); // for admin 

userRouter.put('/:id', authorize, updateUser);

userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;