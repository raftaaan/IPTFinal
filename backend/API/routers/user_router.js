const express = require('express');
const userController = require('../controllers/user_controller');
const userRouter = express.Router();

userRouter.post('/login', userController.login)
userRouter.post('/register', userController.createUser);
userRouter.get('/userlist', userController.getUserList);
userRouter.put('/update/:username', userController.updateUser);
userRouter.delete('/remove', userController.deleteUser)
module.exports = userRouter;