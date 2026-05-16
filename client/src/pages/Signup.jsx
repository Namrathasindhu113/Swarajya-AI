import { useState, useEffect } from "react";
import axios from "axios";

function Signup() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = async () => {

    try {

      const response =
        await axios.post(
          "https://swarajya-ai-backend.onrender.com/signup",
          {
            name,
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Signup Successful");

      window.location.href = "/";

    } catch (error) {

      console.log(error);

      alert("Signup Failed");

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
          Signup
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-4 rounded-xl mb-4 bg-slate-800 text-white"
        />

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
          onClick={handleSignup}
          className="w-full bg-cyan-500 hover:bg-cyan-600 p-4 rounded-xl text-white font-semibold"
        >
          Signup
        </button>

        <p className="text-center text-slate-300 mt-4">

  Already have an account?{" "}

  <span
    onClick={() => {
      window.location.href = "/login";
    }}
    className="text-cyan-400 cursor-pointer hover:underline"
  >
    Login
  </span>

</p>

      </div>

    </div>

  );

}

export default Signup;