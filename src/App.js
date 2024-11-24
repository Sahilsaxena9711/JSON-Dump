import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebaseConfig from "./firebase.json";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, getDocs } from "firebase/firestore";

function App() {
  const [authData, setAuthData] = useState({});

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const onSingIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const data = await signInWithPopup(auth, provider);
      if (data?.user?.uid) {
        console.log(data, data.user);
        let obj = {
          uid: data?.user?.uid,
          email: data?.user?.email,
          displayName: data?.user?.displayName,
        };
        setAuthData(obj);
        const user = await setDoc(doc(db, "users", data?.user?.uid), obj);
        console.log(user);
      }
    } catch (e) {
      console.log(e.code, e.message);
    }

    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     console.log(user, user.uid, "success");

    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //     console.log(error, errorCode, errorMessage, email, credential, "error");
    //   });
  };

  const onCreateProject = async () => {
    try {
      console.log(authData);
      const project = await setDoc(
        doc(db, "users", authData?.uid, "projects", "newproj"),
        {
          id: 123,
        }
      );
      const u = await getDocs(
        collection(db, "users", authData?.uid, "projects")
      );
      console.log(u);
    } catch (e) {
      console.log(e, e.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={onSingIn}>Goolgle eLogin</button>
      <button onClick={onCreateProject}>Create Project</button>
    </div>
  );
}

export default App;
