import React from "react";
import "./index.css";
import logo from "../../assets/icon/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { loginUser, setUserDetails } from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("data", data);
    // try {
    //   const response = await loginUser(data);
    //   // console.logresponse);
    //   if (response.status === 200) {
    //     reset();
    //     const userDetails = response?.data;
    //     setUserDetails(userDetails);
    //     toast.dismiss();
    //     toast.success(response?.message);
    //     navigate("/dashboard/admin");
    //   } else {
    //     toast.dismiss();
    //     toast.error(response.message);
    //   }
    // } catch (error) {
    //   toast.dismiss();
    //   toast.error(error?.response?.data?.message);
    // }
  };
  return (
    <section className="login-form-container">
      <div className="login-form">
        <div className="form-header">
          <img src={logo} alt="" />
          <h1>BAAI</h1>
        </div>
        <div>
          <p className="login-label">Login</p>
        </div>
        {/* login form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-input">
              <label htmlFor="">Enter Email</label> <br />
              <input
                type="email"
                placeholder="john@doe.com"
                {...register("email", { required: true })}
              />
              {errors.email && <span>Please enter your email!</span>}
            </div>
            <div className="login-input">
              <label htmlFor="">Please enter your password!</label> <br />
              <input
                type="password"
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
              {errors.password && <span>Please enter your password!</span>}
            </div>
            <div className="login-button">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>

        <p className="sign-up-link">
          Don&apos;t have an account yet ? <Link className="link-color">Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
