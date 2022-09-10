import { lazy } from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { pageUrl } from 'src/const';
import { Loadable } from './components';

const Board = Loadable(lazy(() => import('../pages/Board/Board')));
const SetupBoard = Loadable(lazy(() => import('../pages/SetupBoard/SetupBoard')));

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={pageUrl.setupSession} element={<SetupBoard />} />
        <Route path={pageUrl.session} element={<Board />} />
        <Route path="*" element={<Navigate to={pageUrl.setupSession} />} />
      </Routes>
    </BrowserRouter>
  );
};
