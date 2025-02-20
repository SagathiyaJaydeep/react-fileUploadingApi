import React from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "./Loader";

function ApiCrud() {
  const Token = "oGhgNviyBsBPfVF1"; // API Token
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [id, setId] = useState(null);
  const [ini, setIni] = useState({
    username: "",
    email: "",
    password: "",
    profile: "",
  });
  const [isLoading, setIsLoading] = useState(false); //Loader

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("profile", selectedFile);

    if (id !== null) {
      // Data Updating !!
      axios
        .patch(`https://generateapi.onrender.com/api/ApiCrud/${id}`, formData, {
          headers: {
            Authorization: Token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Data Updated");
          dataView();
          setId(null);
          setIni({
            username: "",
            email: "",
            password: "",
            profile: "",
          });
        });
    } else {
      // Data Creating !!
      axios
        .post(" https://generateapi.onrender.com/api/ApiCrud", formData, {
          headers: {
            Authorization: Token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Data Created !!");
          dataView();
        });
    }
    console.log(values);
    resetForm();
  };

  // Get Image Address
  const handleChangeImage = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  // Data Delete !!
  const deleteData = (index) => {
    axios
      .delete(`https://generateapi.onrender.com/api/ApiCrud/${index}`, {
        headers: {
          Authorization: Token,
        },
      })
      .then(() => {
        console.log("Data Deleted !!");
        dataView();
      });
  };

  // Set Data in Specific Field
  const updateData = (el) => {
    console.log(el);
    setIni({
      username: el.username,
      email: el.email,
      password: el.password,
    });
    setId(el._id);
  };

  const dataView = () => {
    setIsLoading(true);
    axios
      .get(" https://generateapi.onrender.com/api/ApiCrud", {
        // Data Display !!
        headers: {
          Authorization: Token,
        },
      })
      .then((res) => {
        setData(res.data.Data);
        console.log(res.data.Data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dataView();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column",
            gap: "10px",
          }}
        >
          <Formik
            enableReinitialize
            initialValues={ini}
            onSubmit={handleSubmit}
          >
            <Form
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexFlow: "column",
                gap: "10px",
              }}
            >
              <Box>
                <label htmlFor="">UserName :</label>
                <br />
                <Field
                  as={TextField}
                  name="username"
                  placeholder="Enter Your UserName"
                />
                <br />
              </Box>
              <Box>
                <label htmlFor="">Email :</label>
                <br />
                <Field
                  as={TextField}
                  name="email"
                  placeholder="Enter Your Email"
                />
                <br />
              </Box>
              <Box>
                <label htmlFor="">Password :</label>
                <br />
                <Field
                  as={TextField}
                  name="password"
                  type="number"
                  placeholder="Enter Your Password"
                />
                <br />
              </Box>
              <Box>
                <label htmlFor="">Upload Image :</label>
                <br />
                <Field
                  name="profile"
                  type="file"
                  onChange={handleChangeImage}
                />
                <br />
              </Box>
              <button type="submit">Submit</button>
            </Form>
          </Formik>

          <Box>
            <table border={1}>
              <thead>
                <tr>
                  <td>No</td>
                  <td>UserName</td>
                  <td>Email</td>
                  <td>Password</td>
                  <td>Profile</td>
                  <td>Delete</td>
                  <td>Update</td>
                </tr>
              </thead>
              <tbody>
                {data.map((el, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{el.username}</td>
                    <td>{el.email}</td>
                    <td>{el.password}</td>
                    <td>
                      <img
                        style={{
                          height: "100px",
                          width: "100%",
                          backgroundSize: "cover",
                        }}
                        src={el.profile}
                        alt="Profile"
                      />
                    </td>
                    <td>
                      <button onClick={() => deleteData(el._id)}>DELETE</button>
                    </td>
                    <td>
                      <button onClick={() => updateData(el)}>UPDATE</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ApiCrud;

// API
// Token : oGhgNviyBsBPfVF1
// POST : https://generateapi.onrender.com/api/ApiCrud
// GET : https://generateapi.onrender.com/api/ApiCrud
// DELETE : https://generateapi.onrender.com/api/ApiCrud/:id
// PATCH : https://generateapi.onrender.com/api/ApiCrud/:id
