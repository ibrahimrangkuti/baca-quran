import React from "react";
import { Routes, Route } from "react-router-dom";
import DetailSurat from "./DetailSurat";
import Home from "./Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/surat/:nomor" element={<DetailSurat />} />
    </Routes>
  );
}
