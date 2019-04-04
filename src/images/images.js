
function importAll(r) {
  let images = {};
  r.keys().map( item => {
    let almost = item.substring( item.indexOf("-")+1 ).replace('./', '')
    images[almost.substring(0, almost.indexOf('.'))] = r(item)
    return null
  })
  return images;
}

const portraits = importAll(require.context('./Characters', false, /\.(png|jpe?g|svg)$/));
const faces = importAll(require.context('./faces', false, /\.(png|jpe?g|svg)$/));

const Images = {
  Portraits: portraits,
  Faces: faces
}
export default Images
