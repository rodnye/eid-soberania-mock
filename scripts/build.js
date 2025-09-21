const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

console.log('Building frontend...');
execSync('cd frontend && pnpm build', { stdio: 'inherit' });

console.log('Copying files to backend...');
const frontendDist = path.join(__dirname, '../frontend/dist');
const backendPublic = path.join(__dirname, '../backend/public');

fs.ensureDirSync(backendPublic);
fs.copySync(frontendDist, backendPublic, { overwrite: true });

console.log('Build complete!');