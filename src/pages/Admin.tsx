
import AdminPanel from "@/components/AdminPanel";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-semibold text-primary">
            Área Administrativa - Sistema de Inscrição Cultural
          </h1>
        </div>
      </nav>
      <AdminPanel />
    </div>
  );
};

export default Admin;
