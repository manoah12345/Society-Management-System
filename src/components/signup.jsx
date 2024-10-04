import React, { useState } from "react";
import { auth, db } from "../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [member, setMember] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [occupation, setOccupation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // New state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return; // Prevent navigation if passwords don't match
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const formattedBirthdate = formatDate(birthdate);

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: displayName,
        createdAt: new Date(),
        flatNo: flatNo,
        role: member,
        birthdate: formattedBirthdate,
        age: age,
        gender: gender,
        occupation: occupation,
        phoneNumber: phoneNumber,
      });

      navigate("/");
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-gray-200">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md "
        style={{
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-red-700">
          Sign Up
        </h2>
        <form onSubmit={signUp}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="displayName"
              className="block text-gray-800 text-sm"
            >
              Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800 text-sm">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-800 text-sm"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle showConfirmPassword state
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Flat No */}
          <div className="mb-4">
            <label htmlFor="flatNo" className="block text-gray-800 text-sm">
              Flat No
            </label>
            <input
              type="number"
              id="flatNo"
              value={flatNo}
              onChange={(e) => setFlatNo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label htmlFor="member" className="block text-gray-800 text-sm">
              Role
            </label>
            <select
              id="member"
              value={member}
              onChange={(e) => setMember(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              required
            >
              <option value="Secretary">Secretary</option>
              <option value="Chairman">Chairman</option>
              <option value="Treasurer">Treasurer</option>
              <option value="Member">Member</option>
            </select>
          </div>

          {/* Birthdate */}
          <div className="mb-4">
            <label htmlFor="birthdate" className="block text-gray-800 text-sm">
              Birthdate
            </label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              required
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-800 text-sm">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-800 text-sm">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Occupation */}
          <div className="mb-4">
            <label htmlFor="occupation" className="block text-gray-800 text-sm">
              Occupation
            </label>
            <input
              type="text"
              id="occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-800 text-sm"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Sign Up
          </button>
          <a
            href="/auth"
            className="text-red-600 underline mt-2 block text-center"
          >
            Already have an account?
          </a>
        </form>
      </div>
    </div>
  );
};
