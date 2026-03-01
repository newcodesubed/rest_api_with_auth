import { deleteUser, getAllUsers } from "../controllers/users.controller";
import express from "express";
import { isAuthenticated } from "../middlewares/index.middleware";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete('/users/:id', deleteUser);
};
