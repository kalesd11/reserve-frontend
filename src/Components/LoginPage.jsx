import React from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { handleSubmit, formState, register } = useForm();
  const { errors } = formState;

  const handleLogin = (data) => {
    // Add your login logic here
    console.log("Logging in with:", data);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header">
              <h3 className="card-title text-center text-warning">
                <b>Login to RESERVE</b>
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleLogin)} id="loginForm">
                <div className="mb-1 mt-3">
                  <label htmlFor="username" className="form-label">
                    <b>Username</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    {...register("username", {
                      required: "Username is Required",
                    })}
                  />
                </div>
                {errors.username && (
                  <div className="text-danger mb-2 mt-0 mx-1">
                    {errors.username.message}
                  </div>
                )}
                <div className="mb-1 mt-3">
                  <label htmlFor="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <div className="text-danger mb-2 mt-0 mx-1">
                      {errors.password.message}
                    </div>
                  )}
                </div>
              
              </form>
            </div>
            <div className="text-center mt-3 card-footer">
                  <button
                    type="submit"
                    className="btn btn-warning text-white fw-bold"
                    form="loginForm"
                  >
                    Login
                  </button>
               </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
