import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import tigoLogo from "@/assets/logo-tigo.png";
import techLogo from "@/assets/Logo-tech.png";
import senaLogo from "@/assets/logo-sena.png";
import atlanticoLogo from "@/assets/LOGO-atlantico.png";
import logoUniEnvigado from "@/assets/logo-uni-envigado.png";
import logoUniversidad from "@/assets/logo-universidad.png";
import logoUpb from "@/assets/logo-upb.png";
import logoEstrategia from "@/assets/logo-estrategia.png";
import logoAulas from "@/assets/logo-aulas.png";
import logoCamara from "@/assets/logo-camara.png";

const aliados = [
  { nombre: "Microsoft", descripcion: "Tecnología y formación digital" },
  { nombre: "Universidad Pontificia Bolivariana", descripcion: "Investigación y desarrollo" },
  { nombre: "Instituto Colombiano de Bienestar", descripcion: "Programas sociales" }
];

export default function Aliados() {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Aliados" }]} />
        <h1 className="text-4xl font-bold mb-8">Aliados Estratégicos</h1>
        {/* Grid de aliados estratégicos */}
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center items-center">
            <a href="https://www.tigo.com.co/" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform">
              <img src={tigoLogo} alt="Tigo" className="h-45 w-auto object-contain mx-auto" />
            </a>
            <a href="https://talentotech.gov.co/portal/" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform">
              <img src={techLogo} alt="Talento Tech" className="h-45 w-auto object-contain mx-auto" />
            </a>
            <a href="https://www.sena.edu.co/es-co/Paginas/default.aspx" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform">
              <img src={senaLogo} alt="SENA" className="h-45 w-auto object-contain mx-auto" />
            </a>
          </div>
          <div className="mt-8 flex justify-center w-full">
            <a href="https://atlanttico.com/" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform w-full sm:w-2/3">
              <img src={atlanticoLogo} alt="Atlántico" className="h-53 w-auto object-contain mx-auto" />
            </a>
          </div>
          <div className="mt-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center items-center">
              <a href="https://www.iue.edu.co/" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform">
                <img src={logoUniEnvigado} alt="IUE Envigado" className="h-45 w-auto object-contain mx-auto" />
              </a>
              <a href="https://www.udea.edu.co/wps/portal/udea/web/inicio" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform">
                <img src={logoUniversidad} alt="UdeA" className="h-45 w-auto object-contain mx-auto" />
              </a>
              <a href="https://portal.upb.edu.co/" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform">
                <img src={logoUpb} alt="UPB" className="h-45 w-auto object-contain mx-auto" />
              </a>
            </div>
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center items-center">
              <a href="https://aulasinnovar.com/" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform">
                <img src={logoAulas} alt="Aulas Innovar" className="h-45 w-auto object-contain mx-auto" />
              </a>
              <a href="https://ccas.org.co/" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform">
                <img src={logoCamara} alt="Camara de Comercio de Armenia y del Quindio" className="h-45 w-auto object-contain mx-auto" />
              </a>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}