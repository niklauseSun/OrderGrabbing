import {navigate} from './RootNavigation';

const ToDetail = (id: string) => {
  navigate('Detail', {id: id});
};

export default ToDetail;
