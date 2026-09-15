import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppLayout from "./AppLayout"; // Keep this path if it's already correct

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <AppLayout />
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;