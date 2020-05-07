import { createContext } from 'react';

const AppContext = createContext({
  person: null,
  setAuth: () => {}
});

export default AppContext;
