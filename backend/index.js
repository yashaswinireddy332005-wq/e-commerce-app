require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const seedDB = require('./seed/productSeeds');
const syncPinecone = require('./sync/syncPinecone');
const productRoutes = require('./routes/products');
const checkoutRoutes = require('./routes/checkout');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const { swaggerUi, swaggerSpec, setupSwaggerUi, setupSwaggerJson } = require('./docs/swagger');

// Create Express App
const app = express();
const PORT = process.env.PORT || 8000;
const mongoUri = process.env.MONGO_URI;

const mongoOptions = {
  maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE || 30),
  minPoolSize: Number(process.env.MONGO_MIN_POOL_SIZE || 5),
  maxIdleTimeMS: Number(process.env.MONGO_MAX_IDLE_TIME_MS || 60000),
  serverSelectionTimeoutMS: Number(process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS || 10000),
  socketTimeoutMS: Number(process.env.MONGO_SOCKET_TIMEOUT_MS || 45000),
  connectTimeoutMS: Number(process.env.MONGO_CONNECT_TIMEOUT_MS || 10000),
};

if (!mongoUri) {
  console.error('❌ MONGO_URI is missing. Set it in backend/.env (local) or hosting environment variables (cloud).');
  process.exit(1);
}

// Database Connection + Seed + Vector Sync + Server Start
mongoose
  .connect(mongoUri, mongoOptions)
  .then(async () => {
    console.log('MongoDB Connected');

    // 1. Seed the database (only when necessary)
    const skipSeed = process.env.SKIP_SEED_ON_START === 'true';
    if (!skipSeed) {
      try {
        const forceSeed = process.env.FORCE_SEED_ON_START === 'true';
        const result = await seedDB({ force: forceSeed, skipIfExists: !forceSeed });
        if (result?.seeded) {
          console.log('🪴 Database seeded');
        } else if (result?.skipped) {
          console.log('🌱 Seed skipped (existing products retained)');
        }
      } catch (err) {
        console.error('❌ Seeding error:', err);
      }
    } else {
      console.log('🌱 SKIP_SEED_ON_START enabled. Existing products preserved.');
    }

    // 2. Sync with Pinecone (primary recommendation engine)
    try {
      await syncPinecone();
      console.log('✅ Pinecone synced');
    } catch (err) {
      console.error('❌ Pinecone sync error (continuing with fallbacks):', err);
    }

    // 3. Start Express server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server ready on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Swagger UI with customized title
setupSwaggerJson(app); // serves /api-docs/swagger.json
setupSwaggerUi(app);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/search', require('./routes/search'));
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// In single-service deployments, serve the built frontend from Express.
const frontendBuildPath = path.resolve(__dirname, '..', 'build');
app.use(express.static(frontendBuildPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/api-docs')) {
    return res.status(404).json({ message: 'Route not found' });
  }

  return res.sendFile(path.join(frontendBuildPath, 'index.html'), err => {
    if (err) {
      res.redirect('/api-docs');
    }
  });
});

module.exports = app;
