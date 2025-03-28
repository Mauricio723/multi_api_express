import { Router } from "express";
import { ImgAdminController } from "../controllers/controlador_img_admin.js";

export const imgAdminRouter = Router();

imgAdminRouter.get("/mostrar_carpetas_cloudinary", ImgAdminController.mostrarCarpetas);

imgAdminRouter.get("/traer_imagenes_cloud/:nombre_carpeta", ImgAdminController.traerImagenes);
