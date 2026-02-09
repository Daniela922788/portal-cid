import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
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
            <p className="text-sm text-muted-foreground mb-4">
              Centro de Innovación Educativa dedicado a promover la innovación, la investigación y el desarrollo STEM en las instituciones educativas.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/proyectos" className="text-muted-foreground hover:text-primary transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-muted-foreground hover:text-primary transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="text-muted-foreground hover:text-primary transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="/convocatorias" className="text-muted-foreground hover:text-primary transition-colors">
                  Convocatorias
                </Link>
              </li>
              <li>
                <Link href="/centro-ciencia" className="text-muted-foreground hover:text-primary transition-colors">
                  Centro de Ciencia
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/kit-herramientas" className="text-muted-foreground hover:text-primary transition-colors">
                  Kit de Herramientas
                </Link>
              </li>
              <li>
                <Link href="/formacion" className="text-muted-foreground hover:text-primary transition-colors">
                  Formación
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
                <Link href="/enlaces" className="text-muted-foreground hover:text-primary transition-colors">
                  Enlaces de Interés
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
                  Calle 37 Sur # 39-45<br />
                  Envigado, Antioquia, Colombia
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+57 (4) 339 3000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="mailto:cid@envigado.gov.co" className="text-muted-foreground hover:text-primary transition-colors">
                  cid@envigado.gov.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} {APP_TITLE}. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/mesa-ayuda" className="hover:text-primary transition-colors">
              Mesa de Ayuda
            </Link>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">
              Términos y Condiciones
            </a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
