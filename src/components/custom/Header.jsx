import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";

function Header() {
  const [user, setUser] = useState(null);

  // ✅ Load user initially + listen for login
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser(); // on mount

    // 🔔 Listen to login event from CreateTrip
    window.addEventListener("user-login", loadUser);

    return () => {
      window.removeEventListener("user-login", loadUser);
    };
  }, []);

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-extrabold">
          Aura<span className="text-purple-600">Travel</span>
        </h1>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <a href="/create-trip">
                <Button variant="outline" className="rounded-full px-5 cursor-pointer">
                  + Create Trips
                </Button>
              </a>

              <a href="/my-trips">
                <Button variant="outline" className="rounded-full px-5 cursor-pointer">
                  My Trips
                </Button>
              </a>

              <Popover>
                <PopoverTrigger asChild>
  <button
    type="button"
    className="h-9 w-9 rounded-full border bg-center bg-cover 
               cursor-pointer hover:scale-105 transition"
    style={{
      backgroundImage: `url("${user.picture}")`,
    }}
  />
</PopoverTrigger>

                <PopoverContent className="w-40 p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 hover:text-red-600 rounded-md cursor-pointer"
                  >
                    Log Out
                  </button>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <span className="text-sm text-gray-500">Not logged in</span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
