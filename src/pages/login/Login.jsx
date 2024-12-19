/* eslint-disable no-unused-vars */
import { useState } from "react";
import logo from "../../assets/images/ncaa_logo.png";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Spinner } from "@nextui-org/react";
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [passwordDrawer, setPasswordDrawer] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    console.log(values);
  };

  //password visible function
  const handlePasswordVisibleChange = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <main
        className={`relative w-full bg-gray-100 flex flex-col space-y-5 items-center justify-center h-[100vh] px-3`}
        // style={{
        //   backgroundImage: `url(${logo})`,
        //   backgroundPosition: "top left",
        //   backgroundSize: "100px",
        //   backgroundRepeat: "repeat",
        // }}
      >
         <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url(${logo})`,
      backgroundPosition: "top left",
      backgroundSize: "100px",
      backgroundRepeat: "repeat",
      filter: "blur(1.5px)", // Blurs the background image
    }}
  ></div>
        <section className="absolute form_section w-[85%] lg:w-[45vw] xl:w-[30vw] md:w-[55vw] rounded-md bg-white shadow-md p-10">
        <div className="form_header text-center pb-3">
            <h4 className="text-gray-700 text-2xl font-medium">Login</h4>
            <p className="text-gray-400 font-medium text-sm mb-[1.5rem]">
              Access to our dashboard
            </p>
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
            <div className="submit_btn">
              <button
                disabled={loading}
                type="submit"
                className="text-lg  w-full bg-[#5A6ACF] hover:bg-[#5A6ACF]/40 active:bg-[#5A6ACF]/80 p-[4px] text-white rounded-md"
              >
                <div className="flex items-center justify-center gap-x-2">
                  {loading ? (
                    <Spinner
                      size="sm"
                      classNames={{ circle1: "border-white/80" }}
                    />
                  ) : (
                    ""
                  )}
                  Login
                </div>
              </button>
            </div>
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
