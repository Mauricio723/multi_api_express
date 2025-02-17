//import { TiendaModel } from "../models/modelo_tienda_local.js";
import { TiendaModel } from "../models/modelo_tienda_mysql.js";
import { uploadImage } from "../upload_image/config_img_cloud.js";

import { verImagenesDisponibles, mostrarDatosImagen } from "./img_control_cloud.js";

export class TiendaController {

    static async getAll(req, res) {
        const { categoria } = req.query;
        const productosTienda = await TiendaModel.getAll({ categoria });
        res.json(productosTienda);
    };

    static async getByIdVendedor(req, res) {
        const { id } = req.params;
        const datoTienda = await TiendaModel.getByIdVendedor({ id });

        if (datoTienda) {
            return res.json(datoTienda);
        } else {
            res.status(404).json({ mensaje: "Error al obtener datos de la tienda" });
        }
        //return res.json(datoTienda);         
    }

    static async getByIdProducto(req, res) {

        const id_producto = req.params.id_producto;

        const datos_producto = await TiendaModel.getByIdProducto(id_producto);

        res.json(datos_producto);

    }

    static async create(req, res) {
        
        const datos_nuevos = req.body;

        const nuevo_producto = await TiendaModel.create({ input: datos_nuevos });

        res.status(201).json(nuevo_producto);

    }

    static async actualizar(req, res) {

        const id = req.params.id;
        const datos_update = req.body;

        const datos_desde_model = await TiendaModel.update(id, datos_update);

        return res.json(datos_desde_model);

    }

    static async modificar_campo_producto(req, res) {

        const id_producto = req.params.id_producto;
        const datos_para_modificar = req.body;
        
        const datos_campo_retornado = await TiendaModel.update_campo(id_producto, datos_para_modificar);
        return res.json(datos_campo_retornado);
    }

    static async modificarImagenProducto(req, res) {       
        const { file } = req;
        const id_producto = req.params.id_producto;
        console.log("datos en file: ", file);
        res.json({ mensaje_express: "imagen modificada satisfactoriamente" });
    }

    static async prueba_modificar_producto(req, res) {
        const id_producto = req.params.id_producto;
        const datos_producto_update = req.body;
        console.log("desde controlador, datos producto: ", datos_producto_update);
        const datos_model_update_prueba = await TiendaModel.prueba_update_producto(id_producto, datos_producto_update);
        return res.json(datos_model_update_prueba);
    }

    static async subirImagen(req, res) {
        const { file } = req;
        const id_producto = req.params.id_producto;
        const url_imagen = await uploadImage(file);

        if (!url_imagen) {
            return res.status(500).json({ error: "Error al subir archivo" });
        }

        const datos_model_tienda = await TiendaModel.agregar_imagen_producto(id_producto, url_imagen);

        return res.json(datos_model_tienda);

    }

    static async eliminar_imagen(req, res) {
        const public_id = req.body.public_id;

        console.log("public_id de la imagen: ", public_id);

        return res.json({ mensaje_retorno: "imagen borrada" });
    }

  
    static async ver_imagenes_por_carpeta(req, res) {

        //let nombre_carpeta = "my_carpeta";

        const imagenes_disponibles = await verImagenesDisponibles();

        return res.json(imagenes_disponibles);
        
    }
    
    static async mostrar_datos_imagen(req, res) {

        const my_public_id = req.body.public_id;

        const datos_obtenidos_imagen = await mostrarDatosImagen(my_public_id);
        
        res.json(datos_obtenidos_imagen);
              
    }
   

}