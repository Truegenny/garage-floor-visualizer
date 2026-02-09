const express = require('express');
const authRoutes = require('./routes/auth');
const planRoutes = require('./routes/plans');

const app = express();
const PORT = process.env.API_PORT || 3000;

app.use(express.json({ limit: '5mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/plans', planRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`API server listening on 127.0.0.1:${PORT}`);
});
