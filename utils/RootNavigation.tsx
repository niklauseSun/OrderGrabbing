import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function reset(name: string) {
  if (navigationRef.isReady()) {
    navigationRef.reset(name as never);
  }
}
