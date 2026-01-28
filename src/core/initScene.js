import * as THREE from 'three';

export function initScene() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.7, 4);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  const floorMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 1 });
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x1f1f1f, roughness: 1 });

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.2;
  floor.receiveShadow = true;
  scene.add(floor);

  const wall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMat);
  wall.position.z = -6;
  wall.position.y = 1.5;
  wall.receiveShadow = true;
  scene.add(wall);

  const grid = new THREE.GridHelper(20, 20, 0x444444, 0x2b2b2b);
  grid.position.y = -1.19;
  scene.add(grid);

  const ambient = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(ambient);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, camera, renderer };
}
