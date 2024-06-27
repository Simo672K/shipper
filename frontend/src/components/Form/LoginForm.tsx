import CustomButton from "../Button/Button"
import FormInputGroup from "../Input/FormInputGroup"


const LoginForm = () => {
  return (
    <div>
      <FormInputGroup
        icon={<i className="pi pi-envelope"></i>}
        placeholder="Enter Your Email"
      />
      <FormInputGroup
        icon={<i className="pi pi-lock"></i>}
        type="password"
        placeholder="Enter Your Password"
      />
      <CustomButton label="Login" className="mx-auto mt-4 bg-cyan-600 text-white block" />
    </div>
  )
}
export default LoginForm