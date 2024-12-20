import mysql from "mysql2/promise";

const datos_conexion_db_local = {
    host: "localhost",
    user: "root",
    port: 3306,
    password: "mauriciosql",
    database: "multiapidb"
};

 const dbconection = await mysql.createConnection(datos_conexion_db_local);
 
 export default dbconection;

