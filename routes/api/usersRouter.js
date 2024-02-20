const express = require("express");
const { registration, login, logout } = require("../../controllers/auth");
const getUserData = require("../../controllers/users");
const { createUserSchema } = require("../../schemas");
const { validateBody, authMiddleware } = require("../../helpers");

const usersRouter = express.Router();

usersRouter.post("/registration", validateBody(createUserSchema), authMiddleware, registration);
usersRouter.post("/login", login);
usersRouter.post("/logout", authMiddleware, logout);
usersRouter.get("/current", authMiddleware, getUserData);

module.exports = usersRouter;
