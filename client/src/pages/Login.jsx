import { useState, useEffect } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    try {

      const response =
        await axios.post(
          "http://localhost:5000/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      window.location.href = "/";

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  useEffect(() => {

  const token =
    localStorage.getItem("token");

  if (token) {

    window.location.href = "/";

  }

}, []);

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 p-10 rounded-3xl w-[400px]">

        <h1 className="text-3xl text-white font-bold mb-8 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 rounded-xl mb-4 bg-slate-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 rounded-xl mb-6 bg-slate-800 text-white"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 p-4 rounded-xl text-white font-semibold"
        >
          Login
        </button>

        <p className="text-center text-slate-300 mt-4">

  Don’t have an account?{" "}

  <span
    onClick={() => {
      window.location.href = "/signup";
    }}
    className="text-cyan-400 cursor-pointer hover:underline"
  >
    Signup
  </span>

</p>

      </div>

    </div>

  );

}

export default Login;