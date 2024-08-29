import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        values.username === "" ||
        values.email === "" ||
        values.password === "" ||
        values.address === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://127.0.0.1:1000/api/v1/user/sign-up",
          values
        );
        alert(response.data.message);
        navigate("/LogIn");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
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
            Email
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="xyz@gmail.com"
            name="email"
            required
            value={values.email}
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
          <label htmlFor="" className="text-zinc-400">
            Address
          </label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            rows="5"
            placeholder="address"
            name="address"
            required
            value={values.address}
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
            SignUp
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Already have an account? &nbsp;
          <Link to="/login" className="hover:text-blue-500">
            <u>LogIn</u>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
