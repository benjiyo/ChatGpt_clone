import 'dotenv/config';
import app from './src/app.js';
import pool from './src/config/db.js';

const PORT = process.env.PORT || 3777;

try {
  await pool.query('SELECT 1');
  console.log('MySQL connected');
} catch (err) {
  console.error('MySQL connection failed:', err.message);
  process.exit(1);
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
