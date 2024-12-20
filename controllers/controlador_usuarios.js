import { UserModel } from "../models/modelo_usuarios.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { datosConfig01 } from "../datos_config/datosConfig.js";

//import { TiendaModel } from "../models/modelo_tienda_mysql.js";

export class UserController {
     

    static async get_user(req, res) {
        //const datos_usuarios = req.body;

        const datos_de_usuarios = await UserModel.findUsers();

        res.status(201).json(datos_de_usuarios);

    }

    static async create(req, res) {
        const datos_nuevo_usuario = req.body;

        const nuevo_usuario = await UserModel.create({ input: datos_nuevo_usuario });

        res.status(201).json(nuevo_usuario);
    }

    static async login(req, res) {

        const { username, password } = req.body;

        try {

            const [usuario] = await UserModel.findUserByName(username);

            if (usuario) {

                const id_db = usuario[0].id;
                const username_db = usuario[0].username;
                const password_db = usuario[0].password;

                const passwordEsValido = await bcrypt.compare(password, password_db);

                if (!passwordEsValido) {
                    //console.log("El password es incorrecto");
                    res.send("Password incorrecto");
                }

                const token = jwt.sign({ id: id_db, username: username_db }, datosConfig01.SECRET_JWT_KEY , { expiresIn: "1h" });

                
                res.send({ id_db, username_db, token });

            } else {
                res.send("Nombre de usuario incorrecto");
            }


        } catch (error) {
            res.status(401).send(error.message);
        }

    }

   

}
