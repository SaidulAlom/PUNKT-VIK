import fs from 'fs';
import path from 'path';

const paths = ['dist', 'server.js'].map(p => path.resolve(process.cwd(), p));
for (const p of paths) {
  try {
    if (fs.existsSync(p)) {
      fs.rmSync(p, { recursive: true, force: true });
      // eslint-disable-next-line no-console
      console.log(`Removed ${p}`);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Failed to remove ${p}:`, err);
  }
}
