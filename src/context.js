import { createContext } from "react";

const Context = createContext({
  currentUser: null,
  isAuth: false,
  draft: null,
  pins: [],
  currentPin: null,

  viewport: {
    latitude: -33.86882,
    longitude: 151.20929,
    zoom: 12
  },
  userPosition: {
    latitude: -33.86882,
    longitude: 151.20929
  }
});

export default Context;
