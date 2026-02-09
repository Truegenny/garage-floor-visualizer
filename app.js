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

  function eff(obj) {
    return obj.rotation % 180 === 0
      ? { w: obj.w, h: obj.h }
      : { w: obj.h, h: obj.w };
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
  async function login(email, password) {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (!data) throw new Error('Login failed');
    authToken = data.token;
    currentUser = data.user;
    localStorage.setItem('authToken', authToken);
    onAuthChange();
    return data;
  }

  async function register(email, password) {
    const data = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (!data) throw new Error('Registration failed');
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
      objects = d.objects || [];
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

  // ===== UI: AUTH STATE CHANGE =====
  function onAuthChange() {
    const userBar = document.getElementById('user-bar');
    const loginBar = document.getElementById('login-bar');
    const plansPanel = document.getElementById('plans-panel');

    if (currentUser) {
      userBar.style.display = 'flex';
      loginBar.style.display = 'none';
      plansPanel.style.display = 'block';
      document.getElementById('user-email').textContent = currentUser.email;
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
    const title = document.getElementById('auth-modal-title');
    const submitBtn = document.getElementById('btn-auth-submit');
    const toggleText = document.getElementById('auth-toggle-text');
    const toggleLink = document.getElementById('auth-toggle-link');
    const errorEl = document.getElementById('auth-error');
    let isLogin = true;

    function setMode(loginMode) {
      isLogin = loginMode;
      title.textContent = isLogin ? 'Login' : 'Register';
      submitBtn.textContent = isLogin ? 'Login' : 'Register';
      toggleText.textContent = isLogin ? "Don't have an account?" : 'Already have an account?';
      toggleLink.textContent = isLogin ? 'Register' : 'Login';
      errorEl.style.display = 'none';
    }

    document.getElementById('btn-show-auth').addEventListener('click', () => {
      setMode(true);
      form.reset();
      modal.style.display = 'flex';
    });

    document.getElementById('btn-auth-close').addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });

    toggleLink.addEventListener('click', (e) => {
      e.preventDefault();
      setMode(!isLogin);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-email').value.trim();
      const password = document.getElementById('auth-password').value;
      errorEl.style.display = 'none';
      submitBtn.disabled = true;
      try {
        if (isLogin) {
          await login(email, password);
        } else {
          await register(email, password);
        }
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
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, W, H);

    // Room floor
    const rx = w2cx(0), ry = w2cy(0);
    const rw = room.w * scale, rh = room.h * scale;
    ctx.fillStyle = '#e8e4df';
    ctx.fillRect(rx, ry, rw, rh);

    // Grid
    ctx.strokeStyle = '#d0ccc7';
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
    ctx.strokeStyle = '#555';
    ctx.lineWidth = wallPx;
    ctx.strokeRect(rx, ry, rw, rh);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(rx + wallPx / 2, ry + wallPx / 2, rw - wallPx, rh - wallPx);

    // Room dimensions
    const dimOffset = wallPx / 2 + 14;
    ctx.fillStyle = '#ccc';
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
    ctx.strokeStyle = '#999';
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

    // Objects
    for (const obj of objects) drawObject(obj);

    // Selection highlight
    if (selected) {
      const obj = objects.find(o => o.id === selected);
      if (obj) {
        const d = eff(obj);
        const ox = w2cx(obj.x) - 3, oy = w2cy(obj.y) - 3;
        const ow = d.w * scale + 6, oh = d.h * scale + 6;
        rrect(ox, oy, ow, oh, 6);
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  }

  // ===== OBJECT DRAWING =====
  function drawObject(obj) {
    const d = eff(obj);
    const ox = w2cx(obj.x), oy = w2cy(obj.y);
    const ow = d.w * scale, oh = d.h * scale;
    const r = Math.min(4 * scale / 3, ow * 0.06, oh * 0.06);

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
      const tcx = ox + ow / 2;
      ctx.beginPath();
      ctx.moveTo(tcx - tri, oy + tri * 2.5);
      ctx.lineTo(tcx + tri, oy + tri * 2.5);
      ctx.lineTo(tcx, oy + 3);
      ctx.fill();
    }

    // Labels
    if (showLabels && scale > 1) {
      let fs = Math.min(13, ow / (obj.name.length * 0.55));
      fs = Math.max(8, fs);
      if (fs < 6) return;
      const tcx = ox + ow / 2, tcy = oy + oh / 2;

      // Text shadow for readability
      ctx.font = `600 ${fs}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fillText(obj.name, tcx + 0.5, tcy - fs * 0.5 + 0.5, ow - 8);
      ctx.fillStyle = '#000';
      ctx.fillText(obj.name, tcx, tcy - fs * 0.5, ow - 8);

      const dimTxt = `${fmt(obj.w)} x ${fmt(obj.h)}`;
      ctx.font = `${Math.max(7, fs - 2)}px sans-serif`;
      ctx.fillStyle = '#444';
      ctx.fillText(dimTxt, tcx, tcy + fs * 0.6, ow - 8);
    }
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
    const d = eff(obj);
    const cxBefore = obj.x + d.w / 2;
    const cyBefore = obj.y + d.h / 2;
    obj.rotation = (obj.rotation + 90) % 360;
    const d2 = eff(obj);
    obj.x = snap(cxBefore - d2.w / 2);
    obj.y = snap(cyBefore - d2.h / 2);
    updateSelected();
    save();
    render();
  }

  // ===== HIT TEST =====
  function hitTest(wx, wy) {
    for (let i = objects.length - 1; i >= 0; i--) {
      const o = objects[i], d = eff(o);
      if (wx >= o.x && wx <= o.x + d.w && wy >= o.y && wy <= o.y + d.h) return o;
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
      const obj = hitTest(wx, wy);
      if (obj) {
        selected = obj.id;
        dragging = { type: 'obj', id: obj.id, sx: wx, sy: wy, ox: obj.x, oy: obj.y };
        const idx = objects.indexOf(obj);
        objects.splice(idx, 1);
        objects.push(obj);
      } else {
        selected = null;
        dragging = { type: 'pan', scx: p.cx, scy: p.cy, opx: pan.x, opy: pan.y };
      }
      updateSelected();
      render();
    }
  });

  canvas.addEventListener('mousemove', e => {
    if (!dragging) return;
    const p = mpos(e);

    if (dragging.type === 'obj') {
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
    if (dragging?.type === 'obj') save();
    dragging = null;
  });

  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    const p = mpos(e);
    const wx = c2wx(p.cx), wy = c2wy(p.cy);
    const f = e.deltaY > 0 ? 0.9 : 1.1;
    scale = Math.max(0.3, Math.min(25, scale * f));
    pan.x = wx - (p.cx - canvas.width / 2) / scale;
    pan.y = wy - (p.cy - canvas.height / 2) / scale;
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
      btn.innerHTML = `<span class="item-color" style="background:${item.color}"></span>
        <span class="item-info"><span class="item-name">${item.name}</span>
        <span class="item-dims">${fmt(item.w)} x ${fmt(item.h)}</span></span>`;
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
    document.getElementById('sel-rotation').textContent = `Rotated ${obj.rotation}\u00b0`;
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
        objects = d.objects || [];
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

    // Changelog modal
    const modal = document.getElementById('modal-overlay');
    document.getElementById('btn-info').addEventListener('click', () => { modal.style.display = 'flex'; });
    document.getElementById('btn-modal-close').addEventListener('click', () => { modal.style.display = 'none'; });
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

    // Auth modal
    setupAuthModal();

    // Logout button
    document.getElementById('btn-logout').addEventListener('click', logout);

    // Plans buttons
    document.getElementById('btn-save-plan').addEventListener('click', savePlan);
    document.getElementById('btn-save-as-new').addEventListener('click', saveAsNew);

    document.getElementById('btn-update-room').addEventListener('click', updateRoom);
    document.getElementById('btn-rotate').addEventListener('click', rotateSelected);
    document.getElementById('btn-delete').addEventListener('click', deleteSelected);
    document.getElementById('btn-apply-edit').addEventListener('click', applyEdit);

    document.getElementById('btn-zoom-in').addEventListener('click', () => {
      scale = Math.min(25, scale * 1.25); render();
    });
    document.getElementById('btn-zoom-out').addEventListener('click', () => {
      scale = Math.max(0.3, scale / 1.25); render();
    });
    document.getElementById('btn-fit').addEventListener('click', fitView);
    document.getElementById('btn-export').addEventListener('click', exportPNG);

    document.getElementById('chk-snap').addEventListener('change', e => { snapEnabled = e.target.checked; });
    document.getElementById('chk-labels').addEventListener('change', e => { showLabels = e.target.checked; render(); });

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
