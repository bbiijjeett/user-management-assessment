import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./UserForm.css"; // Import the CSS file

const UserForm = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch user data for editing
      axios
        .get(`http://localhost:5000/users/${id}`)
        .then((response) => setUser(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleSubmit = (values) => {
    const url = id
      ? `http://localhost:5000/users/${id}`
      : "http://localhost:5000/users";
    const method = id ? "put" : "post";
    const newUser = {
      ...values,
      creationDate: user?.creationDate || new Date().toISOString(),
    };

    axios({ method, url, data: newUser })
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  return (
    <div className="form-container">
      <h1>{id ? "Edit User" : "Add User"}</h1>
      <Formik
        initialValues={
          user || { name: "", role: "Member", status: "Active", email: "" }
        }
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true} // Reinitialize the form with new values
      >
        <Form>
          <div className="field-wrapper">
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div className="field-wrapper">
            <label htmlFor="role">Role</label>
            <Field as="select" name="role">
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
            </Field>
            <ErrorMessage name="role" component="div" className="error" />
          </div>
          <div className="field-wrapper">
            <label htmlFor="status">Status</label>
            <Field as="select" name="status">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Field>
            <ErrorMessage name="status" component="div" className="error" />
          </div>
          <div className="field-wrapper">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <button type="submit" className="submit-button">
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UserForm;
