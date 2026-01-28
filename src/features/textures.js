import * as THREE from 'three';

export function createTextureController() {
  const loader = new THREE.TextureLoader();
  let currentTexture = null;

  async function setTexture(url) {
    if (!url) {
      if (currentTexture) currentTexture.dispose();
      currentTexture = null;
      return;
    }

    await new Promise((resolve, reject) => {
      loader.load(
        url,
        (tex) => {
          if (currentTexture) currentTexture.dispose();

          tex.colorSpace = THREE.SRGBColorSpace;
          tex.wrapS = THREE.RepeatWrapping;
          tex.wrapT = THREE.RepeatWrapping;
          tex.repeat.set(1, 1);

          currentTexture = tex;
          resolve();
        },
        undefined,
        reject
      );
    });
  }

  function getTexture() {
    return currentTexture;
  }

  return { setTexture, getTexture };
}
