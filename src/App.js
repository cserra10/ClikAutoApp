import React from 'react';
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider, focusManager } from 'react-query';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { Provider } from 'react-redux';
import MainStackNavigator from 'src/Navigator';
import useOnlineManager from 'src/hooks/useOnlineManager';
import useAppState from 'src/hooks/useAppState';
import store from 'src/redux/store';

const theme = extendTheme({
  // colors: {
  //   'primary': {
  //     '50': '#86e9ff',
  //     '100': '#5fe0fd',
  //     '200': '#3ed5f7',
  //     '300': '#1fc8ee',
  //     '400': '#10b1d7',
  //     '500': '#159bb9',
  //     '600': '#18869f',
  //     '700': '#197285',
  //     '800': '#1a5e6e',
  //     '900': '#194c57'
  //   },
  // },
});


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000  * 60 * 24
    }
  },
});


function onAppStateChange(status) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}
const App = () => {
  useOnlineManager();
  useAppState(onAppStateChange);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={theme}>
          <MainStackNavigator />
        </NativeBaseProvider>
      </QueryClientProvider>
    </Provider>
  );
}


export default App;
