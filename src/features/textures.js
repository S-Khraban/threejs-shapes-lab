import * as THREE from 'three';

export function createTextureController() {
  const loader = new THREE.TextureLoader();
  let currentTexture = null;

  async function setTexture(url) {
    // clear texture
    if (!url) {
      if (currentTexture) {
        currentTexture.dispose();
        currentTexture = null;
      }
      return null;
    }

    try {
      const tex = await loader.loadAsync(url);

      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(1, 1);

      if (currentTexture) currentTexture.dispose();
      currentTexture = tex;

      return tex;
    } catch (err) {
      console.error('[Texture] Failed to load:', url, err);
      return null;
    }
  }

  function getTexture() {
    return currentTexture;
  }

  return { setTexture, getTexture };
}
