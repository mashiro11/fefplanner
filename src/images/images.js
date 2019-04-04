
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
const gifs = importAll(require.context('./gifs', false, /\.gif/ ))
const skills = importAll(require.context('./skills', false, /\.png/))
const weapons = importAll(require.context('./weapons', false, /.png/))

const Images = {
  Portraits: portraits,
  Faces: faces,
  Gifs: gifs,
  Skills: skills,
  Weapons: weapons
}
export default Images
