import * as THREE from 'three';

export function createMaterial(type, color, texture) {
  const common = { color: new THREE.Color(color) };

  let mat;
  switch (type) {
    case 'phong':
      mat = new THREE.MeshPhongMaterial({ ...common, shininess: 80 });
      break;
    case 'lambert':
      mat = new THREE.MeshLambertMaterial(common);
      break;
    case 'basic':
      mat = new THREE.MeshBasicMaterial(common);
      break;
    case 'standard':
    default:
      mat = new THREE.MeshStandardMaterial({
        ...common,
        roughness: 0.4,
        metalness: 0.2,
      });
  }

  mat.map = texture || null;
  mat.needsUpdate = true;
  return mat;
}
