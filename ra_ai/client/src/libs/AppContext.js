import { createContext } from 'react';

const AppContext = createContext({
  auth: 'false',
  setAuth: () => {}
});

export default AppContext;
