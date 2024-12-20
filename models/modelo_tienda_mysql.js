//import mysql from "mysql2/promise";
import dbconexion from "./conexion_db.js";

/*
const datos_conexion_db_local = {
    host: "localhost",
    user: "root",
    port: 3306,
    password: "mauriciosql",
    database: "multiapidb"
};

const conexiondb = await mysql.createConnection(datos_conexion_db_local);
*/

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

        //return datosProductos;
    };


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


            await conexiondb.query(query_productos_categorias, datos_values);

            //const [datos_categorias] = await conexiondb.query("SELECT nombre FROM categorias;");

            /*
            const producto_nuevo_categorias = conexiondb.query(
                "SELECT productos.nombre, categorias.nombre FROM productos_categorias "
                + "INNER JOIN productos ON productos_categorias.producto_id = productos.id "
                + "INNER JOIN categorias ON productos_categorias.categoria_id = categorias.id;"
            );
            */

            return datos_producto_nuevo;


        } catch (error) {
            console.error("Error al guardar datos: ", error);
        }

    }

}
