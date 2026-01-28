import * as THREE from 'three';

export function createLightController({ scene }) {
  let lightMode = 'directional';
  let light = null;

  const ambient = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(ambient);

  function createLight(mode) {
    if (mode === 'point') {
      const l = new THREE.PointLight(0xffffff, 1);
      l.position.set(5, 5, 5);
      l.castShadow = true;
      l.shadow.mapSize.set(1024, 1024);
      return l;
    }

    const l = new THREE.DirectionalLight(0xffffff, 1);
    l.position.set(5, 5, 5);
    l.castShadow = true;
    l.shadow.mapSize.set(1024, 1024);
    l.shadow.camera.left = -10;
    l.shadow.camera.right = 10;
    l.shadow.camera.top = 10;
    l.shadow.camera.bottom = -10;
    l.target.position.set(0, 0, 0);
    scene.add(l.target);
    return l;
  }

  function attachLight() {
    light = createLight(lightMode);
    scene.add(light);
  }

  function detachLight() {
    if (!light) return;
    scene.remove(light);
    if (light.type === 'DirectionalLight' && light.target) {
      scene.remove(light.target);
    }
    light = null;
  }

  attachLight();

  function setMode(mode) {
    detachLight();
    lightMode = mode;

    if (lightMode === 'none') {
      return;
    }

    attachLight();
  }

  function setParams({ intensity, color }) {
    if (!light || lightMode === 'none') return;
    if (typeof intensity === 'number') light.intensity = intensity;
    if (typeof color === 'string') light.color.set(color);
  }

  function setFromScreenPoint({ x, y }) {
    if (!light || lightMode === 'none') return;

    const nx = (x / window.innerWidth) * 2 - 1;
    const ny = (y / window.innerHeight) * 2 - 1;

    const px = nx * 8;
    const py = -ny * 6;
    const pz = 6;

    light.position.set(px, py, pz);

    if (light.type === 'DirectionalLight' && light.target) {
      light.target.position.set(0, 0, 0);
    }
  }

  function getMode() {
    return lightMode;
  }

  return { setMode, setParams, setFromScreenPoint, getMode };
}
