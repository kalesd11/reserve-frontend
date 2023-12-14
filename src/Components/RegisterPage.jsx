import React from "react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const formSubmit = (data) => {
    console.log("Register Data", data);
  };
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center text-warning">
              <h3>
                <b>Register for RESERVE</b>
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(formSubmit)} id="registerForm">
                <div className="my-3">
                  <label htmlFor="name" className="form-label">
                    <b>Full Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    {...register("name", {
                      required: "Please Enter Your Full Name",
                    })}
                  />
                  {errors.name && (
                    <div className="text-danger mb-2 mt-1 mx-1">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="my-3">
                  <label htmlFor="mobile" className="form-label">
                    <b>Mobile No</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    id="mobile"
                    {...register("mobile", {
                      required: "Mobile Number is Required",
                    })}
                  />
                  {errors.mobile && (
                    <div className="text-danger mb-2 mt-1 mx-1">
                      {errors.mobile.message}
                    </div>
                  )}
                </div>
                <div className="my-3">
                  <label htmlFor="email" className="form-label">
                    <b>Email Id</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    {...register("email", { required: "Email Id is Required" })}
                  />
                  {errors.email && (
                    <div className="text-danger mb-2 mt-1 mx-1">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-warning text-white fw-bold"
                type="submit"
                form="registerForm"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
