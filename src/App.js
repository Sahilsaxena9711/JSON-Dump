import { useEffect, useState } from "react";

import firebaseConfig from "./firebase.json";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { getDatabase } from "firebase/database";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./conatiners/Home";
import Dashboard from "./conatiners/Dashboard";
import Loading from "./conatiners/Loading";

function App() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const rdb = getDatabase();

  const [authData, setAuthData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = sessionStorage.getItem("@user");
    if (user) {
      setAuthData(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const onLogout = async () => {
    setAuthData({});
    sessionStorage.setItem("@user", null);
  };

  const onSingIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const data = await signInWithPopup(auth, provider);
      if (data?.user?.uid) {
        let obj = {
          uid: data?.user?.uid,
          email: data?.user?.email,
          displayName: data?.user?.displayName,
        };
        setAuthData(obj);
        sessionStorage.setItem("@user", JSON.stringify(obj));
        await setDoc(doc(db, "users", data?.user?.uid), obj);
      }
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  const renderAuthEnticUser = () => {
    if (loading) {
      return <Loading />;
    } else if (!authData?.uid) {
      return <Home onSingIn={onSingIn} />;
    } else {
      return <Dashboard rdb={rdb} authData={authData} db={db} />;
    }
  };

  return (
    <div className="App">
      <Header
        onLogout={onLogout}
        onSingIn={onSingIn}
        authData={authData}
        loading={loading}
      />
      {renderAuthEnticUser()}
      <Footer />
    </div>
  );
}

export default App;
