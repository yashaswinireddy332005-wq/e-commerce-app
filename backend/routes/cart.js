const express = require('express');
const auth = require('../middleware/auth');
const Cart = require('../models/cart');

const router = express.Router();

const normalizeItem = item => {
  const canonicalId = item?._id || item?.id || item?.productId;
  if (!canonicalId) return null;

  return {
    productId: canonicalId,
    name: item?.name || 'Unnamed product',
    price: typeof item?.price === 'number' ? item.price : Number(item?.price || 0),
    quantity: Math.max(1, Number(item?.quantity || 1)),
    image: item?.image || '',
  };
};

router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart || { userId: req.user.id, items: [] });
  } catch (error) {
    console.error('Cart fetch error:', error);
    res.status(500).json({ msg: 'Unable to fetch cart right now.' });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    const normalizedItems = items.map(normalizeItem).filter(Boolean);

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { userId: req.user.id, items: normalizedItems },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(cart);
  } catch (error) {
    console.error('Cart save error:', error);
    res.status(500).json({ msg: 'Unable to save cart right now.' });
  }
});

module.exports = router;