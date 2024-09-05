import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
import TextFieldWithIcons from "./TextFieldWithIcons";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { RiCrosshair2Line } from "react-icons/ri";

export interface LoginCardProps {
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({
  onEmailChange,
  onPasswordChange,
  onLogin,
}) => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-xl w-full">
        <div className="card shrink-0 w-full shadow-2xl bg-base-100">
          {/* Ajuste de padding para responsividade */}
          <form className="card-body px-6 md:px-12 lg:px-20 py-8 md:py-10 lg:py-14 text-center flex flex-col">
            {/* Ajuste de tamanho para responsividade */}
            <PiAirplaneTiltFill className="max-w-32 max-h-32 md:max-w-40 md:max-h-40 h-full w-full mx-auto text-primary" />
            <div className="flex items-center justify-center mt-4">
              {/* Ajuste de tamanho e espaçamento para responsividade */}
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                EagleSc
              </h1>
              <RiCrosshair2Line size={"2.5rem"} className="text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary">pe</h1>
            </div>
            <div className="form-control mt-4">
              <TextFieldWithIcons
                onTextChange={onEmailChange}
                icon={<HiOutlineMail className="max-w-6 max-h-6 opacity-40" />}
                placeholder="Digite seu email"
                label="Email"
                border
              />
            </div>
            <div className="form-control mt-4">
              <TextFieldWithIcons
                onTextChange={onPasswordChange}
                icon={<HiOutlineLockClosed className="max-w-6 max-h-6 opacity-40" />}
                placeholder="Digite sua senha"
                label="Password"
                border
              />
            </div>
            <div className="form-control mt-6">
              <button onClick={onLogin} className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
