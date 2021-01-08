import { createContext } from 'react';

const AppContext = createContext({
  getAuth: () => {},
  setAuth: () => {}
});

export default AppContext;
