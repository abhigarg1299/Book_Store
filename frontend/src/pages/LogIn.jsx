import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../components/store/auth";
import { useDispatch } from "react-redux";
function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (values.username === "" || values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://127.0.0.1:1000/api/v1/user/sign-in",
          values
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Log In</p>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Username
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="username"
            name="username"
            required
            value={values.username}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Password
          </label>
          <input
            type="password"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="password"
            name="password"
            required
            value={values.password}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <button
            className="w-full mt-2 bg-blue-500 text-white  font-semibold py-2  rounded hover:text-blue-500 "
            rows="5"
            required
            onClick={submit}
          >
            LogIn
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Don't have an account? &nbsp;
          <Link to="/signup" className="hover:text-blue-500">
            <u>SignUp</u>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
