import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function MaintenanceChecker({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {
    // Não verificar se já está na página de manutenção ou admin/login
    if (location === '/maintenance' || location === '/admin' || location === '/login') {
      setIsChecking(false);
      return;
    }

    // Verificar estado de manutenção
    fetch('/api/maintenance')
      .then(res => res.json())
      .then(data => {
        setIsMaintenance(data.enabled);
        if (data.enabled && location !== '/maintenance') {
          setLocation('/maintenance');
        }
      })
      .catch(() => {
        // Em caso de erro, assumir que não está em manutenção
        setIsMaintenance(false);
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, [location, setLocation]);

  // Mostrar loading enquanto verifica
  if (isChecking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white/60 text-sm font-mono">Carregando...</div>
      </div>
    );
  }

  return <>{children}</>;
}
