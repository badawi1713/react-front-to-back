import { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
  const auth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const _isMounted = useRef(true);

  useEffect(() => {
    if (_isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setTimeout(() => {
          setCheckingStatus(false);
        }, 1000);
      });
    }

    return () => {
      _isMounted.current = false;
    };
  }, [_isMounted, auth]);

  return {
    loggedIn,
    checkingStatus,
  };
};
