import React from "react";
import ReactDOM from "react-dom/client";
import Restresults from "./pages/restresult";

import { requireAuth } from "./util/auth";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Layout from "./components/layout";
import Error, { Error2 } from "./util/error";
import Mainp from "./pages/homepage";
import Signinup from "./pages/signin-up";
import Userprof from "./pages/userpro";
import Createrest from "./pages/createrest";
import Myrest from "./pages/myrest";
import Details from "./pages/restdetails";
import Orderstatus from "./pages/succes";
import Failed from "./pages/failed";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error2 />}>
      <Route path="*" element={<Error />} />
      <Route index element={<Mainp />} />
      <Route path="signin-up" element={<Signinup />} />
      <Route
        path="user-profile"
        element={<Userprof />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="create-rest"
        element={<Createrest />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="my-rest"
        element={<Myrest />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="/search/:city"
        element={<Restresults />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="/details/:id"
        element={<Details />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="/orderstatus"
        element={<Orderstatus />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="/failed/:id"
        element={<Failed />}
        loader={async () => await requireAuth()}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
