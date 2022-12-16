import { useRoutes } from 'react-router-dom';

import Main from "./pages/main/Main";

import { publicRoutes } from './public';

export const AppRoutes = () => {

  const commonRoutes = [{ path: '/', element: <Main /> }];

  const routes = publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
