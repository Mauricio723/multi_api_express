
import { mostrarCarpetasCloudinary, verImagenesDisponibles } from "./img_control_cloud.js";

/*

import { uploadImage, eliminarImagen, verImagenesDisponibles, mostrarDatosImagen } from "./img_control_cloud.js";

export class TiendaController {
*/

export class ImgAdminController {
    /*    
        static async getAll(req, res) {
            const { categoria } = req.query;
            const productosTienda = await TiendaModel.getAll({ categoria });
            res.json(productosTienda);
        };
    */

   static async traerImagenes(req, res) {
    const nombre_carpeta = req.params.nombre_carpeta;
    const imagenes_disponibles = await verImagenesDisponibles(nombre_carpeta);
    //console.log("imagenes disponibles: ", imagenes_disponibles);
    res.json(imagenes_disponibles);
   }

   static async mostrarCarpetas(req, res) {
    const carpetas_cloudinary = await mostrarCarpetasCloudinary();
    //console.log("Controlador, carpetas de cloudinary: ", carpetas_cloudinary);
    res.json(carpetas_cloudinary);
   }

}

