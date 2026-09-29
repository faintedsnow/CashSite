// src/App.jsx
import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Works = lazy(() => import("./pages/Works"));
const Contact = lazy(() => import("./pages/Contact"));
const Music = lazy(() => import("./pages/music"));
const Performance = lazy(() => import("./pages/Performance"));
const Store = lazy(() => import("./pages/Store"));

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    dark ? html.classList.add("dark") : html.classList.remove("dark");
  }, [dark]);

  return (
    <div
      className={
        (dark
          ? "dark bg-neutral-950 text-neutral-100"
          : "bg-neutral-50 text-neutral-900") + " min-h-dvh flex flex-col"
      }
    >
      <NavBar dark={dark} setDark={setDark} />
      <div className="flex-1">
        <Suspense
          fallback={
            <div
              className="min-h-screen bg-white dark:bg-black"
              aria-label="Loading page"
            />
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<Works />} />
            <Route path="/music" element={<Music />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/store" element={<Store />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
