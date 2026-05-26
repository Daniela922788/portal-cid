import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import AccessibilityToolbar from "./components/AccessibilityToolbar";
import CIDChatWidget from "./components/CIDChatWidget";
import Footer from "./components/Footer";
import ContactBanner from "./components/ContactBanner";
import ScrollToTopButton from "./components/ScrollToTopButton";

const IS_PREVIEW = new URLSearchParams(window.location.search).has("preview");

const Home = lazy(() => import("./pages/Home"));
const Noticias = lazy(() => import("./pages/Noticias"));
const TerritorioStem = lazy(() => import("./pages/TerritorySTEM.standalone"));
const Proyectos = lazy(() => import("./pages/Proyectos"));
const IEOficiales = lazy(() => import("./pages/IEOficiales"));
const Gestores = lazy(() => import("./pages/Gestores"));
const CIDKids = lazy(() => import("./pages/CIDKids"));
const MesaAyuda = lazy(() => import("./pages/MesaAyuda"));
const Convocatorias = lazy(() => import("./pages/Convocatorias"));
const Formacion = lazy(() => import("./pages/Formacion"));
const Salas = lazy(() => import("./pages/Salas"));
const KitHerramientas = lazy(() => import("./pages/KitHerramientas"));
const Enlaces = lazy(() => import("./pages/Enlaces"));
const Normatividad = lazy(() => import("./pages/Normatividad"));
const SemanaStem = lazy(() => import("./pages/SemanaStem"));
const SemanaStemComplete = lazy(() => import("./pages/SemanaSTEM-Complete"));
const Aliados = lazy(() => import("./pages/Aliados"));
const Premios = lazy(() => import("./pages/Premios"));
const Centro = lazy(() => import("./pages/Centro"));
const Publicaciones = lazy(() => import("./pages/Publicaciones"));
const Testimonios = lazy(() => import("./pages/Testimonios"));
const Nosotros = lazy(() => import("./pages/Nosotros"));
const CursoDetalle = lazy(() => import("./pages/CursoDetalle"));
const Login = lazy(() => import("./pages/Login"));
const EventosDetalle = lazy(() => import("./pages/EventosDetalle"));
const Reconocimientos = lazy(() => import("./pages/Reconocimientos"));
const SistemaSolar = lazy(() => import("./pages/juegos/SistemaSolar"));
const Matematicas = lazy(() => import("./pages/juegos/Matematicas"));
const FabricaInventos = lazy(() => import("./pages/juegos/FabricaInventos"));
const EnvigadoCurioso = lazy(() => import("./pages/juegos/EnvigadoCurioso"));
const Videos = lazy(() => import("./pages/Videos"));
const TableroBI = lazy(() => import("./pages/TableroBI"));

const ENABLE_CID_KIDS = import.meta.env.VITE_ENABLE_CID_KIDS === 'true';
const ENABLE_PROYECTOS = import.meta.env.VITE_ENABLE_PROYECTOS === 'true';

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Cargando...</div>}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/nosotros" component={Nosotros} />
            <Route path="/curso/:id" component={CursoDetalle} />
            <Route path="/login" component={Login} />
            <Route path="/evento/:id" component={EventosDetalle} />
            <Route path="/noticias" component={Noticias} />
            <Route path="/territorio-stem" component={TerritorioStem} />
            {ENABLE_PROYECTOS && <Route path="/proyectos" component={Proyectos} />}
            <Route path="/ie-oficiales" component={IEOficiales} />
            <Route path="/gestores" component={Gestores} />
            {ENABLE_CID_KIDS && <Route path="/cid-kids" component={CIDKids} />}
            <Route path="/mesa-ayuda" component={MesaAyuda} />
            <Route path="/convocatorias" component={Convocatorias} />
            <Route path="/formacion" component={Formacion} />
            <Route path="/salas" component={Salas} />
            <Route path="/kit-herramientas" component={KitHerramientas} />
            <Route path="/enlaces" component={Enlaces} />
            <Route path="/normatividad" component={Normatividad} />
            <Route path="/semana-stem" component={SemanaStem} />
            <Route path="/semana-stem-complete" component={SemanaStemComplete} />
            <Route path="/SemanaSTEM-Complete" component={SemanaStemComplete} />
            <Route path="/aliados" component={Aliados} />
            <Route path="/premios" component={Premios} />
            <Route path="/Centro" component={Centro} />
            <Route path="/publicaciones" component={Publicaciones} />
            <Route path="/testimonios" component={Testimonios} />
            <Route path="/reconocimientos" component={Reconocimientos} />
            <Route path="/juegos/espacio" component={SistemaSolar} />
            <Route path="/juegos/matematicas" component={Matematicas} />
            <Route path="/juegos/fabrica-inventos" component={FabricaInventos} />
            <Route path="/juegos/envigado-curioso" component={EnvigadoCurioso} />
            <Route path="/tablero" component={TableroBI} />
            <Route path="/videos" component={Videos} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <AccessibilityToolbar />
      <CIDChatWidget />
      <ScrollToTopButton />
      <ContactBanner />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;