import { useEffect } from 'react';
import { callFetchAccount } from './services/api';

function App() {
   const fetchAccount = async () => {
      const res = await callFetchAccount();
      console.log('Check fetchAccount res: ', res);
   };

   useEffect(() => {
      fetchAccount();
   }, []);

   return <div>Damon IT</div>;
}

export default App;
