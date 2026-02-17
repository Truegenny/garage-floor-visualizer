(() => {
  'use strict';

  // ===== OBJECT CATALOG (dimensions in inches) =====
  const CATALOG = [
    {
      category: 'Vehicles',
      id: 'vehicles',
      items: [
        { name: '2021 Honda Passport',  w: 78.6, h: 190.5, color: '#3b82f6', type: 'car' },
        { name: '2023 KTM Duke 890 R',  w: 32.7, h: 82.5,  color: '#ef4444', type: 'moto' },
        { name: '2021 Honda Grom',       w: 28.3, h: 69.1,  color: '#f97316', type: 'moto' },
      ]
    },
    {
      category: 'Lifts',
      id: 'lifts',
      items: [
        { name: 'HF Motorcycle Lift (1500lb)',   w: 24,  h: 84.5, color: '#b91c1c' },
        { name: 'JEGS Motorcycle Lift',           w: 22,  h: 75,   color: '#f59e0b' },
        { name: 'Car Scissor Lift (Mid-Rise)',    w: 48,  h: 50,   color: '#64748b' },
        { name: 'Car Scissor Lift (Full-Rise)',   w: 48,  h: 72,   color: '#475569' },
      ]
    },
    {
      category: 'Woodworking',
      id: 'woodworking',
      items: [
        { name: 'DeWalt 13" Planer (DW735)',       w: 24,  h: 22,  color: '#eab308' },
        { name: 'DeWalt 10" Table Saw (DWE7491)',   w: 31,  h: 25,  color: '#eab308' },
        { name: 'DeWalt 12" Miter Saw (DWS780)',    w: 33,  h: 24,  color: '#eab308' },
        { name: 'DeWalt 20" Scroll Saw (DW788)',    w: 32,  h: 20,  color: '#eab308' },
        { name: 'DeWalt Bench Grinder',              w: 16,  h: 10,  color: '#ca8a04' },
        { name: 'Drill Press (Floor)',               w: 15,  h: 15,  color: '#ca8a04' },
        { name: 'Band Saw (Floor)',                  w: 20,  h: 20,  color: '#ca8a04' },
        { name: 'Router Table',                      w: 27,  h: 18,  color: '#eab308' },
        { name: 'Wood Lathe',                        w: 48,  h: 16,  color: '#ca8a04' },
        { name: 'Workbench 5ft',                     w: 60,  h: 30,  color: '#92400e' },
        { name: 'Workbench 6ft',                     w: 72,  h: 30,  color: '#92400e' },
        { name: 'Shop Vac',                          w: 18,  h: 18,  color: '#737373' },
        { name: 'Air Compressor (Pancake)',          w: 18,  h: 18,  color: '#dc2626' },
        { name: 'Air Compressor (60 gal)',           w: 24,  h: 48,  color: '#dc2626' },
      ]
    },
    {
      category: 'Tool Storage',
      id: 'toolStorage',
      items: [
        { name: 'US General 26" Chest',     w: 26,   h: 14.5, color: '#dc2626' },
        { name: 'US General 34" Cart',       w: 34,   h: 20,   color: '#dc2626' },
        { name: 'US General 44" Cart',       w: 44.2, h: 22.3, color: '#dc2626' },
        { name: 'US General 56" Cart',       w: 56.3, h: 22.3, color: '#dc2626' },
        { name: 'US General 72" Cabinet',    w: 72,   h: 22,   color: '#dc2626' },
        { name: 'HF 30" Service Cart',       w: 30,   h: 16,   color: '#b91c1c' },
        { name: 'Husky 46" Tool Chest',      w: 46,   h: 18,   color: '#2563eb' },
        { name: 'Husky 52" Tool Chest',      w: 52,   h: 18,   color: '#2563eb' },
        { name: 'Husky 61" Tool Chest',      w: 61,   h: 24.5, color: '#2563eb' },
        { name: 'Husky 36" Wall Cabinet',    w: 36,   h: 12,   color: '#1d4ed8' },
        { name: 'Milwaukee 46" Tool Chest', w: 46,   h: 22,   color: '#dc2626' },
        { name: 'Milwaukee Packout Stack',  w: 22,   h: 18,   color: '#dc2626' },
        { name: 'Craftsman 52" Tool Chest', w: 52,   h: 18,   color: '#1f2937' },
        { name: 'Craftsman 41" Cart',       w: 41,   h: 18,   color: '#1f2937' },
        { name: 'Snap-on 55" Classic',      w: 55,   h: 24,   color: '#1e40af' },
      ]
    },
    {
      category: 'Tires',
      id: 'tires',
      items: [
        { name: 'Car Tire (single)',        w: 9,  h: 26,  color: '#374151' },
        { name: 'Car Tire Stack (4)',       w: 26, h: 26,  color: '#374151' },
        { name: 'Truck/SUV Tire (single)',  w: 12, h: 33,  color: '#374151' },
        { name: 'Truck/SUV Tire Stack (4)', w: 33, h: 33,  color: '#374151' },
        { name: 'Tire Rack',                w: 48, h: 18,  color: '#6b7280' },
      ]
    },
    {
      category: 'Shelving',
      id: 'shelving',
      items: [
        { name: 'Steel Shelf 48"x18"',   w: 48, h: 18, color: '#6b7280' },
        { name: 'Steel Shelf 48"x24"',   w: 48, h: 24, color: '#6b7280' },
        { name: 'Steel Shelf 36"x18"',   w: 36, h: 18, color: '#6b7280' },
        { name: 'Steel Shelf 72"x24"',   w: 72, h: 24, color: '#6b7280' },
        { name: 'Plastic Shelf 36"x18"', w: 36, h: 18, color: '#8b5cf6' },
        { name: 'Plastic Shelf 48"x20"', w: 48, h: 20, color: '#8b5cf6' },
        { name: 'Plastic Shelf 72"x24"', w: 72, h: 24, color: '#8b5cf6' },
      ]
    },
    {
      category: 'Bins & Totes',
      id: 'bins',
      items: [
        { name: '27 Gal Yellow Tote (HDX)',  w: 30.5, h: 20.5, color: '#eab308' },
        { name: '17 Gal Storage Tote',       w: 23.5, h: 16.5, color: '#6366f1' },
        { name: '50 Gal Storage Tote',       w: 36.5, h: 21,   color: '#6366f1' },
        { name: 'Sterilite Stacking Bin',    w: 16,   h: 12,   color: '#8b5cf6' },
      ]
    },
  ];

  // ===== STATE =====
  let room = { w: 240, h: 240 };
  let objects = [];
  let nextId = 1;
  let selected = null;
  let scale = 3;
  let pan = { x: 120, y: 120 };
  let snapEnabled = true;
  let showLabels = true;
  let activeCategory = 'vehicles';
  let dragging = null;
  let darkMode = localStorage.getItem('garageTheme') !== 'light';

  // ===== THEME COLORS (canvas) =====
  const themes = {
    dark: {
      canvasBg: '#1a1a2e',
      floor: '#e8e4df',
      grid: '#d0ccc7',
      wallOuter: '#555',
      wallInner: '#888',
      dimText: '#ccc',
      dimLine: '#999',
      labelText: '#000',
      labelShadow: 'rgba(255,255,255,0.6)',
      dimSubText: '#444',
    },
    light: {
      canvasBg: '#e8eaed',
      floor: '#f5f3f0',
      grid: '#ddd8d3',
      wallOuter: '#666',
      wallInner: '#999',
      dimText: '#444',
      dimLine: '#888',
      labelText: '#000',
      labelShadow: 'rgba(255,255,255,0.7)',
      dimSubText: '#555',
    },
  };

  function themeColors() { return darkMode ? themes.dark : themes.light; }

  // ===== AUTH / PLAN STATE =====
  let authToken = localStorage.getItem('authToken') || null;
  let currentUser = null;
  let currentPlanId = null;
  let plansList = [];
  let autoSaveTimer = null;

  // ===== DOM =====
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // ===== HELPERS =====
  function fmt(inches) {
    const ft = Math.floor(Math.abs(inches) / 12);
    const inc = Math.round(Math.abs(inches) % 12);
    if (ft === 0) return `${inc}"`;
    if (inc === 0) return `${ft}'`;
    return `${ft}'${inc}"`;
  }

  function boundingBox(obj) {
    const rad = obj.rotation * Math.PI / 180;
    const cosA = Math.abs(Math.cos(rad));
    const sinA = Math.abs(Math.sin(rad));
    return {
      w: obj.w * cosA + obj.h * sinA,
      h: obj.w * sinA + obj.h * cosA
    };
  }

  function snap(v) { return snapEnabled ? Math.round(v) : v; }

  function rrect(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // ===== API HELPERS =====
  async function apiFetch(path, opts = {}) {
    const headers = { 'Content-Type': 'application/json', ...opts.headers };
    if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
    const res = await fetch(path, { ...opts, headers });
    if (res.status === 401) {
      logout();
      return null;
    }
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Request failed (${res.status})`);
    }
    if (res.status === 204) return null;
    return res.json();
  }

  // ===== AUTH FUNCTIONS =====
  async function login(username, password) {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (!data) throw new Error('Login failed');
    authToken = data.token;
    currentUser = data.user;
    localStorage.setItem('authToken', authToken);
    onAuthChange();
    return data;
  }

  function logout() {
    authToken = null;
    currentUser = null;
    currentPlanId = null;
    plansList = [];
    localStorage.removeItem('authToken');
    if (autoSaveTimer) { clearTimeout(autoSaveTimer); autoSaveTimer = null; }
    onAuthChange();
  }

  async function checkAuth() {
    if (!authToken) return;
    try {
      const data = await apiFetch('/api/auth/me');
      if (data) {
        currentUser = data;
        onAuthChange();
      }
    } catch {
      authToken = null;
      localStorage.removeItem('authToken');
    }
  }

  // ===== PLANS CRUD =====
  async function loadPlansList() {
    if (!authToken) return;
    try {
      plansList = await apiFetch('/api/plans') || [];
      renderPlansList();
    } catch { plansList = []; renderPlansList(); }
  }

  async function savePlan() {
    if (!authToken) return;
    const layoutData = JSON.stringify({ room, objects, nextId });
    if (currentPlanId) {
      try {
        await apiFetch(`/api/plans/${currentPlanId}`, {
          method: 'PUT',
          body: JSON.stringify({ data: layoutData }),
        });
        await loadPlansList();
      } catch (e) { alert('Save failed: ' + e.message); }
    } else {
      await saveAsNew();
    }
  }

  async function saveAsNew() {
    if (!authToken) return;
    const name = prompt('Plan name:', 'My Garage Layout');
    if (!name) return;
    const layoutData = JSON.stringify({ room, objects, nextId });
    try {
      const plan = await apiFetch('/api/plans', {
        method: 'POST',
        body: JSON.stringify({ name, data: layoutData }),
      });
      if (plan) {
        currentPlanId = plan.id;
        await loadPlansList();
      }
    } catch (e) { alert('Save failed: ' + e.message); }
  }

  async function loadPlan(id) {
    if (!authToken) return;
    try {
      const plan = await apiFetch(`/api/plans/${id}`);
      if (!plan) return;
      const d = JSON.parse(plan.data);
      room = d.room || room;
      objects = (d.objects || []).map(o => ({ ...o, layer: o.layer || 1 }));
      nextId = d.nextId || 1;
      selected = null;
      currentPlanId = plan.id;
      document.getElementById('room-w-ft').value = Math.floor(room.w / 12);
      document.getElementById('room-w-in').value = Math.round(room.w % 12);
      document.getElementById('room-d-ft').value = Math.floor(room.h / 12);
      document.getElementById('room-d-in').value = Math.round(room.h % 12);
      updateSelected();
      renderPlansList();
      saveLocal();
      fitView();
    } catch (e) { alert('Load failed: ' + e.message); }
  }

  async function deletePlan(id) {
    if (!confirm('Delete this floor plan?')) return;
    try {
      await apiFetch(`/api/plans/${id}`, { method: 'DELETE' });
      if (currentPlanId === id) currentPlanId = null;
      await loadPlansList();
    } catch (e) { alert('Delete failed: ' + e.message); }
  }

  async function renamePlan(id) {
    const plan = plansList.find(p => p.id === id);
    if (!plan) return;
    const name = prompt('New name:', plan.name);
    if (!name || name === plan.name) return;
    try {
      await apiFetch(`/api/plans/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name }),
      });
      await loadPlansList();
    } catch (e) { alert('Rename failed: ' + e.message); }
  }

  // Debounced auto-save to server
  function scheduleAutoSave() {
    if (!authToken || !currentPlanId) return;
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(async () => {
      autoSaveTimer = null;
      const layoutData = JSON.stringify({ room, objects, nextId });
      try {
        await apiFetch(`/api/plans/${currentPlanId}`, {
          method: 'PUT',
          body: JSON.stringify({ data: layoutData }),
        });
      } catch { /* silent fail for auto-save */ }
    }, 2000);
  }

  // ===== ADMIN FUNCTIONS =====
  async function loadUsers() {
    if (!authToken || !currentUser?.is_admin) return;
    try {
      const users = await apiFetch('/api/auth/users');
      if (!users) return;
      const list = document.getElementById('admin-user-list');
      list.innerHTML = '';
      for (const u of users) {
        const div = document.createElement('div');
        div.className = 'admin-user-item';
        const nameSpan = document.createElement('span');
        nameSpan.className = 'admin-user-name';
        nameSpan.textContent = u.username;
        if (u.is_admin) {
          const badge = document.createElement('span');
          badge.className = 'admin-tag';
          badge.textContent = 'ADMIN';
          nameSpan.appendChild(badge);
        }
        const dateSpan = document.createElement('span');
        dateSpan.className = 'admin-user-date';
        const d = new Date(u.created_at + 'Z');
        dateSpan.textContent = d.toLocaleDateString();
        div.appendChild(nameSpan);
        div.appendChild(dateSpan);
        if (u.id !== currentUser.id) {
          const delBtn = document.createElement('button');
          delBtn.className = 'plan-btn danger';
          delBtn.textContent = 'Del';
          delBtn.addEventListener('click', () => deleteUser(u.id, u.username));
          div.appendChild(delBtn);
        }
        list.appendChild(div);
      }
    } catch (e) { console.error('Failed to load users:', e); }
  }

  async function createUser(username, password) {
    if (!authToken) return;
    await apiFetch('/api/auth/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    await loadUsers();
  }

  async function deleteUser(id, username) {
    if (!confirm(`Delete user "${username}"? This will also delete all their saved plans.`)) return;
    try {
      await apiFetch(`/api/auth/users/${id}`, { method: 'DELETE' });
      await loadUsers();
    } catch (e) { alert('Error: ' + e.message); }
  }

  // ===== UI: AUTH STATE CHANGE =====
  function onAuthChange() {
    const userBar = document.getElementById('user-bar');
    const loginBar = document.getElementById('login-bar');
    const plansPanel = document.getElementById('plans-panel');
    const adminPanel = document.getElementById('admin-panel');

    if (currentUser) {
      userBar.style.display = 'flex';
      loginBar.style.display = 'none';
      plansPanel.style.display = 'block';
      const display = document.getElementById('user-display');
      display.innerHTML = '';
      display.textContent = currentUser.username;
      if (currentUser.is_admin) {
        const badge = document.createElement('span');
        badge.className = 'admin-badge';
        badge.textContent = 'ADMIN';
        display.appendChild(badge);
        adminPanel.style.display = 'block';
        loadUsers();
      } else {
        adminPanel.style.display = 'none';
      }
      loadPlansList().then(async () => {
        // On first login with localStorage data but no server plans, offer import
        if (plansList.length === 0 && objects.length > 0) {
          if (confirm('You have a layout in your browser. Import it as a saved plan?')) {
            const name = prompt('Plan name:', 'Imported Layout') || 'Imported Layout';
            const layoutData = JSON.stringify({ room, objects, nextId });
            try {
              const plan = await apiFetch('/api/plans', {
                method: 'POST',
                body: JSON.stringify({ name, data: layoutData }),
              });
              if (plan) { currentPlanId = plan.id; await loadPlansList(); }
            } catch { /* ignore */ }
          }
        }
      });
    } else {
      userBar.style.display = 'none';
      loginBar.style.display = 'block';
      plansPanel.style.display = 'none';
      adminPanel.style.display = 'none';
      currentPlanId = null;
      renderPlansList();
    }
  }

  function renderPlansList() {
    const list = document.getElementById('plans-list');
    const empty = document.getElementById('plans-empty');
    list.innerHTML = '';

    if (plansList.length === 0) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    for (const plan of plansList) {
      const div = document.createElement('div');
      div.className = 'plan-item' + (plan.id === currentPlanId ? ' active' : '');

      const nameSpan = document.createElement('span');
      nameSpan.className = 'plan-item-name';
      nameSpan.textContent = plan.name;

      const dateSpan = document.createElement('span');
      dateSpan.className = 'plan-item-date';
      const d = new Date(plan.updated_at + 'Z');
      dateSpan.textContent = d.toLocaleDateString();

      const actions = document.createElement('span');
      actions.className = 'plan-item-actions';

      const renameBtn = document.createElement('button');
      renameBtn.className = 'plan-btn';
      renameBtn.textContent = 'Rename';
      renameBtn.addEventListener('click', (e) => { e.stopPropagation(); renamePlan(plan.id); });

      const delBtn = document.createElement('button');
      delBtn.className = 'plan-btn danger';
      delBtn.textContent = 'Del';
      delBtn.addEventListener('click', (e) => { e.stopPropagation(); deletePlan(plan.id); });

      actions.appendChild(renameBtn);
      actions.appendChild(delBtn);

      div.appendChild(nameSpan);
      div.appendChild(dateSpan);
      div.appendChild(actions);
      div.addEventListener('click', () => loadPlan(plan.id));
      list.appendChild(div);
    }
  }

  // ===== AUTH MODAL =====
  function setupAuthModal() {
    const modal = document.getElementById('auth-modal');
    const form = document.getElementById('auth-form');
    const submitBtn = document.getElementById('btn-auth-submit');
    const errorEl = document.getElementById('auth-error');

    document.getElementById('btn-show-auth').addEventListener('click', () => {
      form.reset();
      errorEl.style.display = 'none';
      modal.style.display = 'flex';
    });

    document.getElementById('btn-auth-close').addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('auth-username').value.trim();
      const password = document.getElementById('auth-password').value;
      errorEl.style.display = 'none';
      submitBtn.disabled = true;
      try {
        await login(username, password);
        modal.style.display = 'none';
        form.reset();
      } catch (err) {
        errorEl.textContent = err.message;
        errorEl.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // ===== COORDINATE TRANSFORMS =====
  function w2cx(wx) { return (wx - pan.x) * scale + canvas.width / 2; }
  function w2cy(wy) { return (wy - pan.y) * scale + canvas.height / 2; }
  function c2wx(cx) { return (cx - canvas.width / 2) / scale + pan.x; }
  function c2wy(cy) { return (cy - canvas.height / 2) / scale + pan.y; }

  // ===== RENDERING =====
  function render() {
    const W = canvas.width, H = canvas.height;
    const tc = themeColors();
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = tc.canvasBg;
    ctx.fillRect(0, 0, W, H);

    // Room floor
    const rx = w2cx(0), ry = w2cy(0);
    const rw = room.w * scale, rh = room.h * scale;
    ctx.fillStyle = tc.floor;
    ctx.fillRect(rx, ry, rw, rh);

    // Grid
    ctx.strokeStyle = tc.grid;
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= room.w; x += 12) {
      const cx = w2cx(x);
      ctx.beginPath(); ctx.moveTo(cx, ry); ctx.lineTo(cx, ry + rh); ctx.stroke();
    }
    for (let y = 0; y <= room.h; y += 12) {
      const cy = w2cy(y);
      ctx.beginPath(); ctx.moveTo(rx, cy); ctx.lineTo(rx + rw, cy); ctx.stroke();
    }

    // Room walls — thick with depth
    const wallPx = Math.max(4, 4 * scale);
    ctx.strokeStyle = tc.wallOuter;
    ctx.lineWidth = wallPx;
    ctx.strokeRect(rx, ry, rw, rh);
    ctx.strokeStyle = tc.wallInner;
    ctx.lineWidth = 1;
    ctx.strokeRect(rx + wallPx / 2, ry + wallPx / 2, rw - wallPx, rh - wallPx);

    // Room dimensions
    const dimOffset = wallPx / 2 + 14;
    ctx.fillStyle = tc.dimText;
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(fmt(room.w), rx + rw / 2, ry - dimOffset);
    ctx.save();
    ctx.translate(rx - dimOffset, ry + rh / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textBaseline = 'bottom';
    ctx.fillText(fmt(room.h), 0, 0);
    ctx.restore();

    // Dimension lines
    ctx.strokeStyle = tc.dimLine;
    ctx.lineWidth = 1;
    const tickLen = 6;
    // Top width line
    const dlY = ry - dimOffset + 4;
    ctx.beginPath();
    ctx.moveTo(rx, dlY); ctx.lineTo(rx + rw, dlY);
    ctx.moveTo(rx, dlY - tickLen); ctx.lineTo(rx, dlY + tickLen);
    ctx.moveTo(rx + rw, dlY - tickLen); ctx.lineTo(rx + rw, dlY + tickLen);
    ctx.stroke();
    // Left depth line
    const dlX = rx - dimOffset + 4;
    ctx.beginPath();
    ctx.moveTo(dlX, ry); ctx.lineTo(dlX, ry + rh);
    ctx.moveTo(dlX - tickLen, ry); ctx.lineTo(dlX + tickLen, ry);
    ctx.moveTo(dlX - tickLen, ry + rh); ctx.lineTo(dlX + tickLen, ry + rh);
    ctx.stroke();

    // Objects (sorted by layer — higher layers draw on top)
    const sorted = objects.map((obj, i) => ({ obj, i }))
      .sort((a, b) => (a.obj.layer || 1) - (b.obj.layer || 1) || a.i - b.i);
    for (const { obj } of sorted) drawObject(obj);

    // Selection highlight + rotation handles
    if (selected) {
      const obj = objects.find(o => o.id === selected);
      if (obj) {
        const bb = boundingBox(obj);
        const screenCX = w2cx(obj.x) + bb.w * scale / 2;
        const screenCY = w2cy(obj.y) + bb.h * scale / 2;
        const ow = obj.w * scale;
        const oh = obj.h * scale;
        const pad = 3;

        ctx.save();
        ctx.translate(screenCX, screenCY);
        ctx.rotate(obj.rotation * Math.PI / 180);
        rrect(-ow / 2 - pad, -oh / 2 - pad, ow + pad * 2, oh + pad * 2, 6);
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Corner rotation handles
        const handleR = 5;
        for (const [hx, hy] of [
          [-ow / 2 - pad, -oh / 2 - pad],
          [ ow / 2 + pad, -oh / 2 - pad],
          [ ow / 2 + pad,  oh / 2 + pad],
          [-ow / 2 - pad,  oh / 2 + pad],
        ]) {
          ctx.beginPath();
          ctx.arc(hx, hy, handleR, 0, Math.PI * 2);
          ctx.fillStyle = '#00ff88';
          ctx.fill();
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      }
    }
  }

  // ===== OBJECT DRAWING =====
  function drawObject(obj) {
    const bb = boundingBox(obj);
    const screenCX = w2cx(obj.x) + bb.w * scale / 2;
    const screenCY = w2cy(obj.y) + bb.h * scale / 2;
    const ow = obj.w * scale, oh = obj.h * scale;
    const r = Math.min(4 * scale / 3, ow * 0.06, oh * 0.06);
    const rad = obj.rotation * Math.PI / 180;

    ctx.save();
    ctx.translate(screenCX, screenCY);
    ctx.rotate(rad);

    const ox = -ow / 2, oy = -oh / 2;

    // Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    rrect(ox, oy, ow, oh, r);
    ctx.fillStyle = obj.color + 'cc';
    ctx.fill();
    ctx.restore();

    // Border
    rrect(ox, oy, ow, oh, r);
    ctx.strokeStyle = obj.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner highlight (top-left edge glow)
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 2;
    rrect(ox + 1, oy + 1, ow - 2, oh - 2, r);
    ctx.stroke();
    ctx.restore();

    // Type-specific details
    if (obj.type === 'car') drawCarDetail(ox, oy, ow, oh);
    else if (obj.type === 'moto') drawMotoDetail(ox, oy, ow, oh);

    // Direction indicator
    ctx.fillStyle = obj.color;
    const tri = Math.min(5, ow * 0.12, oh * 0.07);
    if (tri > 2) {
      ctx.beginPath();
      ctx.moveTo(-tri, oy + tri * 2.5);
      ctx.lineTo(tri, oy + tri * 2.5);
      ctx.lineTo(0, oy + 3);
      ctx.fill();
    }

    // Labels
    if (showLabels && scale > 1) {
      let fs = Math.min(13, ow / (obj.name.length * 0.55));
      fs = Math.max(8, fs);
      if (fs >= 6) {
        const tc = themeColors();
        ctx.font = `600 ${fs}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = tc.labelShadow;
        ctx.fillText(obj.name, 0.5, -fs * 0.5 + 0.5, ow - 8);
        ctx.fillStyle = tc.labelText;
        ctx.fillText(obj.name, 0, -fs * 0.5, ow - 8);

        const dimTxt = `${fmt(obj.w)} x ${fmt(obj.h)}`;
        ctx.font = `${Math.max(7, fs - 2)}px sans-serif`;
        ctx.fillStyle = tc.dimSubText;
        ctx.fillText(dimTxt, 0, fs * 0.6, ow - 8);
      }
    }

    ctx.restore();
  }

  function drawCarDetail(ox, oy, ow, oh) {
    const wi = Math.max(2, ow * 0.08);  // wheel width
    const wl = Math.max(3, oh * 0.07);  // wheel length
    const pad = Math.max(2, ow * 0.07);

    // Wheels (dark rounded rects at corners)
    ctx.fillStyle = '#1a1a1a';
    for (const [wx, wy] of [
      [ox + pad, oy + pad],
      [ox + ow - pad - wi, oy + pad],
      [ox + pad, oy + oh - pad - wl],
      [ox + ow - pad - wi, oy + oh - pad - wl],
    ]) {
      rrect(wx, wy, wi, wl, 1);
      ctx.fill();
    }

    // Windshield
    const wsY = oy + oh * 0.28;
    const wsIn = ow * 0.18;
    ctx.strokeStyle = 'rgba(140,200,255,0.5)';
    ctx.lineWidth = Math.max(1.2, scale * 0.4);
    ctx.beginPath();
    ctx.moveTo(ox + wsIn, wsY);
    ctx.quadraticCurveTo(ox + ow / 2, wsY - oh * 0.025, ox + ow - wsIn, wsY);
    ctx.stroke();

    // Rear window
    const rwY = oy + oh * 0.78;
    ctx.beginPath();
    ctx.moveTo(ox + wsIn * 1.3, rwY);
    ctx.quadraticCurveTo(ox + ow / 2, rwY + oh * 0.02, ox + ow - wsIn * 1.3, rwY);
    ctx.stroke();

    // Roof line
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = Math.max(1, scale * 0.3);
    rrect(ox + ow * 0.2, oy + oh * 0.3, ow * 0.6, oh * 0.4, 3);
    ctx.stroke();
  }

  function drawMotoDetail(ox, oy, ow, oh) {
    const wr = Math.max(2, Math.min(ow * 0.22, oh * 0.05));

    // Front wheel
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(ox + ow / 2, oy + wr + 3, wr, 0, Math.PI * 2);
    ctx.fill();
    // Rear wheel
    ctx.beginPath();
    ctx.arc(ox + ow / 2, oy + oh - wr - 3, wr, 0, Math.PI * 2);
    ctx.fill();

    // Handlebar
    const hbY = oy + oh * 0.16;
    const hbW = ow * 0.85;
    ctx.strokeStyle = '#333';
    ctx.lineWidth = Math.max(2, scale * 0.5);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(ox + (ow - hbW) / 2, hbY);
    ctx.lineTo(ox + (ow + hbW) / 2, hbY);
    ctx.stroke();
    ctx.lineCap = 'butt';

    // Frame center line
    ctx.strokeStyle = 'rgba(80,80,80,0.35)';
    ctx.lineWidth = Math.max(1, scale * 0.25);
    ctx.beginPath();
    ctx.moveTo(ox + ow / 2, oy + oh * 0.22);
    ctx.lineTo(ox + ow / 2, oy + oh * 0.78);
    ctx.stroke();
  }

  // ===== EXPORT =====
  function exportPNG() {
    const prev = selected;
    selected = null;
    render();
    const link = document.createElement('a');
    link.download = 'garage-layout.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    selected = prev;
    render();
  }

  // ===== THEME TOGGLE =====
  function applyTheme() {
    document.body.classList.toggle('light', !darkMode);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.innerHTML = darkMode ? '&#9790;' : '&#9728;';
    render();
  }

  function toggleTheme() {
    darkMode = !darkMode;
    localStorage.setItem('garageTheme', darkMode ? 'dark' : 'light');
    applyTheme();
  }

  // ===== OBJECT MANAGEMENT =====
  function addObject(tmpl) {
    const obj = {
      id: nextId++,
      name: tmpl.name,
      w: tmpl.w,
      h: tmpl.h,
      color: tmpl.color,
      type: tmpl.type || null,
      x: snap(pan.x - tmpl.w / 2),
      y: snap(pan.y - tmpl.h / 2),
      rotation: 0,
      layer: 1,
    };
    objects.push(obj);
    selected = obj.id;
    updateSelected();
    save();
    render();
  }

  function deleteSelected() {
    if (!selected) return;
    objects = objects.filter(o => o.id !== selected);
    selected = null;
    updateSelected();
    save();
    render();
  }

  function rotateSelected() {
    const obj = objects.find(o => o.id === selected);
    if (!obj) return;
    const bb = boundingBox(obj);
    const cxBefore = obj.x + bb.w / 2;
    const cyBefore = obj.y + bb.h / 2;
    obj.rotation = (obj.rotation + 90) % 360;
    const bb2 = boundingBox(obj);
    obj.x = snap(cxBefore - bb2.w / 2);
    obj.y = snap(cyBefore - bb2.h / 2);
    updateSelected();
    save();
    render();
  }

  // ===== ROTATION HANDLE HIT TEST =====
  function hitRotationHandle(screenX, screenY) {
    if (!selected) return false;
    const obj = objects.find(o => o.id === selected);
    if (!obj) return false;

    const bb = boundingBox(obj);
    const screenCX = w2cx(obj.x) + bb.w * scale / 2;
    const screenCY = w2cy(obj.y) + bb.h * scale / 2;
    const hw = obj.w * scale / 2;
    const hh = obj.h * scale / 2;
    const pad = 3;
    const rad = obj.rotation * Math.PI / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const corners = [
      [-hw - pad, -hh - pad],
      [ hw + pad, -hh - pad],
      [ hw + pad,  hh + pad],
      [-hw - pad,  hh + pad],
    ];

    for (const [lx, ly] of corners) {
      const sx = screenCX + lx * cos - ly * sin;
      const sy = screenCY + lx * sin + ly * cos;
      if (Math.hypot(screenX - sx, screenY - sy) <= 10) return true;
    }
    return false;
  }

  // ===== HIT TEST =====
  function hitTest(wx, wy) {
    // Check from highest layer down, then last-added first within same layer
    const sorted = objects.map((o, i) => ({ o, i }))
      .sort((a, b) => (b.o.layer || 1) - (a.o.layer || 1) || b.i - a.i);
    for (const { o } of sorted) {
      const bb = boundingBox(o);
      const cx = o.x + bb.w / 2;
      const cy = o.y + bb.h / 2;
      const dx = wx - cx;
      const dy = wy - cy;
      const rad = -o.rotation * Math.PI / 180;
      const lx = dx * Math.cos(rad) - dy * Math.sin(rad);
      const ly = dx * Math.sin(rad) + dy * Math.cos(rad);
      if (Math.abs(lx) <= o.w / 2 && Math.abs(ly) <= o.h / 2) return o;
    }
    return null;
  }

  // ===== MOUSE EVENTS =====
  function mpos(e) {
    const r = canvas.getBoundingClientRect();
    return { cx: e.clientX - r.left, cy: e.clientY - r.top };
  }

  canvas.addEventListener('mousedown', e => {
    const p = mpos(e);
    const wx = c2wx(p.cx), wy = c2wy(p.cy);

    if (e.button === 0) {
      // Check rotation handles first
      if (selected && hitRotationHandle(p.cx, p.cy)) {
        const obj = objects.find(o => o.id === selected);
        if (obj) {
          const bb = boundingBox(obj);
          const wcx = obj.x + bb.w / 2;
          const wcy = obj.y + bb.h / 2;
          const screenCX = w2cx(wcx);
          const screenCY = w2cy(wcy);
          const startAngle = Math.atan2(p.cy - screenCY, p.cx - screenCX);
          dragging = {
            type: 'rotate', id: obj.id,
            startAngle, startRotation: obj.rotation,
            wcx, wcy,
          };
          render();
          return;
        }
      }

      const obj = hitTest(wx, wy);
      if (obj) {
        selected = obj.id;
        dragging = { type: 'obj', id: obj.id, sx: wx, sy: wy, ox: obj.x, oy: obj.y };
      } else {
        selected = null;
        dragging = { type: 'pan', scx: p.cx, scy: p.cy, opx: pan.x, opy: pan.y };
      }
      updateSelected();
      render();
    }
  });

  canvas.addEventListener('mousemove', e => {
    if (!dragging) {
      // Update cursor when hovering over rotation handles
      const p = mpos(e);
      canvas.style.cursor = (selected && hitRotationHandle(p.cx, p.cy)) ? 'grab' : 'default';
      return;
    }
    const p = mpos(e);

    if (dragging.type === 'rotate') {
      const obj = objects.find(o => o.id === dragging.id);
      if (obj) {
        const screenCX = w2cx(dragging.wcx);
        const screenCY = w2cy(dragging.wcy);
        const currentAngle = Math.atan2(p.cy - screenCY, p.cx - screenCX);
        let delta = (currentAngle - dragging.startAngle) * 180 / Math.PI;
        let newRotation = dragging.startRotation + delta;
        // Snap to 5-degree increments when snap is enabled
        if (snapEnabled) newRotation = Math.round(newRotation / 5) * 5;
        newRotation = ((newRotation % 360) + 360) % 360;
        // Keep center stable
        const bb = boundingBox(obj);
        const cx = obj.x + bb.w / 2;
        const cy = obj.y + bb.h / 2;
        obj.rotation = newRotation;
        const bb2 = boundingBox(obj);
        obj.x = cx - bb2.w / 2;
        obj.y = cy - bb2.h / 2;
        updateSelected();
        render();
      }
    } else if (dragging.type === 'obj') {
      const wx = c2wx(p.cx), wy = c2wy(p.cy);
      const obj = objects.find(o => o.id === dragging.id);
      if (obj) {
        obj.x = snap(dragging.ox + (wx - dragging.sx));
        obj.y = snap(dragging.oy + (wy - dragging.sy));
        render();
      }
    } else {
      pan.x = dragging.opx - (p.cx - dragging.scx) / scale;
      pan.y = dragging.opy - (p.cy - dragging.scy) / scale;
      render();
    }
  });

  canvas.addEventListener('mouseup', () => {
    if (dragging?.type === 'obj' || dragging?.type === 'rotate') save();
    dragging = null;
    canvas.style.cursor = 'default';
  });

  canvas.addEventListener('wheel', e => {
    e.preventDefault();

    // Ignore events with no vertical delta (horizontal scroll, gesture artifacts)
    if (e.deltaY === 0) return;

    // Validate current state - reset if corrupted
    if (!isFinite(pan.x) || !isFinite(pan.y) || !isFinite(scale)) {
      scale = 3;
      pan.x = room.w / 2;
      pan.y = room.h / 2;
      render();
      return;
    }

    const p = mpos(e);
    const wx = c2wx(p.cx), wy = c2wy(p.cy);

    // Validate world coordinates
    if (!isFinite(wx) || !isFinite(wy)) {
      return;
    }

    const f = e.deltaY > 0 ? 0.9 : 1.1;
    scale = Math.max(0.5, Math.min(20, scale * f));

    const newPanX = wx - (p.cx - canvas.width / 2) / scale;
    const newPanY = wy - (p.cy - canvas.height / 2) / scale;

    // Only update pan if new values are valid and within reasonable bounds
    if (isFinite(newPanX) && isFinite(newPanY)) {
      const maxPan = Math.max(room.w, room.h) * 2;
      pan.x = Math.max(-maxPan, Math.min(maxPan, newPanX));
      pan.y = Math.max(-maxPan, Math.min(maxPan, newPanY));
    }

    render();
  }, { passive: false });

  // ===== TOUCH EVENTS =====
  let lastTouch = null;
  canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      e.preventDefault();
      const t = e.touches[0];
      const fakeE = { clientX: t.clientX, clientY: t.clientY, button: 0 };
      canvas.dispatchEvent(new MouseEvent('mousedown', fakeE));
      lastTouch = { x: t.clientX, y: t.clientY };
    }
  }, { passive: false });

  canvas.addEventListener('touchmove', e => {
    if (e.touches.length === 1 && lastTouch) {
      e.preventDefault();
      const t = e.touches[0];
      canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: t.clientX, clientY: t.clientY }));
      lastTouch = { x: t.clientX, y: t.clientY };
    }
  }, { passive: false });

  canvas.addEventListener('touchend', e => {
    canvas.dispatchEvent(new MouseEvent('mouseup'));
    lastTouch = null;
  });

  // ===== KEYBOARD =====
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'r' || e.key === 'R') rotateSelected();
    else if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); deleteSelected(); }
    else if (e.key === 'Escape') { selected = null; updateSelected(); render(); }
  });

  // ===== UI =====
  function populateCatalog(catId) {
    activeCategory = catId;
    const list = document.getElementById('catalog-list');
    const cat = CATALOG.find(c => c.id === catId);
    list.innerHTML = '';
    if (!cat) return;

    for (const item of cat.items) {
      const btn = document.createElement('button');
      btn.className = 'catalog-item';

      const swatch = document.createElement('span');
      swatch.className = 'item-color';
      swatch.style.background = item.color;

      const info = document.createElement('span');
      info.className = 'item-info';
      const nameSpan = document.createElement('span');
      nameSpan.className = 'item-name';
      nameSpan.textContent = item.name;
      const dimsSpan = document.createElement('span');
      dimsSpan.className = 'item-dims';
      dimsSpan.textContent = `${fmt(item.w)} x ${fmt(item.h)}`;
      info.appendChild(nameSpan);
      info.appendChild(dimsSpan);

      btn.appendChild(swatch);
      btn.appendChild(info);
      btn.addEventListener('click', () => addObject(item));
      list.appendChild(btn);
    }

    document.querySelectorAll('.tab-btn').forEach(t =>
      t.classList.toggle('active', t.dataset.cat === catId));
  }

  function updateSelected() {
    const panel = document.getElementById('selected-panel');
    const obj = objects.find(o => o.id === selected);
    if (!obj) { panel.style.display = 'none'; return; }
    panel.style.display = 'block';
    document.getElementById('edit-name').value = obj.name;
    document.getElementById('edit-w-ft').value = Math.floor(obj.w / 12);
    document.getElementById('edit-w-in').value = Math.round(obj.w % 12);
    document.getElementById('edit-d-ft').value = Math.floor(obj.h / 12);
    document.getElementById('edit-d-in').value = Math.round(obj.h % 12);
    document.getElementById('edit-color').value = obj.color;
    document.getElementById('sel-rotation').textContent = `Rotated ${Math.round(obj.rotation)}\u00b0`;
    document.getElementById('edit-layer').value = obj.layer || 1;
  }

  function applyEdit() {
    const obj = objects.find(o => o.id === selected);
    if (!obj) return;
    obj.name = document.getElementById('edit-name').value.trim() || obj.name;
    const nw = (parseInt(document.getElementById('edit-w-ft').value) || 0) * 12
             + (parseInt(document.getElementById('edit-w-in').value) || 0);
    const nh = (parseInt(document.getElementById('edit-d-ft').value) || 0) * 12
             + (parseInt(document.getElementById('edit-d-in').value) || 0);
    if (nw > 0) obj.w = nw;
    if (nh > 0) obj.h = nh;
    obj.color = document.getElementById('edit-color').value;
    obj.layer = Math.max(1, parseInt(document.getElementById('edit-layer').value) || 1);
    save();
    render();
  }

  function updateRoom() {
    const wf = parseInt(document.getElementById('room-w-ft').value) || 0;
    const wi = parseInt(document.getElementById('room-w-in').value) || 0;
    const df = parseInt(document.getElementById('room-d-ft').value) || 0;
    const di = parseInt(document.getElementById('room-d-in').value) || 0;
    room.w = Math.max(12, wf * 12 + wi);
    room.h = Math.max(12, df * 12 + di);
    save();
    fitView();
  }

  function fitView() {
    const pad = 60;
    scale = Math.min((canvas.width - pad * 2) / room.w, (canvas.height - pad * 2) / room.h);
    pan.x = room.w / 2;
    pan.y = room.h / 2;
    render();
  }

  // ===== PERSISTENCE =====
  function saveLocal() {
    try { localStorage.setItem('garageLayout', JSON.stringify({ room, objects, nextId })); }
    catch (_) {}
  }

  function save() {
    saveLocal();
    scheduleAutoSave();
  }

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem('garageLayout'));
      if (d) {
        room = d.room || room;
        objects = (d.objects || []).map(o => ({ ...o, layer: o.layer || 1 }));
        nextId = d.nextId || 1;
        document.getElementById('room-w-ft').value = Math.floor(room.w / 12);
        document.getElementById('room-w-in').value = Math.round(room.w % 12);
        document.getElementById('room-d-ft').value = Math.floor(room.h / 12);
        document.getElementById('room-d-in').value = Math.round(room.h % 12);
      }
    } catch (_) {}
  }

  // ===== RESIZE =====
  function resize() {
    const c = document.getElementById('canvas-container');
    canvas.width = c.clientWidth;
    canvas.height = c.clientHeight;
    render();
  }

  // ===== INIT =====
  function init() {
    const tabs = document.getElementById('catalog-tabs');
    for (const cat of CATALOG) {
      const btn = document.createElement('button');
      btn.className = 'tab-btn';
      btn.dataset.cat = cat.id;
      btn.textContent = cat.category;
      btn.addEventListener('click', () => populateCatalog(cat.id));
      tabs.appendChild(btn);
    }

    load();
    populateCatalog('vehicles');

    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    applyTheme();

    // Changelog modal
    const modal = document.getElementById('modal-overlay');
    document.getElementById('btn-info').addEventListener('click', () => { modal.style.display = 'flex'; });
    document.getElementById('btn-modal-close').addEventListener('click', () => { modal.style.display = 'none'; });
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

    // Auth modal
    setupAuthModal();

    // Logout button
    document.getElementById('btn-logout').addEventListener('click', logout);

    // Admin: add user button
    document.getElementById('btn-admin-add-user').addEventListener('click', async () => {
      const username = document.getElementById('admin-new-username').value.trim();
      const password = document.getElementById('admin-new-password').value;
      if (!username || !password) { alert('Username and password are required'); return; }
      if (password.length < 6) { alert('Password must be at least 6 characters'); return; }
      try {
        await createUser(username, password);
        document.getElementById('admin-new-username').value = '';
        document.getElementById('admin-new-password').value = '';
      } catch (e) { alert('Error: ' + e.message); }
    });

    // Plans buttons
    document.getElementById('btn-save-plan').addEventListener('click', savePlan);
    document.getElementById('btn-save-as-new').addEventListener('click', saveAsNew);

    document.getElementById('btn-update-room').addEventListener('click', updateRoom);
    document.getElementById('btn-rotate').addEventListener('click', rotateSelected);
    document.getElementById('btn-delete').addEventListener('click', deleteSelected);
    document.getElementById('btn-apply-edit').addEventListener('click', applyEdit);

    document.getElementById('btn-zoom-in').addEventListener('click', () => {
      scale = Math.min(20, scale * 1.25); render();
    });
    document.getElementById('btn-zoom-out').addEventListener('click', () => {
      scale = Math.max(0.5, scale / 1.25); render();
    });
    document.getElementById('btn-fit').addEventListener('click', fitView);
    document.getElementById('btn-export').addEventListener('click', exportPNG);

    document.getElementById('chk-snap').addEventListener('change', e => { snapEnabled = e.target.checked; });
    document.getElementById('chk-labels').addEventListener('change', e => { showLabels = e.target.checked; render(); });

    // Layer input — apply immediately on change
    document.getElementById('edit-layer').addEventListener('input', () => {
      const obj = objects.find(o => o.id === selected);
      if (!obj) return;
      obj.layer = Math.max(1, parseInt(document.getElementById('edit-layer').value) || 1);
      save();
      render();
    });

    document.getElementById('btn-add-custom').addEventListener('click', () => {
      const name = document.getElementById('custom-name').value.trim() || 'Custom Object';
      const w = (parseInt(document.getElementById('custom-w-ft').value) || 0) * 12
              + (parseInt(document.getElementById('custom-w-in').value) || 0);
      const d = (parseInt(document.getElementById('custom-d-ft').value) || 0) * 12
              + (parseInt(document.getElementById('custom-d-in').value) || 0);
      if (w <= 0 || d <= 0) return;
      const color = document.getElementById('custom-color').value;
      addObject({ name, w, h: d, color });
    });

    document.getElementById('btn-clear').addEventListener('click', () => {
      if (confirm('Remove all objects from the floor plan?')) {
        objects = [];
        selected = null;
        nextId = 1;
        updateSelected();
        save();
        render();
      }
    });

    window.addEventListener('resize', resize);
    resize();
    fitView();

    // Restore auth session
    checkAuth();
  }

  init();
})();
