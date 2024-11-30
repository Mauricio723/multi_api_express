import { readJSON } from "../archivos_utiles/utils.js";

const datosTienda = readJSON("../datos_locales/datos_tienda_01.json");

export class TiendaModel {

    static async getAll ({ id_vendedor }) {

        let id_obtenido = parseInt(id_vendedor);
               
        /* La consulta para obtener los datos de un vendedor se muestra en el siguiente
        ejemplo, para un vendedor con id_vendedor=2 : 
        GET  http://localhost:3005/tienda/traer_todo?id_vendedor=2 */
        
        
        if (id_vendedor) {
            if (datosTienda.some(dato => dato.id_vendedor === id_obtenido)) {
                return datosTienda.filter(
                    dato_tienda => dato_tienda.id_vendedor === id_obtenido
                );
            } else {
                return { mensaje: "El identificador ingresado no es válido" };
            }
            
        } else {
            return datosTienda;
        }                
        
    }

    static async getByIdVendedor ({ id }) {
        
        let id_obtenido = parseInt(id);

        const datoTiendaPorVendedor = datosTienda.find(datoTienda => datoTienda.id_vendedor === id_obtenido);
        
        return datoTiendaPorVendedor;
    }
    
}
