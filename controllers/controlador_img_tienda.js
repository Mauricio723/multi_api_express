import "dotenv/config";

import cloudinary from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export class ImgTiendaController {

    static async verImagenesDisponibles (req, res) {
        
        cloudinary.v2.api.resources_by_asset_folder("TiendaVilma01", function (error, result) {
            if (error) {
                console.error("Error al obtener recursos: ", error);
                res.json({ error: error });
            }

            res.json(result);
        });

    }
   

}


