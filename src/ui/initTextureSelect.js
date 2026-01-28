import { TEXTURES } from '../constants/textures.js';

export function initTextureSelect() {
  const textureSelect = document.querySelector('#textureSelect');
  if (!textureSelect) return;

  textureSelect.innerHTML = TEXTURES
    .map(({ label, value }) => `<option value="${value}">${label}</option>`)
    .join('');
}
