import { Router } from "express";
import { readJSON } from "../archivos_utiles/utils.js";   // obtenemos readJSON desde utils.js


const datosTienda = readJSON("../datos_locales/datos_tienda_01.json");

export const tiendaRouter = Router(); 

// tiendaRouter.get("/", TiendaController.getAll);
// tiendaRouter.post("/", TiendaController.create);
// tiendaRouter.get("/:id", TiendaController.getById);
// tiendaRouter.delete("/:id", TiendaController.delete);
// tiendaRouter.patch("/:id", TiendaController.update); 


tiendaRouter.get("/datos_prueba", (req, res) => {
    res.json({ datos_prueba: "texto de prueba para tiendaRouter" });
});

// por el momento, obtenemos datos desde este archivo, luego hay que completar las rutas
// y los archivo de modelo y controlador.
// al final creamos una conexión para trabajar los datos desde una base de datos.

tiendaRouter.get("/datos_tienda", (req, res) => {
    
   res.json(datosTienda);

});

