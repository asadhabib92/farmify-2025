import express from "express"
import { activateUser, deleteUser, getUserDetails, suspendUser } from "../controllers/admin.controller.js";

const adminRoutes = express.Router();

adminRoutes.get('/users-details', getUserDetails);
adminRoutes.delete('/delete-user/:_id', deleteUser);
adminRoutes.post('/suspend-user/:_id', suspendUser);
adminRoutes.post('/activate-user/:_id', activateUser);

export default adminRoutes;