import "./App.css";
import { RouterProvider } from "react-router";
import router from "./routers/router.jsx";
import TestDriveModal from "./components/TestDriveModal.jsx";

function App() {
  return (
    <div className="min-h-svh h-full bg-primary">
      <RouterProvider router={router} />
      <TestDriveModal />
    </div>
  );
}

export default App;
