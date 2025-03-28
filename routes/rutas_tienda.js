import { Router } from "express";
//import { readJSON } from "../archivos_utiles/utils.js";   // obtenemos readJSON desde utils.js
import { TiendaController } from "../controllers/controlador_tienda.js";

import { verificar_token } from "./jwt_verify.js";

//import multer from "multer";

import { upload } from "./upload_img_multer.js";

//import { ImgTiendaController } from "../controllers/controlador_img_tienda.js";
//import jwt from "jsonwebtoken";
//const datosTienda = readJSON("../datos_locales/datos_tienda_01.json");

export const tiendaRouter = Router();

//const inMemoryStorage = multer.memoryStorage();
//const upload = multer({ storage: inMemoryStorage }).single("imagen");

tiendaRouter.get("/traer_todo", TiendaController.getAll);

tiendaRouter.get("/traer_por_vendedor/:id", verificar_token, TiendaController.getByIdVendedor);

tiendaRouter.get("/traer_por_id_producto/:id", TiendaController.getByIdProducto);

tiendaRouter.post("/nuevo_producto", verificar_token, TiendaController.create);

tiendaRouter.patch("/modificar_producto/:id", TiendaController.actualizar);


tiendaRouter.patch("/prueba_modificar_producto/:id_producto", TiendaController.prueba_modificar_producto);


tiendaRouter.patch("/modificar_campo_producto/:id_producto", TiendaController.modificar_campo_producto);


tiendaRouter.patch("/modificar_imagen_producto/:id_producto", upload, TiendaController.modificarImagenProducto);


tiendaRouter.post("/subir_imagen/:id_producto", upload, TiendaController.subirImagen);

tiendaRouter.delete("/eliminar_imagen", TiendaController.eliminar_imagen);


tiendaRouter.get("/ver_imagenes_disponibles", TiendaController.ver_imagenes_por_carpeta);


tiendaRouter.post("/mostrar_datos_imagen", TiendaController.mostrar_datos_imagen);


tiendaRouter.get("/datos_prueba", (req, res) => {
    res.json({ datos_prueba: "texto de prueba para tiendaRouter" });
});


/*
tiendaRouter.get("/datos_tienda", (req, res) => {    
   res.json(datosTienda);
});
*/
