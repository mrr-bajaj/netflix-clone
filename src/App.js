import { Provider } from 'react-redux';
import appStore from './redux/appStore';
import Body from './components/Body/Body';

function App() {
  return (
    <Provider store={appStore}><Body></Body></Provider>
  );
}

export default App;
