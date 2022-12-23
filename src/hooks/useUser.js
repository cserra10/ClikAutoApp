import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

const useAuth = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = (_user) => {
    setUser(_user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return {
    initializing,
    user
  };
};

export default useAuth;
