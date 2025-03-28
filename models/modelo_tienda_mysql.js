//import mysql from "mysql2/promise";
import dbconexion from "./conexion_db.js";

export class TiendaModel {

    static async getAll({ categoria }) {

       // para la consulta por categoría, hacer una consulta similar a esta:
       // http://localhost:3005/tienda?categoria=nombre_categoria 

        if (categoria) {

            const categoriaLowerCase = categoria.toLowerCase();

            const [productosPorCategoria] = await dbconexion.query(
                "SELECT productos.*, categorias_02.* FROM productos "
                + "INNER JOIN prod_cat_02 ON productos.id = prod_cat_02.producto_id "
                + "INNER JOIN categorias_02 ON categorias_02.id_cat = prod_cat_02.categoria_id "
                + "WHERE categorias_02.nombre_cat = ?;", [categoriaLowerCase]
            );

            return productosPorCategoria;

        } else {
            const [todosLosProductos] = await dbconexion.query(
                "SELECT * FROM productos;"
            );

            return todosLosProductos;
        }

    }

    static async getByIdProducto(id) {

        const [datos_producto] = await dbconexion.query("SELECT * FROM productos WHERE id=?;", [id]);

        return datos_producto; 
    }

    static async obtenerUrlImagen(id_producto) {
        const [url_imagen] = await dbconexion.query("SELECT imagen_url FROM productos WHERE id=?;", [id_producto]);
        return url_imagen;
    }

   

    static async create({ input }) {
        const {
            nombre,
            categorias_id: categoriaIdInput,
            descripcion,
            imagen_url,
            precio,
            cantidad
        } = input;

        try {

            await dbconexion.query(
                "INSERT INTO productos (nombre, descripcion, imagen_url, precio, cantidad) "
                + "values (?, ?, ?, ?, ?);",
                [nombre, descripcion, imagen_url, precio, cantidad]);

            let datos_values = [];

            // obtenemos el id del producto ingresado.

            const [datos_producto_nuevo] = await dbconexion.query(
                "SELECT * FROM productos WHERE nombre=?;",
                [nombre]);
           
            let id_producto_nuevo = datos_producto_nuevo[0].id;
           
            categoriaIdInput.forEach(id_categoria => {
                datos_values.push(id_producto_nuevo);
                datos_values.push(id_categoria);
            });
           
            let query_productos_categorias = 
            "INSERT INTO prod_cat_02 (producto_id, categoria_id) VALUES (?, ?)";
          
            for (let i = 0; i < categoriaIdInput.length - 1; i++) {
                query_productos_categorias += ", (?, ?)";
            }
            query_productos_categorias += ";"


            await dbconexion.query(query_productos_categorias, datos_values);
         
            return datos_producto_nuevo;


        } catch (error) {
            console.error("Error al guardar datos: ", error);
        }

    }

    static async update (id_producto,  datos_nuevos) {
                
        await dbconexion.query(`UPDATE productos SET nombre = ?, descripcion = ?, 
            imagen_url = ?, precio = ?, cantidad = ? WHERE id = ?;`, 
            [datos_nuevos.nombre, datos_nuevos.descripcion, datos_nuevos.imagen_url, datos_nuevos.precio, 
                datos_nuevos.cantidad, id_producto]
        );
              
        return datos_nuevos;

    }

    static async modificar_campo_producto (id_producto, dato_campo) {

        let nombre_campo = Object.keys(dato_campo);
        let clave_campo = nombre_campo[0];
        let valor_campo = dato_campo[clave_campo];

        const string_query = "UPDATE productos SET " + clave_campo + " = ? WHERE id = ?;";

        await dbconexion.query(string_query, [valor_campo, id_producto]);

        return "se modificó el campo: " + clave_campo + " con el valor: " + valor_campo;

    }
     
    
   static async modificar_imagen_producto (id_producto, url_imagen) {

    await dbconexion.query("UPDATE productos SET imagen_url = ? WHERE id = ?;", [url_imagen, id_producto]);
    
    return "Se modificó la imagen: " + id_producto + " - " + url_imagen;

   }

   static async prueba_update_producto (id_producto, producto) {
   
    console.log("url_img: ", producto);
    
    console.log("id_producto: ", id_producto);

    //await dbconexion.query("UPDATE productos SET imagen_url = ? WHERE id = ?;", [url_img_nueva, id_producto]);

    return "la url de la imagen se modificó exitosamente";

   }

}
