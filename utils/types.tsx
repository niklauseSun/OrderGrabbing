export interface PathMapTypes {
  origin: LatLng;
  destination: LatLng;
}

export interface LatLng {
  longitude: number;
  latitude: number;
}

export interface WatchLocation {
  location: LatLng
}