import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import { Suspense, lazy } from "react";
import Loader from "./components/loader/Loader";

const Start = lazy(() => import("./pages/Start"));
const Questions = lazy(() => import("./pages/Questions"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Start />
            </Suspense>
          }
        />

        <Route
          path="questions"
          element={
            <Suspense fallback={<Loader />}>
              <Questions />
            </Suspense>
          }
        />
      </Route>
    </>
  )
);
