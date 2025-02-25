import RegistrationForm from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 bg-cover bg-center relative pt-28"
      style={{
        backgroundImage: "url('/lovable-uploads/5c355f26-cf00-4982-8296-1074d166b358.png')",
      }}
    >
      <nav className="absolute top-0 left-0 p-4">
        <img
          src="/lovable-uploads/logo3.png"
          alt="Brasão de Poço Branco"
          className="h-20 w-auto"
        />
      </nav>
      <RegistrationForm />
    </div>
  );
};

export default Index;
