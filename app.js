import express from "express";
import { tiendaRouter } from "./routes/rutas_tienda.js";

const app = express();

app.use(express.json());

app.disable("x-powered-by"); 

app.use("/tienda", tiendaRouter);

const PORT = process.env.PORT ?? 3005;

app.listen(PORT, () => {
    console.log("Servidor corriendo en: http://localhost:", PORT);
});

