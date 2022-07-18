import {navigate} from './RootNavigation';
const ToTakePic = (callBack: Function) => {
  navigate('CameraPage', {
    callBack: callBack,
  });
};

export default ToTakePic;
