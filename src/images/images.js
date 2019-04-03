
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => images[item.substring( item.indexOf("-")+1 )] = r(item) )
  return images;
}

const portraits = importAll(require.context('./Characters', false, /\.(png|jpe?g|svg)$/));
const faces = importAll(require.context('./faces', false, /\.(png|jpe?g|svg)$/));

const Images = {
  Portraits: portraits,
  Faces: faces
}
export default Images
