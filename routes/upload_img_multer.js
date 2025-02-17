//import express from "express";
//import "dotenv/config";

import multer from "multer";
//import { uploadImage } from "./cloudinary_config.js";

//const app = express();
//const PUERTO  = 3005;
//app.use(express.json());

const inMemoryStorage = multer.memoryStorage();

export const upload = multer({ storage: inMemoryStorage }).single("image");


/*
app.post("/upload", upload, async (req, res) => {	
	const { file } = req;
	const url = await uploadImage(file);
	
	if (!url) {
		return res
			.status(500)
			.json({ error: "error to upload file" });
	}
	//console.log({ file });	
	res.json({ url });	
});
*/

/*
app.get("/prueba_env", (req, res) => {	
	console.log("datos env: ", process.env.MY_NOMBRE);	
	res.send(`Hello ${process.env.MY_NOMBRE}, ${process.env.CLOUDINARY_CLOUD_NAME}`);	
});
*/

/*
app.listen(PUERTO, () => {
	console.log("Servidor corriendo en: http://localhost:", PUERTO);
});
*/
