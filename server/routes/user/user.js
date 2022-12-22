import { Router } from "express";
import { getAuthenticatedUser } from "../../controllers/user/user.js";

const router = Router();

router.get("/authenticatedUser", getAuthenticatedUser);

export default router;
