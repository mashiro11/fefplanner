import React from 'react'
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const portraits = importAll(require.context('./Characters', false, /\.(png|jpe?g|svg)$/));
const faces = importAll(require.context('./faces', false, /\.(png|jpe?g|svg)$/));

const Images = {
  Portraits: portraits,
  Faces: faces
}
export default Images
