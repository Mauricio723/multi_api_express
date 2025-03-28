import express from "express";
import { userRouter } from "./routes/rutas_usuarios.js";
import { tiendaRouter } from "./routes/rutas_tienda.js";
import { imgAdminRouter } from "./routes/rutas_img_admin.js";

import cors from "cors";

//import { createTiendaRouter } from "./routes/rutas_tienda.js"
const app = express();

app.use(express.json());

app.disable("x-powered-by"); 

/*
Manejo de cors manual: 
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Origin", "http://tu_dominio.com");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
  next();
});
*/
app.use(cors({
    origin: ["http://localhost:4200", "https://sitio_surcode25"],
    credentials: true, 
    methods: ["GET", "POST", "PATCH"]
}));

app.use("/usuarios", userRouter); 

app.use("/tienda", tiendaRouter);

app.use("/imagenes", imgAdminRouter);

const PORT = process.env.PORT ?? 3005;

app.listen(PORT, () => {
    console.log("Servidor corriendo en: http://localhost:", PORT);
});

