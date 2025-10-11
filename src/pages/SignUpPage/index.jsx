import React, { useState } from "react";
import logo from "../../assets/icon/publishpro.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setUserDetails, signUpUser } from "../../services/userServices";
import Loading from "../../components/Loading/Loading";

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
  role: z.string(),
  createdAt: z.string(),
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
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await signUpUser(data);

      if (response.status === 201) {
        reset();
        setUserDetails(response?.data);
        toast.dismiss();
        toast.success(response?.data?.message);
        navigate("/admin/articles");
      } else {
        setLoading(false);
        toast.dismiss();
        toast.error(response.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <section className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <div
        className="login-form light-background p-4 p-md-5 rounded-3"
        style={{ maxWidth: "500px" }}
      >
        <div className="d-flex justify-content-center align-items-center gap-2">
          <img width={220} src={logo} alt="" />
        </div>
        <div>
          <p className="fs-5 primary-black-text fw-normal text-center my-1">
            Sign Up
          </p>
        </div>
        {/* login form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-input mt-3 light-black-text font-nunito text-xs">
              <label htmlFor="">Full Name</label> <br />
              <input
                type="name"
                placeholder="John Doe"
                className="w-100 py-2 px-3 rounded bg-white"
                {...register("name", { required: true })}
              />
              {errors.email && (
                <span className="text-xs text-danger fw-medium font-poppins">
                  {errors?.name?.message}
                </span>
              )}
            </div>
            <div className="login-input mt-3 light-black-text font-nunito text-xs">
              <label htmlFor="">Enter Email</label> <br />
              <input
                type="email"
                placeholder="john@doe.com"
                className="w-100 py-2 px-3 rounded bg-white"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-xs text-danger fw-medium font-poppins">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="login-input mt-3 light-black-text font-nunito text-xs">
              <label htmlFor="">Please enter your password!</label> <br />
              <input
                type="password"
                placeholder="Enter password"
                className="w-100 py-2 px-3 rounded bg-white"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-xs text-danger fw-medium font-poppins">
                  {errors.password.message}
                </span>
              )}
              <input
                type="hidden"
                defaultValue="admin"
                {...register("role", { required: true })}
              />
              <input
                type="hidden"
                defaultValue={new Date().toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                {...register("createdAt", { required: true })}
              />
            </div>
            <div className="login-button mt-4">
              <button
                type="submit"
                disabled={loading}
                className="border-0 w-100 py-2 px-3 rounded tex-base text-white fw-normal font-nunito blue-background"
                style={{ height: "46px" }}
              >
                {loading ? <Loading /> : "Sign Up"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center mb-0 mt-3 font-poppins text-sm">
          Already have an account?{" "}
          <Link to="/login" className="blue-text fw-medium">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;
