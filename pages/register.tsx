import LoginRegisterContainer from "../components/Shared/LoginRegisterContainer";
import RegisterForm from "../components/Register/RegisterForm";

function register() {
  return (
    <LoginRegisterContainer>
      <RegisterForm />
    </LoginRegisterContainer>
  );
}

export default register;
