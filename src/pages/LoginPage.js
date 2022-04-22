import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, database, provider } from "../db/firebase";

// import { useHistory } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";

const SignUp = () => {
  // const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const signUpWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (user) => {
          await updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`,
          });
          await setDoc(doc(database, "users", user.user.uid), {
            name: user.user.displayName
              ? user.user.displayName
              : `${firstName} ${lastName}`,
            email: user.user.email,
            uid: user.user.uid,
            userImage: user.user.photoURL,
          });
        }
      );
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const signUpwithGoogle = async () => {
    try {
      setGoogleLoading(true);
      await signInWithPopup(auth, provider).then(async (user) => {
        await setDoc(doc(database, "users", user.user.uid), {
          name: user.user.displayName
            ? user.user.displayName
            : `${firstName} ${lastName}`,
          email: user.user.email,
          uid: user.user.uid,
          userImage: user.user.photoURL,
        });
      });
      setGoogleLoading(false);
    } catch (error) {
      alert(error.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="py-3 px-3 lg:px-0"></div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center">
        <div className="flex flex-col space-y-8 px-3 lg:px-20 py-3 ">
          <div className="flex justify-center lg:justify-end">
            <h1 className="font-bold text-3xl text-indigo-500 font-serif">
              Sign Up
            </h1>
          </div>

          <div className="">
            <form
              className="flex flex-col space-y-5"
              onSubmit={signUpWithEmailAndPassword}
            >
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="signup__input"
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="signup__input"
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-5">
                <input
                  className="signup__input"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="signup__input"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="">
                <button
                  type="submit"
                  className="bg-indigo-600 py-2 w-full text-white font-serif font-semibold"
                >
                  create my account
                </button>
              </div>
            </form>
          </div>
          <div className="text-center"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
