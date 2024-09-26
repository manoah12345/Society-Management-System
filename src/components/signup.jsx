/* eslint-disable react/jsx-no-undef */
import { useState } from "react";
import { auth, db } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [flatNo, setflatNo] = useState("");
  const [member, setMember] = useState("");
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      alert("Passwords do not match.");
      navigate("/signup");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up:", user);
      console.log(displayName);
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: displayName, // Add any other user info you want to store
        createdAt: new Date(),
        flatNo: flatNo,
        role: member,
      });
      console.log("User added to Firestore");
      navigate("/");
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={signUp}>
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmpassword"
              className="block text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="flatNo" className="block text-gray-700 mb-2">
              Flat No
            </label>
            <input
              type="number"
              id="flatNo"
              value={flatNo}
              onChange={(e) => setflatNo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="member" className="block text-gray-700 mb-2">
              Role
            </label>
            <select
              type="text"
              id="member"
              value={member}
              onChange={(e) => setMember(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            >
              <option value="Secretary">Secretary</option>
              <option value="Chairman">Chairman</option>
              <option value="Treasurer">Treasurer</option>
              <option value="Member">Member</option>
            </select>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
            Sign Up
          </button>
          <a href="/auth" className="text-blue-600 underline mt-4 block">
            Already have an account
          </a>
        </form>
      </div>
    </div>
  );
};
