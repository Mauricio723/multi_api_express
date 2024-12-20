import express from "express";
import { userRouter } from "./routes/rutas_usuarios.js";
import { tiendaRouter } from "./routes/rutas_tienda.js";
//import { createTiendaRouter } from "./routes/rutas_tienda.js"
const app = express();

app.use(express.json());

app.disable("x-powered-by"); 

app.use("/usuarios", userRouter); 

app.use("/tienda", tiendaRouter);

const PORT = process.env.PORT ?? 3005;

app.listen(PORT, () => {
    console.log("Servidor corriendo en: http://localhost:", PORT);
});

