const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const { stmts } = require('../db');
const { auth } = require('../middleware/auth');

const router = Router();

router.use(auth);

router.get('/', (req, res) => {
  const plans = stmts.listPlans.all(req.userId);
  res.json(plans);
});

router.get('/:id', (req, res) => {
  const plan = stmts.getPlan.get(req.params.id, req.userId);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });
  res.json(plan);
});

router.post('/', (req, res) => {
  const { name, data } = req.body || {};
  if (!name) return res.status(400).json({ error: 'Plan name is required' });
  const id = uuidv4();
  const dataStr = typeof data === 'string' ? data : JSON.stringify(data || {});
  stmts.createPlan.run(id, req.userId, name, dataStr);
  const plan = stmts.getPlan.get(id, req.userId);
  res.status(201).json(plan);
});

router.put('/:id', (req, res) => {
  const existing = stmts.getPlan.get(req.params.id, req.userId);
  if (!existing) return res.status(404).json({ error: 'Plan not found' });
  const { name, data } = req.body || {};
  const dataStr = data !== undefined
    ? (typeof data === 'string' ? data : JSON.stringify(data))
    : null;
  stmts.updatePlan.run(name || null, dataStr, req.params.id, req.userId);
  const plan = stmts.getPlan.get(req.params.id, req.userId);
  res.json(plan);
});

router.delete('/:id', (req, res) => {
  const existing = stmts.getPlan.get(req.params.id, req.userId);
  if (!existing) return res.status(404).json({ error: 'Plan not found' });
  stmts.deletePlan.run(req.params.id, req.userId);
  res.status(204).end();
});

module.exports = router;
