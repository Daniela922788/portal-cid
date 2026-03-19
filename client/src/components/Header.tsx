import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { APP_TITLE } from "@/const";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SEARCH_RESULT_SECTIONS = [
  { path: "/nosotros", label: "Nosotros" },
  { path: "/semana-stem-complete", label: "Semana STEM" },
  { path: "/reconocimientos", label: "Reconocimientos" },
  { path: "/formacion", label: "Formacion" },
  { path: "/mesa-ayuda", label: "Contactanos" },
] as const;

const SEARCH_RESULT_LABELS = new Map<string, string>(
  SEARCH_RESULT_SECTIONS.map((item) => [item.path, item.label])
);

export default function Header() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState<"" | "contenido" | "comunidad" | "recursos">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ path: string; label: string }>>([]);
  const desktopSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const desktopNavMenuRef = useRef<HTMLDivElement>(null);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const showKitHerramientas = true;
  const showCidKids = false;
  const showProyectos = false;
  const mobileMenuItemClass = "px-4 py-2 rounded-md hover:bg-accent text-base font-medium leading-6";
  const mobileAccordionTriggerClass = "px-2 py-2 text-base font-medium leading-6";
  const isHome = location === "/";
  const headerClassName = isHome
    ? "absolute top-0 z-50 w-full border-b-0 bg-transparent"
    : "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60";
  const topLevelNavLinkClass = isHome
    ? "group inline-flex h-10 w-max items-center justify-center rounded-md bg-black/35 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/50 hover:text-white focus:bg-black/50 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50"
    : "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50";
  const triggerClassName = isHome
    ? "h-10 rounded-md bg-black/35 px-4 text-sm font-medium text-white hover:bg-black/50 hover:text-white focus:bg-black/50 focus:text-white"
    : "";

  useEffect(() => {
    if (searchOpen) {
      const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
      if (isDesktop) {
        desktopSearchInputRef.current?.focus();
      } else {
        mobileSearchInputRef.current?.focus();
      }
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!desktopMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (desktopNavMenuRef.current && !desktopNavMenuRef.current.contains(target)) {
        setDesktopMenuOpen("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [desktopMenuOpen]);

  const runBrowserFind = (value: string) => {
    if (typeof window === "undefined") {
      return false;
    }

    const browserFind = (window as Window & {
      find?: (
        text: string,
        caseSensitive?: boolean,
        backwards?: boolean,
        wrapAround?: boolean,
        wholeWord?: boolean,
        searchInFrames?: boolean,
        showDialog?: boolean
      ) => boolean;
    }).find;

    return browserFind?.(value, false, false, true, false, false, false) ?? false;
  };

  const goToSearchResult = (path: string, query: string) => {
    const value = query.trim();
    if (!value) {
      return;
    }

    if (path !== location) {
      sessionStorage.setItem("global-search-query", value);
      setLocation(path);
      setSearchOpen(false);
      setMobileMenuOpen(false);
      return;
    }

    const found = runBrowserFind(value);
    if (!found) {
      window.alert(`Se abrio la seccion relacionada, pero no se encontro el texto exacto: ${value}`);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const pendingQuery = sessionStorage.getItem("global-search-query");
    if (!pendingQuery) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const found = runBrowserFind(pendingQuery);
      if (!found) {
        window.alert(`Se abrio la seccion relacionada, pero no se encontro el texto exacto: ${pendingQuery}`);
      }
      sessionStorage.removeItem("global-search-query");
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [location]);

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = searchQuery.trim();

    if (!value || typeof window === "undefined") {
      return;
    }

    try {
      const response = await fetch(`/api/site-search?q=${encodeURIComponent(value)}`);
      if (!response.ok) {
        throw new Error("Search API request failed");
      }

      const data = (await response.json()) as { matches?: Array<{ path: string }> };
      const allowedPaths = new Set<string>(SEARCH_RESULT_SECTIONS.map((item) => item.path));
      const uniqueMatches = Array.from(
        new Set((data.matches ?? []).map((match) => match.path).filter((path) => allowedPaths.has(path)))
      );

      const topResults = uniqueMatches
        .map((path) => ({ path, label: SEARCH_RESULT_LABELS.get(path) ?? path }))
        .slice(0, 5);

      setSearchResults(topResults);

      if (topResults.length === 0) {
        window.alert(`No se encontraron resultados para: ${value}`);
        return;
      }

      // Keep the list visible so user can choose the destination section.
      return;
    } catch {
      window.alert("No fue posible buscar en este momento. Intenta de nuevo.");
    }
  };

  return (
    <header className={headerClassName}>
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y título */}
          <Link href="/" className="flex min-w-0 items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/logo-colores.png" alt="Logo CID" className="h-10 w-10" />
            <span className={`line-clamp-2 max-w-[185px] text-xs font-bold leading-tight sm:max-w-none sm:text-lg sm:leading-normal ${isHome ? "text-white drop-shadow" : "text-primary"}`}>
              {APP_TITLE}
            </span>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavigationMenu
              ref={desktopNavMenuRef}
              value={desktopMenuOpen}
              onValueChange={(value) => setDesktopMenuOpen(value as "" | "contenido" | "comunidad" | "recursos")}
            >
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/">
                    <NavigationMenuLink className={topLevelNavLinkClass}>
                      Inicio
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/nosotros">
                    <NavigationMenuLink className={topLevelNavLinkClass}>
                      Nosotros
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem value="contenido">
                  <NavigationMenuTrigger
                    className={triggerClassName}
                    onPointerEnter={(event) => event.preventDefault()}
                    onPointerMove={(event) => event.preventDefault()}
                    onClick={(event) => {
                      event.preventDefault();
                      setDesktopMenuOpen((prev) => (prev === "contenido" ? "" : "contenido"));
                    }}
                  >
                    Contenido
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li>
                        <Link href="/noticias">
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Noticias</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Noticias y menciones del CID
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      {showProyectos && (
                        <li>
                          <Link href="/proyectos">
                            <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Proyectos</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Proyectos STEM e investigación
                              </p>
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link href="/semana-stem-complete">
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Semana STEM</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Programa completo de la Semana STEM+
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/publicaciones">
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Publicaciones</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Libros y revistas
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/reconocimientos">
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Reconocimientos</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Premios y logros destacados
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem value="comunidad">
                  <NavigationMenuTrigger
                    className={triggerClassName}
                    onPointerEnter={(event) => event.preventDefault()}
                    onPointerMove={(event) => event.preventDefault()}
                    onClick={(event) => {
                      event.preventDefault();
                      setDesktopMenuOpen((prev) => (prev === "comunidad" ? "" : "comunidad"));
                    }}
                  >
                    Comunidad
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li>
                        <Link href="/ie-oficiales">
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">IE Oficiales</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Instituciones Educativas
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/territorio-stem">
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Territorio STEM</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Proyectos y actores STEM Envigado
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/aliados">
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Aliados</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Aliados estratégicos
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem value="recursos">
                  <NavigationMenuTrigger
                    className={triggerClassName}
                    onPointerEnter={(event) => event.preventDefault()}
                    onPointerMove={(event) => event.preventDefault()}
                    onClick={(event) => {
                      event.preventDefault();
                      setDesktopMenuOpen((prev) => (prev === "recursos" ? "" : "recursos"));
                    }}
                  >
                    Recursos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {showKitHerramientas && (
                        <li>
                          <Link href="/kit-herramientas">
                            <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Kit Herramientas</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Recursos para docentes
                              </p>
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link href="/normatividad">
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Normatividad</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Acuerdos, leyes, resoluciones y circulares
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/formacion">
                    <NavigationMenuLink className={topLevelNavLinkClass}>
                      Formación
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {showCidKids && (
                  <NavigationMenuItem>
                    <Link href="/cid-kids">
                      <NavigationMenuLink className={topLevelNavLinkClass}>
                        CID Kids
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}

                <NavigationMenuItem>
                  <Link href="/mesa-ayuda">
                    <NavigationMenuLink className={topLevelNavLinkClass}>
                      Contáctanos
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center gap-2">
                <input
                  ref={desktopSearchInputRef}
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setSearchResults([]);
                  }}
                  type="text"
                  placeholder="Buscar en esta pagina"
                  className="h-9 w-44 rounded-md border border-input bg-background px-3 text-sm"
                  aria-label="Buscar en la pagina"
                />
                <Button type="submit" variant="outline" size="sm">
                  Buscar
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  aria-label="Cerrar busqueda"
                  className="h-9 w-9"
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSearchOpen(true);
                  setSearchResults([]);
                }}
                className="hidden md:inline-flex"
                aria-label="Abrir busqueda"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSearchOpen((prev) => !prev);
                setMobileMenuOpen(false);
                setSearchResults([]);
              }}
              className="md:hidden"
              aria-label={searchOpen ? "Cerrar busqueda" : "Abrir busqueda"}
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            <Link href="/login">
              <Button variant="default" size="sm" className="hidden md:inline-flex">
                Iniciar Sesión
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => {
                setSearchOpen(false);
                setMobileMenuOpen(!mobileMenuOpen);
                setSearchResults([]);
              }}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Buscador móvil */}
        {searchOpen && (
          <form onSubmit={handleSearchSubmit} className="md:hidden border-t py-3">
            <div className="flex items-center gap-2">
              <input
                ref={mobileSearchInputRef}
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSearchResults([]);
                }}
                type="text"
                placeholder="Buscar en esta pagina"
                className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm"
                aria-label="Buscar en la pagina"
              />
              <Button type="submit" variant="outline" size="sm" className="h-10">
                Buscar
              </Button>
            </div>
          </form>
        )}

        {searchOpen && searchResults.length > 0 && (
          <div className="border-t py-2">
            <p className="px-1 pb-1 text-xs text-muted-foreground">Resultados (Top 5)</p>
            <div className="flex flex-col gap-1">
              {searchResults.map((result) => (
                <Button
                  key={result.path}
                  type="button"
                  variant="ghost"
                  className="h-9 justify-start"
                  onClick={() => goToSearchResult(result.path, searchQuery)}
                >
                  {result.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4">
            <nav className="flex flex-col gap-2">
              <Link href="/" className={mobileMenuItemClass} onClick={closeMobileMenu}>Inicio</Link>
              <Link href="/nosotros" className={mobileMenuItemClass} onClick={closeMobileMenu}>Nosotros</Link>

              <Accordion type="single" collapsible className="px-2">
                <AccordionItem value="contenido" className="border-b">
                  <AccordionTrigger className={mobileAccordionTriggerClass}>Contenido</AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="flex flex-col gap-1">
                      <Link href="/noticias" className={mobileMenuItemClass} onClick={closeMobileMenu}>Noticias</Link>
                      {showProyectos && <Link href="/proyectos" className={mobileMenuItemClass} onClick={closeMobileMenu}>Proyectos</Link>}
                      <Link href="/semana-stem-complete" className={mobileMenuItemClass} onClick={closeMobileMenu}>Semana STEM</Link>
                      <Link href="/publicaciones" className={mobileMenuItemClass} onClick={closeMobileMenu}>Publicaciones</Link>
                      <Link href="/reconocimientos" className={mobileMenuItemClass} onClick={closeMobileMenu}>Reconocimientos</Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="comunidad" className="border-b">
                  <AccordionTrigger className={mobileAccordionTriggerClass}>Comunidad</AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="flex flex-col gap-1">
                      <Link href="/ie-oficiales" className={mobileMenuItemClass} onClick={closeMobileMenu}>IE Oficiales</Link>
                      <Link href="/territorio-stem" className={mobileMenuItemClass} onClick={closeMobileMenu}>Territorio STEM</Link>
                      <Link href="/aliados" className={mobileMenuItemClass} onClick={closeMobileMenu}>Aliados</Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="recursos" className="border-b-0">
                  <AccordionTrigger className={mobileAccordionTriggerClass}>Recursos</AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="flex flex-col gap-1">
                      {showKitHerramientas && (
                        <Link href="/kit-herramientas" className={mobileMenuItemClass} onClick={closeMobileMenu}>Kit Herramientas</Link>
                      )}
                      <Link href="/normatividad" className={mobileMenuItemClass} onClick={closeMobileMenu}>Normatividad</Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link href="/formacion" className={mobileMenuItemClass} onClick={closeMobileMenu}>Formación</Link>
              {showCidKids && <Link href="/cid-kids" className={mobileMenuItemClass} onClick={closeMobileMenu}>CID Kids</Link>}
              <Link href="/mesa-ayuda" className={mobileMenuItemClass} onClick={closeMobileMenu}>Mesa de Ayuda</Link>
              <Link href="/login" className={`${mobileMenuItemClass} text-primary`} onClick={closeMobileMenu}>Iniciar Sesión</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
