import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "../pages/Home/Footer";
import FloatingButtons from "../components/FloatingButtons";

function RootLayout() {
  return (
    <div className="flex bg-primary flex-col min-h-svh">
      <div className="flex-1">
        <div className="">
          <div className="!z-2000 normalText">
            <ToastContainer
              newestOnTop
              pauseOnFocusLoss
              autoClose={3000}
              hideProgressBar
            />
          </div>
          <Outlet />
        </div>
      </div>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default RootLayout;

