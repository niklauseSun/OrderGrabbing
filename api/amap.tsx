import {PathMapTypes} from '../utils/types';
const getMapPath = async (pathMap: PathMapTypes) => {
  const {origin, destination} = pathMap;
  let url = `https://restapi.amap.com/v5/direction/bicycling?origin=${origin.longitude},${origin.latitude}&destination=${destination.longitude},${destination.latitude}&key=b408a81c4e7ee2918b4fbd13e11f002a`;

  console.log('url', url);
  let result = await fetch(url);

  return result.json();
};

export default getMapPath;
