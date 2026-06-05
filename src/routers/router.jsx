import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import { Home } from "../pages/Home/Home";
import Prices from "../pages/Price/Price";
import Carnival from "../pages/CarDetail/Carnival";
import Sorento from "../pages/CarDetail/Sorento";
import Seltos from "../pages/CarDetail/Seltos";
import Sonet from "../pages/CarDetail/Sonet";
import Sportage from "../pages/CarDetail/Sportage";
import Carens from "../pages/CarDetail/Carens";
import K5 from "../pages/CarDetail/K5";
import K3 from "../pages/CarDetail/K3";
import Soluto from "../pages/CarDetail/Soluto";
import Morning from "../pages/CarDetail/Morning";
import RegisterDriver from "../pages/RegisterDrive/registerDriver";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "bang-gia", element: <Prices /> },
      { path: "san-pham/carnival", element: <Carnival /> },
      { path: "san-pham/sorento", element: <Sorento /> },
      { path: "san-pham/seltos", element: <Seltos /> },
      { path: "san-pham/sonet", element: <Sonet /> },
      { path: "san-pham/sportage", element: <Sportage /> },
      { path: "san-pham/carens", element: <Carens /> },
      { path: "san-pham/k5", element: <K5 /> },
      { path: "san-pham/k3", element: <K3 /> },
      { path: "san-pham/soluto", element: <Soluto /> },
      { path: "san-pham/morning", element: <Morning /> },
      { path: "dang-ky-lai-thu", element: <RegisterDriver /> },
    ],
  },
]);
export default router;

