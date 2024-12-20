import jwt from "jsonwebtoken";

import { datosConfig01 } from "../datos_config/datosConfig.js";

export const verificar_token = (req, res, next) => {

    const authHeader = req.headers["authorization"];

    const token = authHeader.split(" ")[1];

    if (token === null) {
        return res.status(403).json({ message: "Acceso denegado, token requerido" });
    }
   
        jwt.verify(token, datosConfig01.SECRET_JWT_KEY, (err, decoded) => {

            if (err) {
                return res.status(401).send("Token invalido");
            }

            req.userId = decoded.id;

            next();
        });                

};
