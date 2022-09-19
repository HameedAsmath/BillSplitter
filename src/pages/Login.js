import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

//Bootstrap Imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

// toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Formik and Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([])
  let navigate = useNavigate();

  //Form validation
  const ContactSchema = Yup.object().shape({
    Email: Yup.string()

      // Format Validation
      .email("Invalid email address format")

      // Required Field Validation
      .required("Email is required"),

    Password: Yup.string()
      .min(6, "Password should be atleast 6 characters")
      .max(15, "Password should be atleast 6 characters")
      .required("Password is Required"),
  });

  return (
    <>
      {/* Login Form */}
      <UserContext.Provider value="hello world this is gautam">
        <div className="container justify-content-center col-md-4 align-items-center">
          <ToastContainer />
          <Formik
            initialValues={{
              Email: "",
              Password: "",
            }}
            validationSchema={ContactSchema}
            onSubmit={(values, { resetForm }) => {
              var LoginData = new FormData();
              LoginData.append("email", values.Email);
              LoginData.append("password", values.Password);
              setLoading(true);
              axios
                .post(
                  "https://billspliterapi.azurewebsites.net/api/user/login/",
                  LoginData
                )
                .then((response) => {
                  let userData = {};
                  for (let i in response.data.user) {
                    userData[i] = response.data.user[i];
                  }
                  setUser(userData)
                  console.log(userData,user);
                  setLoading(false);
                  if (response.statusText === "OK") {
                    toast.success("User LoggedIn", {
                      position: "top-right",
                      autoClose: 4000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  } else {
                    toast.error("OOPS! Try Again After Sometime", {
                      position: "top-right",
                      autoClose: 4000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                  resetForm();
                  navigate("/", { replace: true });
                });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <p className="lead fw-bold text-center my-3 text-dark fs-1">
                  Login
                </p>

                <div className="input-group mt-4">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <Field
                    type="email"
                    className={`form-control shadow-none ${
                      touched.Email && errors.Email ? "is-invalid" : ""
                    }`}
                    name="Email"
                    placeholder="Enter Your Email"
                    aria-describedby="emailHelp"
                  />
                  <ErrorMessage
                    component="div"
                    name="Email"
                    className="invalid-feedback"
                  />
                </div>

                <div className="input-group mt-4">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-lock"></i>
                  </span>
                  <Field
                    type="password"
                    className={`form-control shadow-none ${
                      touched.Password && errors.Password ? "is-invalid" : ""
                    }`}
                    name="Password"
                    placeholder="Enter Your Password"
                  />
                  <ErrorMessage
                    component="div"
                    name="Password"
                    className="invalid-feedback"
                  />
                </div>

                <div className="text-center my-4">
                  {!loading && (
                    <button
                      type="submit"
                      className="btn btn-outline-dark shadow-none px-5"
                    >
                      Login
                    </button>
                  )}
                  {loading && (
                    <button className="btn btn-outline-secondary disabled">
                      Loading...
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </UserContext.Provider>
    </>
  );
};
