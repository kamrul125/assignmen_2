import { Router } from "express";
import { signup, signin } from "./auth.controller";
import { auth } from "../../middlewares/auth";

const router = Router();


router.post("/signup", signup);
router.post("/signin", signin);


router.get("/me", auth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed",
    data: (req as any).user,
  });
});

export default router;
