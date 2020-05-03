import { useContext } from 'react';
import AppContext from './AppContext';

function useAppContext() {
  return useContext(AppContext);
}

export default useAppContext;
