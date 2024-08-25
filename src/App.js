import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/list" element={<UserList />} />
        <Route path="/add" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
        <Route path="/delete/:id" element={<UserList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
