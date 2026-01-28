import './style.css';

import { initScene } from './core/initScene.js';
import { createMaterial } from './features/materials.js';
import { createMesh } from './features/shapes.js';
import { createTextureController } from './features/textures.js';
import { createLightController } from './features/lightController.js';
import { createOrbitControls } from './features/orbitControls.js';
import { createCameraZoom } from './features/cameraZoom.js';
import { bindUI } from './ui/bindUI.js';

const { scene, camera, renderer } = initScene();

const textureController = createTextureController();
const lightController = createLightController({ scene });

const controls = createOrbitControls({ camera, renderer });
const cameraZoom = createCameraZoom({ camera, minZoom: 1, maxZoom: 2, step: 0.1 });

renderer.domElement.addEventListener(
  'wheel',
  (e) => {
    e.preventDefault();
    const dir = Math.sign(e.deltaY);
    cameraZoom.setZoom(camera.zoom + (dir > 0 ? -0.1 : 0.1));
  },
  { passive: false }
);

let state = {
  shape: 'box',
  materialType: 'standard',
  color: '#44aa88',
};

let material = createMaterial(
  state.materialType,
  state.color,
  textureController.getTexture()
);
let mesh = createMesh(state.shape, material);
scene.add(mesh);

function setMesh(nextMesh) {
  scene.remove(mesh);
  mesh.geometry.dispose();
  mesh.material.dispose();
  mesh = nextMesh;
  scene.add(mesh);
}

function setMaterial(nextMaterial) {
  mesh.material.dispose();
  mesh.material = nextMaterial;
  material = nextMaterial;
}

bindUI({
  textureController,
  lightController,
  cameraZoom,

  onShapeChange: (shape) => {
    state.shape = shape;
    const nextMesh = createMesh(state.shape, material);
    nextMesh.position.copy(mesh.position);
    setMesh(nextMesh);
  },

  onAppearanceChange: (materialType, color) => {
    state.materialType = materialType;
    state.color = color;
    const nextMaterial = createMaterial(
      state.materialType,
      state.color,
      textureController.getTexture()
    );
    setMaterial(nextMaterial);
  },

  onTextureChange: async (url) => {
    await textureController.setTexture(url);
    mesh.material.map = textureController.getTexture();
    mesh.material.needsUpdate = true;
  },
});

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();
