import React, { useEffect, useState } from "react";

import HomePage from "./pages/HomePage";
import { auth } from "./db/firebase";
import SignUp from "./pages/LoginPage";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user);
        setUser(user);
        // ...
      } else {
        setUser(false);
      }
    });
  }, []);
  return <>{user ? <HomePage /> : <SignUp />}</>;
}

export default App;
