import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  let options = ["Male", "Female", "Others"];
  let navigate = useNavigate();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  //Form validation
  const ContactSchema = Yup.object().shape({
    Email: Yup.string()

      // Format Validation
      .email("Invalid email address format")

      // Required Field Validation
      .required("Email is required"),

    Name: Yup.string()

      //Minimum Character Validation
      .min(6, "Name must be 6 characters at minimum")
      .max(25, "Name is too long")
      .required("Name is required"),

    Number: Yup.string()
      .min(10, "Phone Number must be 10 digits")
      .max(10, "Phone Number shouldnot exceed 10 digits")
      .required("Phone Number is Required")
      .matches(phoneRegExp, "Phone number is not valid"),

    Password: Yup.string()
      .min(6, "Password should be atleast 6 characters")
      .max(15, "Password should be atleast 6 characters")
      .required("Password is Required"),
  });
  return (
    <>
      {/* Signup Form */}
      <div className="container justify-content-center col-md-4 align-items-center">
        {/* Same as */}
        <ToastContainer />
        <Formik
          initialValues={{
            Name: "",
            Email: "",
            Password: "",
            Number: "",
            Gender: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            var SignupData = new FormData();
            SignupData.append('name',values.Name)
            SignupData.append('email',values.Email)
            SignupData.append('password',values.Password)
            SignupData.append('phone',values.Number)
            SignupData.append('gender',values.Gender)

            setLoading(true);
            axios
              .post("https://billspliterapi.azurewebsites.net/api/user/", SignupData)
              .then((response) => {
                setLoading(false);
                if (response.statusText === "OK") {
                  toast.success("Account Created Successfully!", {
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
                Register
              </p>

              <div className="input-group mt-2">
                <span className="input-group-text bg-light">
                  <i className="bi bi-person"></i>
                </span>
                <Field
                  type="text"
                  className={`form-control shadow-none ${
                    touched.Name && errors.Name ? "is-invalid" : ""
                  }`}
                  name="Name"
                  placeholder="Enter Your Name"
                />
                <ErrorMessage
                  component="div"
                  name="Name"
                  className="invalid-feedback"
                />
              </div>

              <div className="input-group mt-2">
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

              <div className="input-group mt-2">
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

              <div className="input-group mt-2">
                <span className="input-group-text bg-light">
                  <i className="bi bi-phone"></i>
                </span>
                <Field
                  type="text"
                  className={`form-control shadow-none ${
                    touched.Number && errors.Number ? "is-invalid" : ""
                  }`}
                  name="Number"
                  placeholder="YOUR NUMBER"
                />
                <ErrorMessage
                  component="div"
                  name="Number"
                  className="invalid-feedback"
                />
              </div>

              {/* Radio */}
              <h6 className="text-dark mt-2">Gender</h6>
              {options.map((option) => (
                <div className="form-check form-check-inline" key={option}>
                  <Field
                    className="form-check-input"
                    type="radio"
                    value={option}
                    name="Gender"
                  />
                  <label className="form-check-label text-dark">{option}</label>
                </div>
              ))}

              <div className="text-center my-2">
                {!loading && (
                  <button
                    type="submit"
                    className="btn btn-outline-dark shadow-none px-5"
                  >
                    Signup
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
    </>
  );
};
