import React from 'react';
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider, focusManager } from 'react-query';
import { NativeBaseProvider, extendTheme, theme as nbTheme } from 'native-base';
import { Provider } from 'react-redux';
import MainStackNavigator from 'src/Navigator';
import useOnlineManager from 'src/hooks/useOnlineManager';
import useAppState from 'src/hooks/useAppState';
import store from 'src/redux/store';

const theme = extendTheme({
  colors: {
    primary: nbTheme.colors.violet,
  },
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
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
