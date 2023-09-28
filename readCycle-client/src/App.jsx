import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import ProfilePage from "./pages/UserProfilePage";
import LibraryPage from "./pages/LibraryPage";
import AddBook from "./components/AddBook";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<HomePage />} />

        <Route
          exact
          path="/library"
          element={
            <IsPrivate>
              <LibraryPage />
            </IsPrivate>
          }
        />

        <Route
          exact
          path="/library/:bookId"
          element={
            <IsPrivate>
              <BookDetailsPage />
            </IsPrivate>
          }
        />

        <Route
          path="/add-book"
          element={
            <IsPrivate>
              <AddBook />
            </IsPrivate>
          }
        />

        <Route
          exact
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />

        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route exact path="/about" element={<AboutPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
