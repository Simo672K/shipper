import { Card } from "primereact/card";
import LoginHeading from "../Headings/LoginHeading";
import LoginForm from "../Form/LoginForm";

function LoginCard() {
  return (
    <Card title={<LoginHeading />} className="w-[25rem]">
      <LoginForm/>
    </Card>
  );
}
export default LoginCard;
