import React from "react";
import "./index.css";
import logo from "../../assets/icon/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { loginUser, setUserDetails } from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .min(4, "Name should be at least 4 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    ),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(15, {
      message: "Password must be at most 15 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/\d/, {
      message: "Password must contain at least one number",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
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
          <p className="login-label">Sign Up</p>
        </div>
        {/* login form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-input">
              <label htmlFor="">Full Name</label> <br />
              <input
                type="name"
                placeholder="John Doe"
                {...register("name", { required: true })}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className="login-input">
              <label htmlFor="">Email Address</label> <br />
              <input
                type="email"
                placeholder="john@doe.com"
                {...register("email", { required: true })}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="login-input">
              <label htmlFor="">Password</label> <br />
              <input
                type="password"
                placeholder="Must be at least 8 characters"
                {...register("password", { required: true })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <div className="login-button">
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>

        <p className="sign-up-link">
          Already have an account?{" "}
          <Link to="/login" className="link-color">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;
