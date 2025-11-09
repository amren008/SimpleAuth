import { BrowserRouter } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ROUTES from "./ROUTES";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="grow overflow-auto">
          <ROUTES />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
