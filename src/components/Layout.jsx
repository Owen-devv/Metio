import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8 text-start">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
