import Logo from "../../assets/logo.png";

const LoginHeading = () => {
  return (
    <div className="mt-10 flex justify-center">
      <img src={Logo} alt="Shipper login page" />
      <h1 className="text-gray-800 ms-4">Login Page</h1>
    </div>
  );
};
export default LoginHeading;
