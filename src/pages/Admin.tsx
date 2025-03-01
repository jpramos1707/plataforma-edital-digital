
import { useState } from "react";
import AdminPanel from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const [forceRefresh, setForceRefresh] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-primary">
            Área Administrativa - Inscrição Cultural
          </h1>
          <Button 
            variant="outline"
            onClick={() => setForceRefresh(prev => prev + 1)}
            className="ml-4"
          >
            Atualizar dados
          </Button>
        </div>
      </nav>
      <AdminPanel key={forceRefresh} />
    </div>
  );
};

export default Admin;
