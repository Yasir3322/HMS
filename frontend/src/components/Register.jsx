import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useGlobalRegisterContext } from "../store/context/register-context";
import * as yup from "yup";
import { useGlobalAuthContext } from "../store/context/auth-context";
import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().max(30).min(6).required(),
});

let SignInschema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().max(30).min(6).required(),
});

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const CreatePassPage = () => {
  // const [continueWithEmail, setContinueWithEmail] = useState(false);
  // const [signup, setSignUp] = useState(false)

  const { continueWithEmail, setContinueWithEmail, signup, setSignUp } =
    useGlobalRegisterContext();

  const { setIsAuthenticated } = useGlobalAuthContext();

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleBackbtn() {
    setContinueWithEmail(false);
    setSignUp(false);
  }

  function handleEmailchange(e) {
    setEmail(e.target.value);
  }

  function handleSignUpFormData(e) {
    setSignupData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  const responseGoogle = (response) => {
    console.log(response);
    // Handle Google sign-in response
  };

  const onFailureGoogle = (error) => {
    console.error(error);
    // Handle failure/error in Google sign-in
  };

  const validate = async () => {
    let { name, email, password } = signupData;
    let isFormValid = await schema.isValid({ name, email, password });
    if (isFormValid) {
      return null;
    }

    const res = await schema
      .validate({ name, email, password })
      .catch((err) => {
        if (err) {
          toast.info(err.message);
        }
        return null;
      });
    return res;
  };

  const SignInValidate = async () => {
    let signIndata = { email, password };
    let isFormValid = await SignInschema.isValid(signIndata);
    if (isFormValid) {
      return null;
    }

    const res = await SignInschema.validate(signIndata).catch((err) => {
      if (err) {
        toast.info(err.message);
      }
      return null;
    });
    return res;
  };

  async function handleSignupFormSubmit(e) {
    e.preventDefault();

    let { name, password, confirmPassword, email } = signupData;

    if (password !== confirmPassword) {
      setError("Password did not match");
      toast("Password did not match");
      return;
    }

    let dataobj = {
      name: name,
      email: email,
      password: password,
    };

    const ValidateError = await validate();
    if (ValidateError) {
      setError(ValidateError);
      toast("invalid input field");
      return;
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/users/register`,
      dataobj
    );
    if (data.success) {
      localStorage.setItem("accesstoken", data.accessToken);
      localStorage.setItem("refreshtoken", data.refreshToken);
      localStorage.setItem("role", data.role);
      console.log(data);
      setIsAuthenticated(true);

      axios.interceptors.request.use(
        (config) => {
          config.headers.authorization = `Bearer ${data.accessToken}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      navigate("/");
    }
  }

  async function handleSignInSubmit(e) {
    e.preventDefault();
    console.log("called");
    let ValidateError = await SignInValidate();
    if (ValidateError) {
      console.log(ValidateError);
      setError(ValidateError);
      toast(error);
      return;
    }

    let { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/login`,
      { email, password }
    );
    if (data.success) {
      localStorage.setItem("accesstoken", data.accessToken);
      localStorage.setItem("refreshtoken", data.refreshToken);
      localStorage.setItem("role", data.role);
      setIsAuthenticated(true);

      axios.interceptors.request.use(
        (config) => {
          config.headers.authorization = `Bearer ${data.accessToken}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      navigate("/");
    }
  }

  function handleContinueWithEmail() {
    console.log("called");
    if (!isEmail(email)) {
      console.log("called inside");
      toast.error("Invalid Email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setContinueWithEmail(!continueWithEmail);
  }

  return (
    <div className="bg-[#fdfdfd] m-10 border">
      {!continueWithEmail && !signup && (
        <div>
          <div className="mx-10">
            <h1 className="flex text-3xl font-bold pt-6">
              Sign in or create an account
            </h1>
          </div>
          <form>
            <div className="mx-10 font-serif text-xl mt-5">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailchange}
                placeholder="Enter Your Email"
                required={true}
                className="w-full mt-1 p-5 pr-10 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="bg-[#2991DC] mx-10 p-5 rounded-md text-white flex justify-center mt-5">
              <button
                className="font-serif text-2xl w-full"
                onClick={handleContinueWithEmail}
              >
                Continue with email
              </button>
            </div>
            <div className="bg-[#2991DC] mx-10 p-5 rounded-md text-white flex justify-center mt-5">
              {/* Sign in with Google button */}
              {/* <GoogleLogin
                clientId="YOUR_GOOGLE_CLIENT_ID"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={onFailureGoogle}
                cookiePolicy={"single_host_origin"}
                className="font-serif text-2xl w-50"
              /> */}
            </div>
            <div className="bg-[#2991DC] mx-10 p-5 rounded-md text-white flex justify-center mt-5">
              <button
                className="font-serif text-2xl w-full"
                onClick={() => setSignUp(!signup)}
              >
                Sign UP
              </button>
            </div>
            <div className="font-serif flex justify-center text-2xl">
              <h1 className="my-10 w-[986px]">
                By signing in or creating an account, you agree with our Terms &
                conditions and Privacy statement
              </h1>
            </div>
          </form>
        </div>
      )}
      {continueWithEmail && !signup && (
        <div className="bg-[#fdfdfd] m-10 border">
          <div className="mx-10">
            <div className="mt-3 flex align-middle items-center gap-2">
              <FaArrowLeft onClick={handleBackbtn} className="cursor-pointer" />
              <p>Back</p>
            </div>
            <h1 className="flex text-3xl font-bold pt-6">
              Enter Your Password
            </h1>
          </div>
          <div>
            <div className="mx-10 font-serif text-xl mt-5">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full mt-1 p-5 pr-10 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="bg-[#2991DC] mx-10 p-5 rounded-md text-white flex justify-center mt-5">
              <button
                onClick={(e) => handleSignInSubmit(e)}
                className="font-serif text-2xl"
              >
                Sign in
              </button>
            </div>
            <div className="flex justify-center font-serif text-2xl my-8">
              <a
                href="http://localhost:8080/ForgotPass"
                className="text-[#2991DC]"
              >
                Forgot Password?
              </a>
            </div>
            <div className="w-4/5 m-auto h-[1px] bg-black"></div>
            <div className="font-serif flex justify-center  text-2xl ">
              <h1 className="my-10 w-[986px]">
                By signing in or creating an account, you agree with our Terms &
                conditions and Privacy statement
              </h1>
            </div>
          </div>
        </div>
      )}
      {signup && !continueWithEmail && (
        <div className="bg-[#fdfdfd] m-10 border">
          <div className="mx-10">
            <div className="mt-3 flex align-middle items-center gap-2">
              <FaArrowLeft onClick={handleBackbtn} className="cursor-pointer" />
              <p>Back</p>
            </div>
            <h1 className="flex text-3xl font-bold pt-6">Create Password</h1>
            <p className="w-[740px]">
              Use a minimum of 8 characters, including uppercase letters,
              lowercase letter and numbers
            </p>
          </div>
          <form onSubmit={handleSignupFormSubmit}>
            <div className="mx-10 font-serif text-xl mt-5">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={signupData.name}
                required={true}
                onChange={handleSignUpFormData}
                placeholder="Enter Your Full-Name"
                className="w-full mt-1 p-5 pr-10 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mx-10 font-serif text-xl mt-5">
              <label>Email</label>
              <input
                type="email"
                name="email"
                required={true}
                value={signupData.email}
                onChange={handleSignUpFormData}
                placeholder="Enter Your Email"
                className="w-full mt-1 p-5 pr-10 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mx-10 font-serif text-xl mt-5">
              <label>Password</label>
              <input
                type="password"
                name="password"
                required={true}
                value={signupData.password}
                onChange={handleSignUpFormData}
                placeholder="Enter Your Password"
                className="w-full mt-1 p-5 pr-10 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mx-10 font-serif text-xl mt-5">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleSignUpFormData}
                required={true}
                placeholder="Confirm Your Password"
                className="w-full p-5  pr-10 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="bg-[#2991DC] mx-10 p-5 rounded-md text-white flex justify-center mt-5">
              <button className="font-serif text-2xl" type="submit">
                Create Account
              </button>
            </div>
            <div className="font-serif flex justify-center  text-2xl ">
              <h1 className="my-10 w-[986px]">
                By signing in or creating an account, you agree with our Terms &
                conditions and Privacy statement
              </h1>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePassPage;
