const express = require("express");
const { registration, login, logout } = require("../../controllers/auth");
const { getUserData, uploadImage } = require("../../controllers/users");
const { createUserSchema } = require("../../schemas");
const { validateBody, authMiddleware, upload } = require("../../helpers");

const usersRouter = express.Router();

usersRouter.post("/registration", validateBody(createUserSchema), upload.single("avatarURL"), registration);
usersRouter.post("/login", login);
usersRouter.post("/logout", authMiddleware, logout);
usersRouter.get("/current", authMiddleware, getUserData);
usersRouter.patch("/avatars", authMiddleware, upload.single("avatarURL"), uploadImage);

module.exports = usersRouter;
