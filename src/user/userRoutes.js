const { Router } = require("express");
const { addUser, login,updatePassword } = require("./userControllers");
const {listUsers} = require("./userControllers");
const { hashPassword, decryptPassword, checkToken} = require("../middleware");
const {deleteUser} = require("./userControllers")
const User = require("./userModel");
const userRouter = Router();

userRouter.post("/user", hashPassword, addUser);
userRouter.get("/user", listUsers,)
userRouter.post("/login", decryptPassword, login);
userRouter.get("/user", checkToken, login);
userRouter.patch("/user",hashPassword, checkToken,updatePassword );
userRouter.delete("/user/:filterKey/:filterVal", deleteUser);

module.exports = userRouter;
