import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container not-found">
    <h1>404 - Not Found</h1>
    <p>
      No such page exists. <Link to="/">Go to Home</Link>
    </p>
  </div>
);

export default NotFound;
