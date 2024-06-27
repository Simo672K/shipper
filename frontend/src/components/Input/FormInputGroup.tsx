import { InputText } from "primereact/inputtext";

interface FromInput {
  type?: string,
  name?: string,
  icon: React.ReactNode,
  placeholder?: string
}

const FormInputGroup = ({type, name, icon, placeholder}: FromInput) => {
  return (
    <div className="p-inputgroup flex-1 mt-4">
      <span className="p-inputgroup-addon">
        {icon}
      </span>
      <InputText type={type} name={name} placeholder={placeholder} className="border ps-2 focus:border-[#3EB6FE] outline-none shadow-none"/>
    </div>
  );
};
export default FormInputGroup;
