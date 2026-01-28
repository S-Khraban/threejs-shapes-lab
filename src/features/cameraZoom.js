export function createCameraZoom({ camera, minZoom = 1, maxZoom = 2, step = 0.1 }) {
  camera.zoom = minZoom;
  camera.updateProjectionMatrix();

  function clamp(v) {
    return Math.max(minZoom, Math.min(maxZoom, v));
  }

  function setZoom(z) {
    camera.zoom = clamp(z);
    camera.updateProjectionMatrix();
  }

  function zoomIn() {
    setZoom(camera.zoom + step);
  }

  function zoomOut() {
    setZoom(camera.zoom - step);
  }

  return { setZoom, zoomIn, zoomOut, minZoom, maxZoom };
}
