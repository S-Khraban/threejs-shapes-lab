export function bindUI({
  textureController,
  lightController,
  cameraZoom,
  onShapeChange,
  onAppearanceChange,
  onTextureChange,
}) {
  const shapeSelect = document.getElementById('shapeSelect');
  const appearanceSelect = document.getElementById('appearanceSelect');
  const textureSelect = document.getElementById('textureSelect');

  const lightModeSelect = document.getElementById('lightModeSelect');
  const lightIntensity = document.getElementById('lightIntensity');
  const lightColor = document.getElementById('lightColor');
  const lightHandle = document.getElementById('lightHandle');

  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');

  if (shapeSelect) {
    shapeSelect.addEventListener('change', (e) => onShapeChange?.(e.target.value));
  }

  if (appearanceSelect) {
    appearanceSelect.addEventListener('change', (e) => {
      const [materialType, color] = e.target.value.split('|');
      onAppearanceChange?.(materialType, color);
    });
  }

  if (textureSelect) {
    textureSelect.addEventListener('change', async (e) => {
      await onTextureChange?.(e.target.value);
    });
  }

  function setHandleEmoji() {
    if (!lightHandle) return;
    lightHandle.textContent = lightController.getMode() === 'none' ? '🌙' : '🔆';
    lightHandle.style.opacity = lightController.getMode() === 'none' ? '0.6' : '1';
  }

  if (lightModeSelect) {
    lightModeSelect.addEventListener('change', (e) => {
      lightController.setMode(e.target.value);
      setHandleEmoji();
    });
  }

  if (lightIntensity) {
    lightIntensity.addEventListener('input', () => {
      lightController.setParams({ intensity: Number(lightIntensity.value) });
    });
  }

  if (lightColor) {
    lightColor.addEventListener('input', () => {
      lightController.setParams({ color: lightColor.value });
    });
  }

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      cameraZoom?.zoomIn?.();
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      cameraZoom?.zoomOut?.();
    });
  }

  let dragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  if (lightHandle) {
    setHandleEmoji();

    lightHandle.addEventListener('pointerdown', (e) => {
      if (lightController.getMode() === 'none') return;

      dragging = true;
      lightHandle.setPointerCapture(e.pointerId);

      const rect = lightHandle.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;
    });

    lightHandle.addEventListener('pointermove', (e) => {
      if (!dragging) return;

      const w = lightHandle.offsetWidth;
      const h = lightHandle.offsetHeight;

      const left = clamp(e.clientX - dragOffsetX, 0, window.innerWidth - w);
      const top = clamp(e.clientY - dragOffsetY, 0, window.innerHeight - h);

      lightHandle.style.left = `${left}px`;
      lightHandle.style.top = `${top}px`;
      lightHandle.style.right = 'auto';

      lightController.setFromScreenPoint({ x: left + w / 2, y: top + h / 2 });
    });

    lightHandle.addEventListener('pointerup', () => {
      dragging = false;
    });

    lightHandle.addEventListener('pointercancel', () => {
      dragging = false;
    });

    window.addEventListener('resize', () => {
      const rect = lightHandle.getBoundingClientRect();
      lightController.setFromScreenPoint({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    });
  }

  return { textureController, lightController, cameraZoom };
}
