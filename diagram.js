// ===== DIAGRAM BUILDER LOGIC =====

let currentDTool = 'select';
let dColor = '#0f172a';
let dStrokeWidth = 1.5;
let diagramShapes = [];
let dSelectedShapeIndex = -1;

// Drawing state
let dIsDrawing = false;
let dStartX = 0;
let dStartY = 0;
let dCurrentShapeIndex = -1;

const diagramCanvas = document.getElementById('diagramCanvas');

// ===== UI CONTROLS =====
function setDiagramTool(tool) {
  currentDTool = tool;
  document.querySelectorAll('.dtool-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('dtool-' + tool).classList.add('active');
  
  if (tool === 'select') {
    diagramCanvas.style.cursor = 'default';
  } else if (tool === 'text') {
    diagramCanvas.style.cursor = 'text';
    dSelectedShapeIndex = -1;
  } else {
    diagramCanvas.style.cursor = 'crosshair';
    dSelectedShapeIndex = -1;
  }
  renderDiagram(); // redraw handles
}

function setDiagramColor(hex) {
  dColor = hex;
  document.getElementById('diagramColor').value = hex;
  if (dSelectedShapeIndex !== -1 && currentDTool === 'select') {
    diagramShapes[dSelectedShapeIndex].color = hex;
    renderDiagram();
  }
}

function updateSelectedDiagramWidth(val) {
  dStrokeWidth = parseFloat(val);
  document.getElementById('diagramStrokeWidthVal').textContent = val + 'px';
  if (dSelectedShapeIndex !== -1 && currentDTool === 'select' && diagramShapes[dSelectedShapeIndex].type !== 'text') {
    diagramShapes[dSelectedShapeIndex].strokeWidth = dStrokeWidth;
    renderDiagram();
  }
}

function clearDiagram() {
  if (confirm('Clear the entire diagram?')) {
    diagramShapes = [];
    dSelectedShapeIndex = -1;
    renderDiagram();
  }
}

function showDiagramModal() {
  diagramShapes = [];
  dSelectedShapeIndex = -1;
  setDiagramTool('line');
  document.getElementById('diagramModal').style.display = 'flex';
  renderDiagram();
}

function getSvgCoords(e) {
  const pt = diagramCanvas.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const svgP = pt.matrixTransform(diagramCanvas.getScreenCTM().inverse());
  return { x: svgP.x, y: svgP.y };
}

// ===== MOUSE EVENTS =====
diagramCanvas.addEventListener('mousedown', function(e) {
  const c = getSvgCoords(e);
  
  if (currentDTool === 'select') {
    // Check if clicked exactly on a shape logic
    // We handle selection inside the render loop by attaching click events to SVG elements.
    // If mousedown reaches the bg and select is active, deselect all.
    if (e.target === diagramCanvas) {
      dSelectedShapeIndex = -1;
      renderDiagram();
    }
  } else if (currentDTool === 'text') {
    const txt = prompt('Enter text label:');
    if (txt) {
      diagramShapes.push({
        type: 'text',
        x: c.x, y: c.y,
        text: txt,
        color: dColor,
        fontSize: '12px'
      });
      setDiagramTool('select');
      dSelectedShapeIndex = diagramShapes.length - 1;
      renderDiagram();
    }
  } else {
    dIsDrawing = true;
    dStartX = c.x;
    dStartY = c.y;
    
    // Create new shape
    const newShape = {
      type: currentDTool,
      color: dColor,
      strokeWidth: dStrokeWidth,
      x1: c.x, y1: c.y, x2: c.x, y2: c.y
    };
    diagramShapes.push(newShape);
    dCurrentShapeIndex = diagramShapes.length - 1;
    dSelectedShapeIndex = dCurrentShapeIndex;
  }
});

diagramCanvas.addEventListener('mousemove', function(e) {
  if (!dIsDrawing || currentDTool === 'select' || currentDTool === 'text') return;
  const c = getSvgCoords(e);
  diagramShapes[dCurrentShapeIndex].x2 = c.x;
  diagramShapes[dCurrentShapeIndex].y2 = c.y;
  renderDiagram();
});

diagramCanvas.addEventListener('mouseup', function(e) {
  if (dIsDrawing) {
    dIsDrawing = false;
    // Check if drawing was too small
    const s = diagramShapes[dCurrentShapeIndex];
    if (Math.abs(s.x2 - s.x1) < 2 && Math.abs(s.y2 - s.y1) < 2) {
      diagramShapes.pop();
      dSelectedShapeIndex = -1;
    } else {
      setDiagramTool('select');
    }
    renderDiagram();
  }
});

// Keyboard delete for selected shape
document.addEventListener('keydown', function(e) {
  if (document.getElementById('diagramModal').style.display === 'flex') {
    if ((e.key === 'Backspace' || e.key === 'Delete') && dSelectedShapeIndex !== -1 && currentDTool === 'select') {
      diagramShapes.splice(dSelectedShapeIndex, 1);
      dSelectedShapeIndex = -1;
      renderDiagram();
    }
  }
});

// ===== RENDERING =====
function renderDiagram() {
  // Add defs if they don't exist for arrow heads
  diagramCanvas.innerHTML = `
    <defs>
      <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="${dColor}" />
      </marker>
    </defs>
  `;
  
  diagramShapes.forEach((s, idx) => {
    let el;
    
    if (s.type === 'line' || s.type === 'arrow') {
      el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      el.setAttribute('x1', s.x1);
      el.setAttribute('y1', s.y1);
      el.setAttribute('x2', s.x2);
      el.setAttribute('y2', s.y2);
      el.setAttribute('stroke', s.color);
      el.setAttribute('stroke-width', s.strokeWidth);
      if (s.type === 'arrow') {
        const markerId = 'arrowhead_' + idx;
        // Dynamically create a marker matching the stroke color
        const mkr = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        mkr.setAttribute('id', markerId);
        mkr.setAttribute('markerWidth', '8');
        mkr.setAttribute('markerHeight', '6');
        mkr.setAttribute('refX', '7');
        mkr.setAttribute('refY', '3');
        mkr.setAttribute('orient', 'auto');
        mkr.innerHTML = `<polygon points="0 0, 8 3, 0 6" fill="${s.color}" />`;
        diagramCanvas.querySelector('defs').appendChild(mkr);
        el.setAttribute('marker-end', `url(#${markerId})`);
      }
    } 
    else if (s.type === 'rect') {
      el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      el.setAttribute('x', Math.min(s.x1, s.x2));
      el.setAttribute('y', Math.min(s.y1, s.y2));
      el.setAttribute('width', Math.abs(s.x2 - s.x1));
      el.setAttribute('height', Math.abs(s.y2 - s.y1));
      el.setAttribute('stroke', s.color);
      el.setAttribute('stroke-width', s.strokeWidth);
      el.setAttribute('fill', 'none');
    }
    else if (s.type === 'ellipse') {
      el = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      // Use bounding box logic: x1,y1 to x2,y2
      const cx = (s.x1 + s.x2) / 2;
      const cy = (s.y1 + s.y2) / 2;
      const rx = Math.abs(s.x2 - s.x1) / 2;
      const ry = Math.abs(s.y2 - s.y1) / 2;
      el.setAttribute('cx', cx);
      el.setAttribute('cy', cy);
      el.setAttribute('rx', Math.max(0.1, rx));
      el.setAttribute('ry', Math.max(0.1, ry));
      el.setAttribute('stroke', s.color);
      el.setAttribute('stroke-width', s.strokeWidth);
      el.setAttribute('fill', 'none');
    }
    else if (s.type === 'text') {
      el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      el.setAttribute('x', s.x);
      el.setAttribute('y', s.y);
      el.setAttribute('fill', s.color);
      el.setAttribute('font-size', s.fontSize || '12px');
      el.setAttribute('font-family', 'sans-serif');
      el.textContent = s.text;
    }

    if (el) {
      if (currentDTool === 'select') {
        el.style.cursor = 'pointer';
        el.addEventListener('mousedown', function(e) {
          e.stopPropagation();
          dSelectedShapeIndex = idx;
          setDiagramColor(s.color);
          if (s.strokeWidth) document.getElementById('diagramStrokeWidth').value = s.strokeWidth;
          updateSelectedDiagramWidth(s.strokeWidth || 1.5);
          renderDiagram();
        });
      }
      
      diagramCanvas.appendChild(el);
      
      // Draw selection box if selected
      if (currentDTool === 'select' && dSelectedShapeIndex === idx) {
        const bbox = el.getBBox();
        const selNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        selNode.setAttribute('x', bbox.x - 4);
        selNode.setAttribute('y', bbox.y - 4);
        selNode.setAttribute('width', bbox.width + 8);
        selNode.setAttribute('height', bbox.height + 8);
        selNode.setAttribute('fill', 'none');
        selNode.setAttribute('stroke', '#3b82f6');
        selNode.setAttribute('stroke-dasharray', '4 4');
        diagramCanvas.appendChild(selNode);
      }
    }
  });
}

function insertDiagramIntoEditor() {
  if (diagramShapes.length === 0) {
    closeModal('diagramModal');
    return;
  }
  
  // Clone to clean up
  dSelectedShapeIndex = -1;
  renderDiagram();
  
  // We grab the inner HTML, wrap it in a clean SVG, and insert
  const svgInnerHTML = diagramCanvas.innerHTML;
  
  // Simple bounding box auto-crop calculation
  let minX = 9999, minY = 9999, maxX = -9999, maxY = -9999;
  Array.from(diagramCanvas.children).forEach(child => {
    if (child.tagName !== 'defs') {
      try {
        const bbox = child.getBBox();
        if (bbox.width > 0 || bbox.height > 0) {
          if (bbox.x < minX) minX = bbox.x;
          if (bbox.y < minY) minY = bbox.y;
          if (bbox.x + bbox.width > maxX) maxX = bbox.x + bbox.width;
          if (bbox.y + bbox.height > maxY) maxY = bbox.y + bbox.height;
        }
      } catch (e) {} // text nodes might throw before attaching
    }
  });
  
  // Add padding
  minX = Math.max(0, minX - 10);
  minY = Math.max(0, minY - 10);
  maxX += 10; maxY += 10;
  
  const w = Math.max(20, maxX - minX);
  const h = Math.max(20, maxY - minY);
  
  const outputHTML = `<svg width="${w}" height="${h}" viewBox="${minX} ${minY} ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:4px auto;">${svgInnerHTML}</svg>`;

  // Insert into active editor
  closeModal('diagramModal');
  
  // If wysiwyg is active, execute command
  if (document.getElementById('addSectionModal').style.display === 'flex' && currentModalTab === 'wys') {
    document.getElementById('newSectionRich').focus();
    document.execCommand('insertHTML', false, outputHTML);
  } else {
    // If we're hitting it from main screen (not inside modal), wait, the user shouldn't be able to unless they are in WYSIWYG
    document.execCommand('insertHTML', false, outputHTML);
  }
}
