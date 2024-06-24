import { useRoutes } from 'react-router-dom';
import { NotFound } from '../components/Form/NotFound';
import { Home } from '../features/dashboard';
import { VideoRoutes } from '../features/video/routes';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/videos/*', element: <VideoRoutes /> },
  { path: '*', element: <NotFound /> },
];

export const AppRoutes = () => {
  const renderRoutes = useRoutes(routes);
  return renderRoutes;
};
