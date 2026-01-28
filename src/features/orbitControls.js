import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createOrbitControls({ camera, renderer }) {
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  controls.enablePan = false;

  controls.enableZoom = true;
  controls.zoomSpeed = 0.6;

  // обмежимо вертикаль приблизно ±45° від горизонту
  // (у OrbitControls це "polar angle": 0 = зверху, PI/2 = горизонт)
  const half = Math.PI / 4;
  controls.minPolarAngle = Math.PI / 2 - half;
  controls.maxPolarAngle = Math.PI / 2 + half;

  // обмежимо горизонт: 90° загалом
  controls.minAzimuthAngle = -Math.PI / 4;
  controls.maxAzimuthAngle = Math.PI / 4;

  return controls;
}
