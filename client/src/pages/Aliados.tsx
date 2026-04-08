import Breadcrumbs from "@/components/Breadcrumbs";
import { Handshake, Building2 } from "lucide-react";
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
    <div className="min-h-screen">
      <section className="relative w-full overflow-hidden bg-[linear-gradient(122deg,#182130_0%,#0D4B56_52%,#11B2AA_100%)] text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FFDE07]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#EC6910]/15 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-[#11B2AA]/20 blur-2xl" />

        <div className="relative z-10 container flex min-h-[460px] flex-col justify-end pb-8 md:pb-10">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            <Handshake className="h-4 w-4 text-[#FFDE07]" />
            Ecosistema de alianzas
          </div>

          <h1 className="text-5xl font-extrabold leading-tight lg:text-6xl">Aliados Estratégicos</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/85 lg:text-lg">
            Construimos sinergias con universidades, empresas y organizaciones para impulsar innovación educativa con impacto real en el territorio.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
              <Building2 className="h-4 w-4" />
              Alianzas clave
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 font-medium backdrop-blur-sm">
              Colaboración institucional
            </span>
          </div>
        </div>
      </section>

      <div className="py-8">
        <div className="container">
          <Breadcrumbs items={[{ label: "Aliados" }]} />
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
    </div>
  );
}