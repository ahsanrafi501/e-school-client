import registerImg from "../../assets/Group231.png";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAuth from "../../Hook/UseAuth";
import SocialLogin from "../../Component/socialLogin/socialLogin";

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)

  const { registerUserWithEmail } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
    registerUserWithEmail(data.email, data.password)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(res);
        navigate(location?.state || '/');
      })
      .catch((errors) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "error",
        });
        console.log(errors);
      });
  };

  return (
    <div>
      <div className="h-dvh max-w-7xl mx-auto items-center flex justify-center">
        <div>
          <img className="hidden sm:flex" src={registerImg} alt="" />
        </div>
        <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h2 className="text-center text-2xl p-3 mt-4 font-bold ">
            New To E-School? <span className="text-blue-500">Register</span>
          </h2>
          <form onSubmit={handleSubmit(handleRegister)} className="card-body">
            <fieldset className="fieldset">
              {/* Name Field */}
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                {...register("name", { required: true })}
                placeholder="Name"
              />
              {errors.name?.type == "required" && (
                <p className="text-red-600">Name is required</p>
              )}

              {/* Email Field */}
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                {...register("email", { required: true })}
                placeholder="Email"
              />
              {errors.email?.type == "required" && (
                <p className="text-red-600">Email is required</p>
              )}

              {/* PhotoURL Field */}
              <label className="label">PhotoURL</label>
              <input
                type="text"
                className="input"
                {...register("photoURL", { required: true })}
                placeholder="Photo URL"
              />
              {errors.photoURL?.type == "required" && (
                <p className="text-red-600">PhotoURL is required</p>
              )}

              {/* Password Field */}
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                {...register("password", {
                  required: true,
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                    message:
                      "Password must contain uppercase, lowercase, and be at least 6 characters",
                  },
                })}
                placeholder="Password"
              />
              {errors.password?.type == "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type == "pattern" && (
                <p className="text-red-600">
                  Password must contain uppercase, lowercase, and be at least 6
                  characters
                </p>
              )}

              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
            <p>
              Already have an account?{" "}
              <Link to={"/login"} state={location.state} className="text-blue-600 underline">
                Login
              </Link>
            </p>
            <div className="flex justify-center">
              <SocialLogin></SocialLogin>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
