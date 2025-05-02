import React from "react";
import "./tailwind.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Browse from "./components/Browse";
import Arrived from "./components/Arrived";
import Client from "./components/Client";
import AsideMenu from "./components/AsideMenu";
import Footer from "./components/Footer";
import Offline from "./components/Offline";
import Splash from "./pages/Splash";

function App() {
  const [items, setItems] = React.useState([]);
  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);
  const [isLoading, setIsLoading] = React.useState(true);

  function handleOfflineStatus() {
    setOfflineStatus(!navigator.onLine);
  }

  React.useEffect(
    function () {
      (async function () {
        const response = await fetch("https://bwacharity.fly.dev/items", {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });
        const { nodes } = await response.json();
        setItems(nodes);

        if (!document.querySelector('script[src="/carousel.js"]')) {
          const script = document.createElement("script");

          script.src = "/carousel.js";

          script.async = false;

          document.body.appendChild(script);
        }
      })();

      handleOfflineStatus();
      window.addEventListener("online", handleOfflineStatus);
      window.addEventListener("offline", handleOfflineStatus);

      setTimeout(function () {
        setIsLoading(false);
      }, 1500);


      return function () {
        window.removeEventListener("online", handleOfflineStatus);
        window.removeEventListener("offline", handleOfflineStatus);
      };
    },
    [offlineStatus]
  );
  return (
    <>
      {isLoading === true ? (
        <Splash />
      ) : (
        <>
          {offlineStatus && <Offline />}
          <Header />
          <Hero />
          <Browse />
          <Arrived items={items} />
          <Client />
          <AsideMenu />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
