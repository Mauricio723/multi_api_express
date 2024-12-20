import dbconection from "./conexion_db.js";

import crypto from "node:crypto";
import bcrypt from "bcrypt";


export class UserModel {

    /*
    tabla mysql: usuarios
    id varchar(120) primary key
    username varchar(200) unique not null
    password varchar(255) unique not null
    */

    static async findUsers () {
        const [datos_usuarios] = await dbconection.query("SELECT * FROM usuarios;");

        return datos_usuarios;

    }

    static async findUserByName (username) {

        try {

            const usuario = await dbconection.query("SELECT * FROM usuarios WHERE username = ?;", 
                [username]);

            return usuario;

        } catch (error) {
            return error.message;
        }
        

    }
    static async create({ input }) {

        const {
            username, 
            password
        } = input;

        try {
            const id = crypto.randomUUID();

            const hashedPassword = await bcrypt.hash(password, 10);

            await dbconection.query("INSERT INTO usuarios (id, username, password) values (?, ?, ?);", 
                [id, username, hashedPassword]
            );

            return "El usuario: " + username + " fue creado satisfactoriamente.";

        } catch (error) {
            console.error("Error al ingresar nuevo usuario: ", error);
        }

    }

    /*
     static async create({ input }) {
        const {
            nombre,
            categorias_id: categoriaIdInput,
            descripcion,
            imagen_url,
            precio,
            cantidad
        } = input;
    */
}