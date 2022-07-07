import {MapView, MapType, Marker} from 'react-native-amap3d';
import React from 'react';
import {OrderDetailProps} from '../../../interfaces/OrderDetailProps';
import {Image, StyleSheet} from 'react-native';

interface RiderMapViewProps {
  orderDetail: OrderDetailProps;
}

interface IState {
  showMark: boolean;
}
class RiderMapView extends React.Component<RiderMapViewProps, IState> {
  mapRef?: MapView | null;
  constructor(props: RiderMapViewProps) {
    super(props);
    this.state = {
      showMark: false,
    };
  }
  componentDidMount() {}
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
