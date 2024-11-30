//import { TiendaModel } from "../models/modelo_tienda_local.js";
import { TiendaModel } from "../models/modelo_tienda_mysql.js";

export class TiendaController {
    
    static async getAll (req, res) {
        const { categoria } = req.query;
        const productosTienda = await TiendaModel.getAll({ categoria });
        res.json(productosTienda);
    };

    static async getByIdVendedor (req, res) {
        const { id } = req.params;
        const datoTienda = await TiendaModel.getByIdVendedor({ id });
        
        if (datoTienda) {
            return res.json(datoTienda);
        } else {
            res.status(404).json({ mensaje: "Error al obtener datos de la tienda"});
        }
           
        //return res.json(datoTienda); 
        
    }
      
    static async create (req, res) {
        // const datos_nuevos = validateTienda(req.body);

        const datos_nuevos = req.body;

        const nuevo_producto = await TiendaModel.create({ input: datos_nuevos });

        res.status(201).json(nuevo_producto);

    }
}