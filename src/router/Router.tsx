import { lazy } from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { Loadable } from './components';

const Board = Loadable(lazy(() => import('../pages/Board/Board')));
const SetupBoard = Loadable(lazy(() => import('../pages/SetupBoard/SetupBoard')));

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<SetupBoard />} />
        <Route path={`/session`} element={<Board />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
