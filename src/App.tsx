import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  AuthProvider,
  authConfig,
} from './libs/auth/middleware/auth/AuthContext/react';
import { AppRoutes } from './routes';
import { store } from './stores/store';
import ScalingProvider from './utils/ScalingHelper';

document.documentElement.lang = 'ja';

authConfig.referrerApplicationCode = 1;
authConfig.mainPageUrl = '/movie';

function App() {
  return (
    <ScalingProvider>
      <Provider store={store}>
        <BrowserRouter basename="movie">
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </ScalingProvider>
  );
}

export default App;
