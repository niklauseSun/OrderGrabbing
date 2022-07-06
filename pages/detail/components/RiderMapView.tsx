import {MapView, MapType} from 'react-native-amap3d';
import React from 'react';

const RiderMapView = () => {
  return (
    <MapView
      mapType={MapType.Satellite}
      initialCameraPosition={{
        target: {
          latitude: 39.91095,
          longitude: 116.37296,
        },
        zoom: 8,
      }}
    />
  );
};

export default RiderMapView;
