
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-terra-50 to-white p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-terra-700">Lote+</h1>
        <p className="text-terra-600">Sistema de gestão de terrenos e propriedades</p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
