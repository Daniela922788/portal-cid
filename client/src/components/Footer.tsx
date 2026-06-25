import { Link } from "wouter";
import { Mail, Phone, MapPin, Instagram, Youtube } from "lucide-react";
import { APP_TITLE } from "@/const";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información del CID */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">{APP_TITLE}</h3>
            <p className="text-sm text-muted-foreground">
              Centro de Innovación y Desarrollo dedicado a promover la innovación, la investigación y el desarrollo STEM.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/formacion" className="text-muted-foreground hover:text-primary transition-colors">
                  Formación
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-muted-foreground hover:text-primary transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="/semana-stem-complete" className="text-muted-foreground hover:text-primary transition-colors">
                  Semana STEM
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-muted-foreground hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/videos" className="text-muted-foreground hover:text-primary transition-colors">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/publicaciones" className="text-muted-foreground hover:text-primary transition-colors">
                  Publicaciones
                </Link>
              </li>
              <li>
                <Link href="/normatividad" className="text-muted-foreground hover:text-primary transition-colors">
                  Normatividad
                </Link>
              </li>
              <li>
                <Link href="/aliados" className="text-muted-foreground hover:text-primary transition-colors">
                  Aliados
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  Cl. 37 Sur # 45 B-27, Zona 8<br />
                  Envigado, Antioquia, Colombia
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">(+57) 301 2577662</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="mailto:innovacion@envigado.edu.co" className="text-muted-foreground hover:text-primary transition-colors">
                  Innovacion@envigado.edu.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Logos institucionales (izquierda) + YouTube/copyright (derecha) ── */}
        <div className="border-t mt-8 pt-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Logos a la izquierda */}
          <div className="flex items-center gap-6">
            <img
              src="/Logo-Escudo-Alcaldia-NEGRO.png"
              alt="Escudo Alcaldía de Envigado"
              className="h-20 w-auto"
            />
            <img
              src="/LOGO-NUEVO-CID-NEGRO.png"
              alt="Logo CID"
              className="h-20 w-auto"
            />
          </div>

          {/* YouTube + copyright a la derecha */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <a
              href="https://www.youtube.com/@CentrodeInnovaci%C3%B3nyDesarrollo/featured"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Canal de YouTube del CID"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Youtube className="h-6 w-6" />
            </a>
            <p className="text-sm text-muted-foreground">
              © {currentYear} {APP_TITLE}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* ── Barra Marca País + GOV.CO (Portal Único del Estado Colombiano) ── */}
      <div className="bg-[#1c1c1c] py-5">
        <div className="container flex items-center justify-end gap-6">
          <a
            href="https://www.colombia.co"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Marca País Colombia"
            className="transition-opacity hover:opacity-90"
          >
            <img
              src="/colombia-co-blanco.webp"
              alt="Colombia CO"
              className="h-7 w-auto"
            />
          </a>
          <a
            href="https://www.gov.co"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ir a GOV.CO, Portal Único del Estado Colombiano"
            className="transition-opacity hover:opacity-90"
          >
            <img
              src="/logo_gov_blanco_res.webp"
              alt="GOV.CO - Portal Único del Estado Colombiano"
              className="h-7 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}