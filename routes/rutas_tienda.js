import { Router } from "express";
//import { readJSON } from "../archivos_utiles/utils.js";   // obtenemos readJSON desde utils.js
import { TiendaController } from "../controllers/controlador_tienda.js";
import { verificar_token } from "./jwt_verify.js";

//import jwt from "jsonwebtoken";

//const datosTienda = readJSON("../datos_locales/datos_tienda_01.json");


export const tiendaRouter = Router();


tiendaRouter.get("/traer_todo", verificar_token, TiendaController.getAll);
tiendaRouter.get("/traer_por_vendedor/:id", verificar_token, TiendaController.getByIdVendedor);

 tiendaRouter.post("/nuevo_producto", verificar_token, TiendaController.create);

// tiendaRouter.get("/:id", TiendaController.getById);
// tiendaRouter.delete("/:id", TiendaController.delete);
// tiendaRouter.patch("/:id", TiendaController.update);


tiendaRouter.get("/datos_prueba", verificar_token, (req, res) => {
    res.json({ datos_prueba: "texto de prueba para tiendaRouter" });
});


// por el momento, obtenemos datos desde este archivo, luego hay que completar las rutas
// y los archivo de modelo y controlador.
// al final creamos una conexión para trabajar los datos desde una base de datos.

/*
tiendaRouter.get("/datos_tienda", (req, res) => {    
   res.json(datosTienda);
});
*/
