import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Profile from "./Profile";
import Detail from "./Detail";
import SocietyInfo from "./SocietyInfo";
import { Route, Routes } from "react-router-dom";

function System() {
  return (
    <div className="h-full w-full bg-white overflow-hidden">
      <Navbar />
      <div
        className="w-full bg-blue-400 flex"
        style={{ height: "calc(100vh - 70px)" }}
      >
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/profile/detail" element={<Detail />}></Route>
          <Route path="/society" element={<SocietyInfo />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default System;
