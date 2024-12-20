import { Router } from "express";
import { UserController } from "../controllers/controlador_usuarios.js";
import { verificar_token } from  "./jwt_verify.js";

export const userRouter = Router();

userRouter.get("/inicio", (req, res) => {
    res.json({ mensaje_inicio: "Texto para probar ruta de inicio" });
});


userRouter.get("/mostrar_usuarios", verificar_token, UserController.get_user);

userRouter.post("/nuevo_usuario", UserController.create);

userRouter.post("/login", UserController.login);

