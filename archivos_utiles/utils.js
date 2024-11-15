import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)

// con lo anterior creamos un require para obtener datos de un archivo, en ECModules.
// para usarlo hay que importar la constante readJSON y pasar la ruta del aarchivo.
