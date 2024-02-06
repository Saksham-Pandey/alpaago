import "./login.css";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//const auth = getAuth();
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const history = useNavigate();

  const signIn = async () => {
    if (login === true) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        history("/homepage");
      } catch (err) {
        console.error(err);
        setLogin(false);
      }
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        history("/homepage");
      } catch (err) {
        alert(err.code);
        console.error(err);
        setLogin(true);
      }
    }
  };

  return (
    <>
      <div className="loginForm">
        <div>
          <button onClick={() => setLogin(false)}>SignUp</button>
          <button onClick={() => setLogin(true)}>SignIn</button>
        </div>
        <h1>{login ? "SignIn" : "SignUp"}</h1>
        <input
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>{login ? "SignIn" : "SignUp"}</button>
      </div>
    </>
  );
};
