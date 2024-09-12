import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#fafbfc]">
      <div className="container mx-auto p-4">
      <p className="text-center font-bold">flipkart &copy;{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
