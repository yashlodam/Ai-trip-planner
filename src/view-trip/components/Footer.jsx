import React from "react";

function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 py-6 text-center">
      <p className="text-sm text-gray-500">
        🚀 Created by <span className="font-semibold text-gray-700">Yash Lodam</span>  
        &nbsp;|&nbsp; 🤖 AI Travel Planner App
      </p>

      <p className="mt-2 text-xs text-gray-400">
        © {new Date().getFullYear()} All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
