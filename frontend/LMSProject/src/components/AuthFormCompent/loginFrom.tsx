import { useState, type ChangeEvent } from "react";
import { loginFields } from "../../constants/login_form/loginfield";
import Input from "./Input";
import FromExtra from "./FromExtra";
import FormAction from "./FromAction";

const fields = loginFields;
const fieldsState: Record<string, string> = {};
fields.forEach((field) => {
  fieldsState[field.id] = "";
});

export default function LoginFrom() {
  const [loginState, setLoginState] =
    useState<Record<string, string>>(fieldsState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    authenticateUser();
  };

  function authenticateUser() {
    console.log(loginState);
  }

  return (
    <form className="mt-8 space-y-6">
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FromExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
