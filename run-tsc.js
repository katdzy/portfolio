import { execSync } from 'child_process';
import fs from 'fs';
try {
  execSync('npx tsc -b', {encoding: 'utf8', stdio: 'pipe'});
  fs.writeFileSync('tsc-errors.txt', 'No errors!');
} catch (e) {
  fs.writeFileSync('tsc-errors.txt', e.stdout || e.message);
}
