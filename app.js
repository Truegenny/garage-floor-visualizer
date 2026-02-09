(() => {
  'use strict';

  // ===== OBJECT CATALOG (dimensions in inches) =====
  const CATALOG = [
    {
      category: 'Vehicles',
      id: 'vehicles',
      items: [
        { name: '2021 Honda Passport',  w: 78.6, h: 190.5, color: '#3b82f6' },
        { name: '2023 KTM Duke 890 R',  w: 32.7, h: 82.5,  color: '#ef4444' },
        { name: '2021 Honda Grom',       w: 28.3, h: 69.1,  color: '#f97316' },
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

    // Room walls
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.strokeRect(rx, ry, rw, rh);

    // Room dimensions
    ctx.fillStyle = '#ccc';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(fmt(room.w), rx + rw / 2, ry - 6);
    ctx.save();
    ctx.translate(rx - 8, ry + rh / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textBaseline = 'bottom';
    ctx.fillText(fmt(room.h), 0, 0);
    ctx.restore();

    // Objects
    for (const obj of objects) {
      const d = eff(obj);
      const ox = w2cx(obj.x), oy = w2cy(obj.y);
      const ow = d.w * scale, oh = d.h * scale;

      ctx.fillStyle = obj.color + 'bb';
      ctx.fillRect(ox, oy, ow, oh);
      ctx.strokeStyle = obj.color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(ox, oy, ow, oh);

      // Direction indicator (small triangle at "front" / top)
      ctx.fillStyle = obj.color;
      const triSize = Math.min(6, ow * 0.15, oh * 0.15);
      const triCx = ox + ow / 2;
      ctx.beginPath();
      ctx.moveTo(triCx - triSize, oy + triSize * 2);
      ctx.lineTo(triCx + triSize, oy + triSize * 2);
      ctx.lineTo(triCx, oy + 2);
      ctx.fill();

      if (showLabels && scale > 1) {
        const maxFont = 13, minFont = 8;
        let fs = Math.min(maxFont, ow / (obj.name.length * 0.55));
        fs = Math.max(minFont, fs);
        if (fs * scale < 6) continue;

        const tcx = ox + ow / 2, tcy = oy + oh / 2;

        ctx.font = `600 ${fs}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000';
        ctx.fillText(obj.name, tcx, tcy - fs * 0.55, ow - 6);

        const dimTxt = `${fmt(obj.w)} x ${fmt(obj.h)}`;
        ctx.font = `${Math.max(7, fs - 2)}px sans-serif`;
        ctx.fillStyle = '#444';
        ctx.fillText(dimTxt, tcx, tcy + fs * 0.55, ow - 6);
      }
    }

    // Selection highlight
    if (selected) {
      const obj = objects.find(o => o.id === selected);
      if (obj) {
        const d = eff(obj);
        const ox = w2cx(obj.x) - 2, oy = w2cy(obj.y) - 2;
        const ow = d.w * scale + 4, oh = d.h * scale + 4;
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 3]);
        ctx.strokeRect(ox, oy, ow, oh);
        ctx.setLineDash([]);
      }
    }
  }

  // ===== OBJECT MANAGEMENT =====
  function addObject(tmpl) {
    const obj = {
      id: nextId++,
      name: tmpl.name,
      w: tmpl.w,
      h: tmpl.h,
      color: tmpl.color,
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
  function save() {
    try { localStorage.setItem('garageLayout', JSON.stringify({ room, objects, nextId })); }
    catch (_) {}
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

    const modal = document.getElementById('modal-overlay');
    document.getElementById('btn-info').addEventListener('click', () => { modal.style.display = 'flex'; });
    document.getElementById('btn-modal-close').addEventListener('click', () => { modal.style.display = 'none'; });
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

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
  }

  init();
})();
