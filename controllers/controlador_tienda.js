//import { TiendaModel } from "../models/modelo_tienda_local.js";
import { TiendaModel } from "../models/modelo_tienda_mysql.js";
//import { uploadImage } from "../upload_image/config_img_cloud.js";

import { uploadImage, eliminarImagen, verImagenesDisponibles, mostrarDatosImagen } from "./img_control_cloud.js";

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
        const retornoDelModelo = await TiendaModel.modificar_campo_producto(id_producto, datos_para_modificar);
        return res.json(retornoDelModelo);
    }

    obtenerPublicIdImg(url_imagen) {
        /* Con lo siguiente, obtengo el valor de public_id de la imagen, el cual está 
         contenido dentro de la url de la imagen obtenida en Cloudinary */
       let posicion_ultimo_punto  = url_imagen.lastIndexOf(".");
       let posicion_ultima_barra = url_imagen.lastIndexOf("/");
       let posicion_anteultima_barra = url_imagen.lastIndexOf("/", posicion_ultima_barra - 1);
       let string_public_id = url_imagen.substring(posicion_anteultima_barra + 1, posicion_ultimo_punto);
   
       return string_public_id;
     }

    static async modificarImagenProducto(req, res) {       
        const { file } = req;        
        const id_producto = req.params.id_producto;

        const url_img_model = await TiendaModel.obtenerUrlImagen(id_producto);

        let url_imagen = url_img_model[0].imagen_url;

        let posicion_ultimo_punto  = url_imagen.lastIndexOf(".");
        let posicion_ultima_barra = url_imagen.lastIndexOf("/");
        let posicion_anteultima_barra = url_imagen.lastIndexOf("/", posicion_ultima_barra - 1);
        let string_public_id = url_imagen.substring(posicion_anteultima_barra + 1, posicion_ultimo_punto);
            
        const url_imagen_nueva = await uploadImage(file);

        if (url_imagen_nueva) {         
            const datos_model_tienda = await TiendaModel.modificar_imagen_producto(id_producto, url_imagen_nueva);

            const result_destroy = await eliminarImagen(string_public_id);

            console.log("datos desde model: ", datos_model_tienda);
            console.log("datos de eliminación de imagen: ", result_destroy);

        }
                      
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