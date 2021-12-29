import { Route, Routes } from "react-router-dom";
import { Alert, Footer, Navbar } from "./components";
import { About, Home, Page404, User } from "./pages";

const App = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pb-12">
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:username" element={<User />} />
          <Route path="/not-found" element={<Page404 />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
