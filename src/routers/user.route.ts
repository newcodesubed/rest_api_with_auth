import { getAllUsers } from "../controllers/users.controller";
import express from "express";

export default (router: express.Router)=>{
    router.get('/users', getAllUsers);
}