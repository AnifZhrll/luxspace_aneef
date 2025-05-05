import React, { useEffect, useState } from "react";
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
import Profile from "./pages/Profile";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Route } from "react-router-dom";


function App({ cart }) {
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
          <Header mode="light" cart={cart} />
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



export default function Routes() {
  const cachedCart = window.localStorage.getItem("cart");
  const [cart, setCart] = useState([]);
  
  function handleAddToCart(item) {
    const currentIndex = cart.length;
    const newCart = [...cart, { id: currentIndex + 1, item }];
    setCart(newCart);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function handleRemoveCartItem(event, id) {
    const revisedCart = cart.filter(function(item) {
      return item.id !== id;
    });
    setCart(revisedCart);
    window.localStorage.setItem("cart", JSON.stringify(revisedCart));
  }

  useEffect(function(){
    console.info("Cached cart", cachedCart);
    if (cachedCart !== null) {
      setCart(JSON.parse(cachedCart));
    }
  }, [cachedCart]);

  return  (
    <Router>
      <Route path="/" exact>
        <App cart={cart} />
      </Route>
      <Route path="/profile" exact component={Profile}/>
      <Route path="/details/:id">
        <Detail handleAddToCart={handleAddToCart} cart={cart}/>
      </Route>
      <Route path="/cart">
        <Cart cart={cart} handleRemoveCartItem={handleRemoveCartItem}/>
      </Route>
    </Router>
  )
}




