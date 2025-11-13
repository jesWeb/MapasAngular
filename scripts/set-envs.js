/**
 * script para crear los environments para las variables de entorno
 */

const { writeFileSync, mkdirSync } = require('fs')

require('dotenv').config();

//producion
const targetPath = './src/environments/environment.ts'
//Desarrollo
const targetPathDev = './src/environments/environment.development.ts'

const mapboxKey = process.env['MAPBOX_KEY'];

if (!mapboxKey) {
  throw new Error('MAPBOX_KEY is not set')
}

const envFileContent = `
  export const environment = {
    mapboxKey:"${mapboxKey}"
  };
`

mkdirSync('./src/environments', { recursive: true });
//pats
writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent)
