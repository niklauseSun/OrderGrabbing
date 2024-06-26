import {MapView, MapType, Marker, Polyline} from 'react-native-amap3d';
import React from 'react';
import {OrderDetailProps} from '../../../interfaces/OrderDetailProps';
import {Image, Platform, StyleSheet} from 'react-native';
import getMapPath from '../../../api/amap';
import {LatLng, PathMapTypes} from '../../../utils/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RiderMapViewProps {
  orderDetail: OrderDetailProps;
}

interface IState {
  showMark: boolean;
  locations: Array<PointType>;
  riderLocations: Array<PointType>;
}

interface PointType {
  points: LatLng[];
}

interface PathProps {
  steps: StepsProps[];
}

interface StepsProps {
  polyline: string;
}

class RiderMapView extends React.Component<RiderMapViewProps, IState> {
  mapRef?: MapView | null;
  constructor(props: RiderMapViewProps) {
    super(props);
    this.state = {
      showMark: false,
      locations: [],
      riderLocations: [],
    };
  }
  componentDidMount() {
    console.log('detail', this.props.orderDetail);
    this.fetchPath();
    // IdUtils.watchLocation(res => {
    //   console.log('res', res);
    // });
  }

  fetchPath() {
    AsyncStorage.getItem('currentLocation').then(res => {
      let location: LatLng = JSON.parse(res as string);

      // const {location} = res as unknown as Position;
      const {latitude, longitude} = location as LatLng;

      if (!latitude) {
        return;
      }

      const {orderDetail} = this.props;
      const {receiveMessage, sendMessage} = orderDetail;

      const begin: LatLng = {
        latitude: Number(latitude),
        longitude: Number(longitude),
      };

      const wayPoints: LatLng = {
        latitude: sendMessage.latitude,
        longitude: sendMessage.longitude,
      };

      const destination: LatLng = {
        latitude: receiveMessage.latitude,
        longitude: receiveMessage.longitude,
      };

      const pathMap: PathMapTypes = {
        origin: begin,
        wayPoints: wayPoints,
        destination: destination,
      };

      // const riderPath: PathMapTypes = {
      //   origin: begin,
      //   destination: origin,
      // };
      // getMapPath(riderPath).then(ret => {
      //   console.log('res', ret);

      //   const paths: Array<PathProps> = ret.data.paths;

      //   let riderLocations: PointType[] = [];

      //   for (let i = 0; i < paths.length; i++) {
      //     let steps = paths[i].steps;
      //     for (let j = 0; j < steps.length; j++) {
      //       let polyline = steps[j].polyline;

      //       let polylineArray = polyline.split(';');
      //       let polypoints: LatLng[] = [];
      //       for (let m = 0; m < polylineArray.length; m++) {
      //         let poly = polylineArray[m];
      //         let polyArray = poly.split(',');
      //         let loA: LatLng = {
      //           longitude: Number(polyArray[0]),
      //           latitude: Number(polyArray[1]),
      //         };
      //         polypoints.push(loA);
      //       }

      //       riderLocations.push({
      //         points: polypoints,
      //       });
      //     }
      //   }

      //   this.setState({
      //     riderLocations: riderLocations,
      //   });
      // });

      getMapPath(pathMap).then(ret => {
        const paths: Array<PathProps> = ret.route.paths;

        let locations: PointType[] = [];
        for (let i = 0; i < paths.length; i++) {
          let steps = paths[i].steps;
          for (let j = 0; j < steps.length; j++) {
            let polyline = steps[j].polyline;

            let polylineArray = polyline.split(';');
            let polypoints: LatLng[] = new Array();
            for (let m = 0; m < polylineArray.length; m++) {
              let poly = polylineArray[m];
              let polyArray = poly.split(',');
              let loA: LatLng = {
                longitude: Number(polyArray[0]),
                latitude: Number(polyArray[1]),
              };
              polypoints.push(loA);
            }
            locations.push({
              points: polypoints,
            });
          }
        }

        this.setState({
          locations: locations,
        });
      });
    });
  }

  render() {
    const {orderDetail} = this.props;
    const {receiveMessage, sendMessage} = orderDetail;
    return (
      <MapView
        mapType={MapType.Navi}
        myLocationEnabled={true}
        labelsEnabled={true}
        ref={ref => (this.mapRef = ref)}
        initialCameraPosition={{
          target: {
            latitude: Number(sendMessage.latitude),
            longitude: Number(sendMessage.longitude),
          },
        }}
        onLoad={() => {
          if (Platform.OS !== 'android') {
            this.mapRef &&
              this.mapRef.moveCamera({
                target: {
                  latitude: Number(sendMessage.latitude),
                  longitude: Number(sendMessage.longitude),
                },
                zoom: 12,
              });
          }

          this.setState({
            showMark: true,
          });
        }}
        trafficEnabled={true}
        zoomGesturesEnabled={true}
        scrollGesturesEnabled={true}>
        {this.state.showMark && (
          <Marker
            position={{
              latitude: Number(sendMessage.latitude),
              longitude: Number(sendMessage.longitude),
            }}>
            <Image
              style={styles.image}
              source={require('./assets/store_icon.png')}
            />
          </Marker>
        )}
        {this.state.showMark && (
          <Marker
            position={{
              latitude: Number(receiveMessage.latitude),
              longitude: Number(receiveMessage.longitude),
            }}>
            <Image
              style={styles.image}
              source={require('./assets/delivery_icon.png')}
            />
          </Marker>
        )}
        {this.state.locations.map((item, index) => {
          return (
            <Polyline
              key={index + '222'}
              width={5}
              color="rgba(120, 120, 255, 1)"
              points={item.points}
            />
          );
        })}
        {this.state.riderLocations.map((item, index) => {
          return (
            <Polyline
              key={index + '111'}
              width={5}
              color="rgba(120, 120, 255, 1)"
              points={item.points}
            />
          );
        })}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
});

export default RiderMapView;
