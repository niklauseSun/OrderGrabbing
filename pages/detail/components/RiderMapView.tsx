import {MapView, MapType, Marker, Polyline} from 'react-native-amap3d';
import React from 'react';
import {OrderDetailProps} from '../../../interfaces/OrderDetailProps';
import {Image, StyleSheet} from 'react-native';
import getMapPath from '../../../api/amap';
import {LatLng, PathMapTypes} from '../../../utils/types';
import IdUtils from '../../../utils/IdUtils';
// import IdUtils from '../../../utils/IdUtils';

interface RiderMapViewProps {
  orderDetail: OrderDetailProps;
}

interface IState {
  showMark: boolean;
  locations: Array<T>;
  riderLocations: Array<T>;
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
    this.fetchPath();
    // IdUtils.watchLocation(res => {
    //   console.log('res', res);
    // });
  }

  fetchPath() {
    IdUtils.toGetLocation().then(res => {
      console.log('res location', res);
      const {location} = res;
      const {latitude, longitude} = location;

      const {orderDetail} = this.props;
      const {receiveMessage, sendMessage} = orderDetail;

      const begin: LatLng = {
        latitude: latitude.toFixed(6),
        longitude: longitude.toFixed(6),
      };

      const origin: LatLng = {
        latitude: sendMessage.latitude,
        longitude: sendMessage.longitude,
      };

      const destination: LatLng = {
        latitude: receiveMessage.latitude,
        longitude: receiveMessage.longitude,
      };

      const pathMap: PathMapTypes = {
        origin: origin,
        destination: destination,
      };

      const riderPath: PathMapTypes = {
        origin: begin,
        destination: origin,
      };
      getMapPath(riderPath).then(res => {
        console.log('res', res);

        const paths: Array<T> = res.data.paths;

        let riderLocations = [];

        for (let i = 0; i < paths.length; i++) {
          let index = 1;
          let steps = paths[i].steps;
          for (let j = 0; j < steps.length; j++) {
            let polyline = steps[j].polyline;

            let polylineArray = polyline.split(';');
            let polypoints = [];
            for (let m = 0; m < polylineArray.length; m++) {
              let poly = polylineArray[m];
              let polyArray = poly.split(',');
              polypoints.push({
                longitude: Number(polyArray[0]),
                latitude: Number(polyArray[1]),
              });
            }

            riderLocations.push({
              points: polypoints,
            });
          }
        }

        this.setState({
          riderLocations: riderLocations,
        });
      });

      getMapPath(pathMap).then(res => {
        console.log('res path', res);

        const paths: Array<T> = res.data.paths;

        let locations = [];
        for (let i = 0; i < paths.length; i++) {
          let steps = paths[i].steps;
          for (let j = 0; j < steps.length; j++) {
            let polyline = steps[j].polyline;

            let polylineArray = polyline.split(';');
            console.log('ff', polylineArray);
            let polypoints = [];
            for (let m = 0; m < polylineArray.length; m++) {
              let poly = polylineArray[m];
              let polyArray = poly.split(',');
              polypoints.push({
                longitude: Number(polyArray[0]),
                latitude: Number(polyArray[1]),
              });
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
    const line2 = [
      {latitude: 39.906901, longitude: 116.097972},
      {latitude: 39.906901, longitude: 116.597972},
    ];
    console.log('this', this.props);
    const {orderDetail} = this.props;
    const {receiveMessage, sendMessage} = orderDetail;
    console.log('dad', this.state.riderLocations);
    return (
      <MapView
        mapType={MapType.Navi}
        myLocationEnabled={true}
        labelsEnabled={true}
        ref={ref => (this.mapRef = ref)}
        onLoad={() => {
          this.mapRef &&
            this.mapRef.moveCamera({
              target: {
                latitude: Number(sendMessage.latitude),
                longitude: Number(sendMessage.longitude),
              },
              zoom: 16,
            });
          this.setState({
            showMark: true,
          });
        }}
        trafficEnabled={true}
        zoomGesturesEnabled={true}
        scrollGesturesEnabled={true}>
        {this.state.locations.map((item, index) => {
          console.log('fff');
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
        <Polyline width={500} points={line2} dotted />
        {this.state.showMark && (
          <Marker
            position={{
              latitude: receiveMessage.latitude,
              longitude: receiveMessage.longitude,
            }}>
            <Image
              style={styles.image}
              source={require('./assets/delivery_icon.png')}
            />
          </Marker>
        )}
        {this.state.showMark && (
          <Marker
            position={{
              latitude: sendMessage.latitude,
              longitude: sendMessage.longitude,
            }}>
            <Image
              style={styles.image}
              source={require('./assets/store_icon.png')}
            />
          </Marker>
        )}
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
