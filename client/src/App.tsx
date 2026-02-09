import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactBanner from "./components/ContactBanner";
import Home from "./pages/Home";
import Noticias from "./pages/Noticias";
import TerritorioStem from "./pages/TerritorioStem";
import Proyectos from "./pages/Proyectos";
import IEOficiales from "./pages/IEOficiales";
import Gestores from "./pages/Gestores";
import CIDKids from "./pages/CIDKids";
import MesaAyuda from "./pages/MesaAyuda";
import Eventos from "./pages/Eventos";
import Convocatorias from "./pages/Convocatorias";
import Formacion from "./pages/Formacion";
import KitHerramientas from "./pages/KitHerramientas";
import Enlaces from "./pages/Enlaces";
import Normatividad from "./pages/Normatividad";
import SemanaStem from "./pages/SemanaStem";
import Aliados from "./pages/Aliados";
import Premios from "./pages/Premios";
import CentroCiencia from "./pages/CentroCiencia";
import Publicaciones from "./pages/Publicaciones";
import Testimonios from "./pages/Testimonios";
import Nosotros from "./pages/Nosotros";
import CursoDetalle from "./pages/CursoDetalle";
import Login from "./pages/Login";
import CRM from "./pages/CRM";
import CRMNew from "./pages/CRMNew";
import LoadData from "./pages/LoadData";
import TerritorioStemItagui from "./pages/TerritorioStemItagui";
import EventosDetalle from "./pages/EventosDetalle";
import Reconocimientos from "./pages/Reconocimientos";
import SistemaSolar from "./pages/juegos/SistemaSolar";
import Matematicas from "./pages/juegos/Matematicas";
import FabricaInventos from "./pages/juegos/FabricaInventos";
import EnvigadoCurioso from "./pages/juegos/EnvigadoCurioso";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Switch>
           <Route path="/" component={Home} />
          <Route path="/nosotros" component={Nosotros} />
          <Route path="/curso/:id" component={CursoDetalle} />
          <Route path="/login" component={Login} />
          <Route path="/crm" component={CRM} />
          <Route path="/crm-new" component={CRMNew} />
          <Route path="/load-data" component={LoadData} />
          <Route path="/territorio-stem-itagui" component={TerritorioStemItagui} />
          <Route path="/evento/:id" component={EventosDetalle} />
          <Route path="/noticias" component={Noticias} />
          <Route path="/territorio-stem" component={TerritorioStem} />
          <Route path="/proyectos" component={Proyectos} />
          <Route path="/ie-oficiales" component={IEOficiales} />
          <Route path="/gestores" component={Gestores} />
          <Route path="/cid-kids" component={CIDKids} />
          <Route path="/mesa-ayuda" component={MesaAyuda} />
          <Route path="/eventos" component={Eventos} />
          <Route path="/convocatorias" component={Convocatorias} />
          <Route path="/formacion" component={Formacion} />
          <Route path="/kit-herramientas" component={KitHerramientas} />
          <Route path="/enlaces" component={Enlaces} />
          <Route path="/normatividad" component={Normatividad} />
          <Route path="/semana-stem" component={SemanaStem} />
          <Route path="/aliados" component={Aliados} />
          <Route path="/premios" component={Premios} />
          <Route path="/centro-ciencia" component={CentroCiencia} />
          <Route path="/publicaciones" component={Publicaciones} />
          <Route path="/testimonios" component={Testimonios} />
          <Route path="/reconocimientos" component={Reconocimientos} />
          <Route path="/juegos/espacio" component={SistemaSolar} />
          <Route path="/juegos/matematicas" component={Matematicas} />
          <Route path="/juegos/fabrica-inventos" component={FabricaInventos} />
          <Route path="/juegos/envigado-curioso" component={EnvigadoCurioso} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <ContactBanner />
      <Footer />
    </div>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
