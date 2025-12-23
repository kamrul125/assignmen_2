import { Router } from "express";
import { signup, login } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);


router.get("/me", auth, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: (req as any).user,
  });
});

export default router;
