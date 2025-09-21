const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

// Construir la aplicación frontend
console.log('Building frontend...');
execSync('cd frontend && pnpm build', { stdio: 'inherit' });

// Copiar los archivos construidos al backend
console.log('Copying files to backend...');
const frontendDist = path.join(__dirname, '../frontend/dist');
const backendPublic = path.join(__dirname, '../backend/public/dist');

// Asegurarse de que el directorio existe
fs.ensureDirSync(backendPublic);

// Copiar los archivos
fs.copySync(frontendDist, backendPublic, { overwrite: true });

console.log('Build complete!');