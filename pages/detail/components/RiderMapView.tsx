import {MapView, MapType, Marker, Polyline} from 'react-native-amap3d';
import React from 'react';
import {OrderDetailProps} from '../../../interfaces/OrderDetailProps';
import {Image, StyleSheet} from 'react-native';
import getMapPath from '../../../api/amap';
import {LatLng, PathMapTypes} from '../../../utils/types';
// import IdUtils from '../../../utils/IdUtils';

interface RiderMapViewProps {
  orderDetail: OrderDetailProps;
}

interface IState {
  showMark: boolean;
  locations: Array<T>;
}
class RiderMapView extends React.Component<RiderMapViewProps, IState> {
  mapRef?: MapView | null;
  constructor(props: RiderMapViewProps) {
    super(props);
    this.state = {
      showMark: false,
      locations: [],
    };
  }
  componentDidMount() {
    this.fetchPath();
  }

  fetchPath() {
    // IdUtils.toGetLocation().then(res => {
    //   console.log('res location', res);
    // });
    const {orderDetail} = this.props;
    const {receiveMessage, sendMessage} = orderDetail;

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

    getMapPath(pathMap).then(res => {
      console.log('res', res);

      const paths: Array<T> = res.paths;

      let locations = [];
      for (let i = 0; i < paths.length; i++) {
        let steps = paths[i].steps;
        for (let j = 0; j < steps.length; j++) {
          let polyline = steps[j];

          let polylineArray = polyline.split(';');
          let polypoints = [];
          for (let poly in polylineArray) {
            let polyArray = poly.split(',');
            polypoints.push({
              latitude: polyArray[0],
              longitude: polyArray[1],
            });
          }

          locations.push(
            <Polyline
              width={5}
              color="rgba(255, 0, 0, 0.5)"
              points={polypoints}
            />,
          );
        }
      }

      this.setState({
        locations: locations,
      });
    });
  }

  render() {
    console.log('this', this.props);
    const {orderDetail} = this.props;
    const {receiveMessage, sendMessage} = orderDetail;
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
        {...this.state.locations}
        trafficEnabled={true}
        zoomGesturesEnabled={true}
        scrollGesturesEnabled={true}>
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
