import * as THREE from 'three';

export function createMesh(type, material) {
  let geometry;

  switch (type) {
    case 'sphere':
      geometry = new THREE.SphereGeometry(0.8, 32, 32);
      break;
    case 'cone':
      geometry = new THREE.ConeGeometry(0.8, 1.5, 32);
      break;
    case 'cylinder':
      geometry = new THREE.CylinderGeometry(0.6, 0.6, 1.5, 32);
      break;
    case 'box':
    default:
      geometry = new THREE.BoxGeometry(1, 1, 1);
  }

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
  const wireframe = new THREE.LineSegments(edges, lineMaterial);
  mesh.add(wireframe);

  return mesh;
}
