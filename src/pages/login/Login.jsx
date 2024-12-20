/* eslint-disable no-unused-vars */
import { useState } from "react";
import logo from "../../assets/images/ncaa_logo.png";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useLogin } from "../../services/API/login";
import { Button, ConfigProvider } from "antd";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import { errorToast } from "../../utils/toastPopUp";
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setloading] = useState(false);

  const { mutate, isPending} = useLogin();

  const { setCurrentUser } = useCurrentUser();

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    const payload = {
        username: values?.username,
        password: values?.password
    }

    mutate(payload, {
        onError: (error)=>{
            console.log(error)
            const errMsg = error?.response?.data?.message || error?.message
            errorToast(errMsg)
        },
        onSuccess: (response)=>{
            const resData = response?.data

            setCurrentUser(resData);
            navigate("/")
        }
    })

  };

  //password visible function
  const handlePasswordVisibleChange = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <main
        className={`relative w-full bg-gray-300 flex flex-col space-y-5 items-center justify-center h-[100vh] px-3`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundPosition: "center",
            backgroundSize: "100%",
            backgroundRepeat: "repeat",
            filter: "blur(10px)", // Blurs the background image
          }}
        ></div>

        <section className="absolute form_section w-[85%] lg:w-[45vw] xl:w-[30vw] md:w-[55vw] rounded-md bg-white shadow-lg p-10">
          <div className="form_header flex flex-col items-center gap-y-4 text-center pb-3">
            <div className="flex items-center gap-x-1">
              <img
                src={logo}
                alt="communeety logo"
                width={40}
                className="cursor-pointer"
              />
              <span className="font-bold leading-3 text-lg text-[#2c3679]">
                EDAP
              </span>
            </div>
            <div>
              <h4 className="text-gray-700 text-xl font-medium">Login</h4>
              <p className="text-gray-400 font-medium text-xs mb-[1.5rem]">
                Access to our dashboard
              </p>
            </div>
          </div>
          <form
            className="flex flex-col space-y-[20px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="email_address flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="font-medium text-gray-600 text-sm"
              >
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                {...register("username", { required: true })}
                placeholder="Email address or ID"
                className="mt-1 w-full border bg-white py-3 lg:py-[0.475rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="password flex flex-col space-y-1 ">
              <div className="password_label flex justify-between">
                <label
                  htmlFor="Password"
                  className="font-medium text-gray-600  text-sm"
                >
                  Password
                </label>
                <label
                  htmlFor="Forgot_password"
                  className="font-medium text-[#8e8e8e] text-xs cursor-pointer"
                >
                  Forgot Password?
                </label>
              </div>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="Password"
                  name="password"
                  {...register("password", { required: true })}
                  placeholder="password"
                  className="mt-1 w-full border bg-white py-3 lg:py-[0.475rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
                />
                <span
                  className="absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-600  cursor-pointer"
                  onClick={handlePasswordVisibleChange}
                >
                  {passwordVisible ? (
                    <FaEye size={"18px"} />
                  ) : (
                    <FaEyeSlash size={"18px"} />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <ConfigProvider theme={{
                token: {
                    colorPrimary: "#5A6ACF",
                },
            }}>
                <Button htmlType="submit" type="primary" size="large" loading={isPending}>
                    Login
                </Button>
            </ConfigProvider>
            <div className="dont_have_acc text-center text-[15px] font-medium text-black">
              {/* <p>
                Don&apos;t have an account yet?{" "}
                <span className="cursor-pointer text-[#5A6ACF]">Register</span>
              </p> */}
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
