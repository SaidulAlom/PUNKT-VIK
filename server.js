import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;
const distPath = path.resolve(process.cwd(), 'dist');

// Serve static files
app.use(express.static(distPath));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
