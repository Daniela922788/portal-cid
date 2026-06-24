import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search } from "lucide-react";
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

const dropdownItemClass =
  "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground";

export default function Header() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState<
    "" | "contenido" | "comunidad" | "recursos" | "quienes-somos"
  >("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ path: string; label: string }>>([]);
  const desktopSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const desktopNavMenuRef = useRef<HTMLDivElement>(null);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const showCidKids = false;
  const showProyectos = false;

  const mobileMenuItemClass =
    "px-5 py-2.5 rounded-md hover:bg-accent text-lg font-medium leading-7";
  const mobileAccordionTriggerClass = "px-3 py-2.5 text-lg font-medium leading-7";

  const normalizedLocation =
    (location.split("?")[0]?.split("#")[0] ?? "/").replace(/\/+$/, "") || "/";
  const normalizedLocationLower = normalizedLocation.toLowerCase();

  const isBlackLogoRoute =
    normalizedLocationLower === "/noticias" ||
    normalizedLocationLower === "/reconocimientos" ||
    normalizedLocationLower === "/semana-stem" ||
    normalizedLocationLower === "/semana-stem-complete" ||
    normalizedLocationLower === "/kit-herramientas";

  const transparentPaths = new Set([
    "/", "/nosotros", "/centro", "/gestores", "/territorio-stem",
    "/ie-oficiales", "/normatividad", "/formacion", "/mesa-ayuda",
    "/aliados", "/publicaciones", "/salas",
  ]);
  const isTransparent = transparentPaths.has(normalizedLocationLower);
  const isSolidDarkHeader = normalizedLocationLower === "/videos";
  const logoSrc = isBlackLogoRoute ? "/LOGO-NUEVO-CID-NEGRO.png" : "/LOGO-NUEVO-CID-BLANCO.png";
  const escudoAlcaldiaSrc = isBlackLogoRoute
    ? "/Logo-Escudo-Alcaldia-NEGRO.png"
    : "/Logo-Escudo-Alcaldia-BLANCO.png";
  const dividerColorClass = isBlackLogoRoute ? "bg-black/40" : "bg-white/60";

  const headerClassName = isTransparent
    ? "absolute top-0 z-50 w-full border-b-0 bg-transparent"
    : isSolidDarkHeader
    ? "sticky top-0 z-50 w-full border-b-0 bg-[#0f0f0f]"
    : "sticky top-0 z-50 w-full border-b-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60";

  /*
    ESTRATEGIA DE TAMAÑOS:
    - mobile  (<lg):   hamburguesa, logo pequeño, sin nav desktop
    - lg 1024px:       nav desktop aparece, botones h-9, logo h-9
    - xl 1280px:       MacBook 14" / pantallas medianas, botones h-10, logo h-10
    - 2xl 1536px:      pantallas grandes 24-27", botones h-11, logo h-11
    - 3xl personalizado ≥1920px: monitores 32"+, botones h-12, logo h-12

    El logo SIEMPRE tiene la misma altura que los botones del nav
    para que todo quede visualmente alineado.
  */
  const topLevelNavLinkClass = isTransparent
    ? [
        "group inline-flex w-max items-center justify-center rounded-md font-medium text-white transition-colors",
        "bg-black/35 hover:bg-black/50 hover:text-white focus:bg-black/50 focus:text-white focus:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        // altura y padding por breakpoint
        "h-10 px-3 text-[0.85rem]",
        "xl:h-11 xl:px-3.5 xl:text-[0.9rem]",
        "2xl:h-11 2xl:px-3.5 2xl:text-[0.9rem]",
      ].join(" ")
    : [
        "group inline-flex w-max items-center justify-center rounded-md font-medium transition-colors",
        "bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "h-10 px-3 text-[0.85rem]",
        "xl:h-11 xl:px-3.5 xl:text-[0.9rem]",
        "2xl:h-11 2xl:px-3.5 2xl:text-[0.9rem]",
      ].join(" ");

  const triggerClassName = isTransparent
    ? [
        "w-max rounded-md font-medium text-white",
        "bg-black/35 hover:bg-black/50 hover:text-white focus:bg-black/50 focus:text-white",
        "h-10 px-3 text-[0.85rem]",
        "xl:h-11 xl:px-3.5 xl:text-[0.9rem]",
        "2xl:h-11 2xl:px-3.5 2xl:text-[0.9rem]",
      ].join(" ")
    : [
        "w-max rounded-md font-medium text-foreground",
        "bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        "h-10 px-3 text-[0.85rem]",
        "xl:h-11 xl:px-3.5 xl:text-[0.9rem]",
        "2xl:h-11 2xl:px-3.5 2xl:text-[0.9rem]",
      ].join(" ");

  useEffect(() => {
    if (searchOpen) {
      const isDesktop =
        typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
      if (isDesktop) {
        desktopSearchInputRef.current?.focus();
      } else {
        mobileSearchInputRef.current?.focus();
      }
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!desktopMenuOpen) return;
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
    if (typeof window === "undefined") return false;
    const browserFind = (
      window as Window & {
        find?: (
          text: string,
          caseSensitive?: boolean,
          backwards?: boolean,
          wrapAround?: boolean,
          wholeWord?: boolean,
          searchInFrames?: boolean,
          showDialog?: boolean
        ) => boolean;
      }
    ).find;
    return browserFind?.(value, false, false, true, false, false, false) ?? false;
  };

  const goToSearchResult = (path: string, query: string) => {
    const value = query.trim();
    if (!value) return;
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
    if (typeof window === "undefined") return;
    const pendingQuery = sessionStorage.getItem("global-search-query");
    if (!pendingQuery) return;
    const timeoutId = window.setTimeout(() => {
      const found = runBrowserFind(pendingQuery);
      if (!found) {
        window.alert(
          `Se abrio la seccion relacionada, pero no se encontro el texto exacto: ${pendingQuery}`
        );
      }
      sessionStorage.removeItem("global-search-query");
    }, 250);
    return () => window.clearTimeout(timeoutId);
  }, [location]);

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = searchQuery.trim();
    if (!value || typeof window === "undefined") return;
    try {
      const response = await fetch(`/api/site-search?q=${encodeURIComponent(value)}`);
      if (!response.ok) throw new Error("Search API request failed");
      const data = (await response.json()) as { matches?: Array<{ path: string }> };
      const allowedPaths = new Set<string>(SEARCH_RESULT_SECTIONS.map((item) => item.path));
      const uniqueMatches = Array.from(
        new Set(
          (data.matches ?? []).map((match) => match.path).filter((path) => allowedPaths.has(path))
        )
      );
      const topResults = uniqueMatches
        .map((path) => ({ path, label: SEARCH_RESULT_LABELS.get(path) ?? path }))
        .slice(0, 5);
      setSearchResults(topResults);
      if (topResults.length === 0) {
        window.alert(`No se encontraron resultados para: ${value}`);
      }
    } catch {
      window.alert("No fue posible buscar en este momento. Intenta de nuevo.");
    }
  };

  return (
    <header className={headerClassName}>
      <div className="w-full pl-4 pr-1 sm:pl-6 sm:pr-2 md:pl-8 md:pr-4 lg:px-8 xl:px-10 2xl:px-12">
        {/*
          Grid de 3 columnas: logo (auto) | nav (1fr) | acciones (auto)

          Alturas del header sincronizadas con el logo y los botones:
            mobile  <lg  : h-14  (56px)
            lg 1024px    : h-16  (64px)   — MacBook 13" / pantallas pequeñas
            xl 1280px    : h-[4.5rem]     — MacBook 14-16" / pantallas medianas
            2xl 1536px   : h-20  (80px)   — monitores 24-27"
        */}
        <div className="grid w-full max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-x-3 h-16 lg:mx-auto lg:h-20 lg:gap-x-5 xl:h-24 xl:gap-x-7 2xl:h-28 2xl:gap-x-9">

          {/* ── Col 1: Logo ── */}
          {/*
            El logo usa la misma altura que los botones del nav en cada breakpoint.
            Así logo y menú siempre están visualmente alineados.
              mobile: h-8  (32px)
              lg:     h-9  (36px)
              xl:     h-10 (40px)
              2xl:    h-11 (44px)
          */}
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity hover:opacity-80"
          >
            {/* ── Escudo Alcaldía (primer logo) ── */}
            <img
              src={escudoAlcaldiaSrc}
              alt="Escudo Alcaldía de Envigado"
              className="h-12 w-auto lg:h-16 xl:h-20 2xl:h-24"
            />
            {/* ── Línea divisoria ── */}
            <span
              aria-hidden="true"
              className={`mx-3 h-9 w-px shrink-0 lg:mx-4 lg:h-12 xl:h-14 2xl:h-16 ${dividerColorClass}`}
            />
            {/* ── Logo CID (segundo logo) ── */}
            <img
              src={logoSrc}
              alt="Logo CID"
              className="h-12 w-auto lg:h-16 xl:h-20 2xl:h-24"
            />
          </Link>

          {/* ── Col 2: Navegación desktop (solo lg+) ── */}
          <nav className="hidden lg:flex items-center justify-center min-w-0">
            <NavigationMenu
              ref={desktopNavMenuRef}
              viewport={false}
              value={desktopMenuOpen}
              onValueChange={(value) =>
                setDesktopMenuOpen(
                  value as "" | "contenido" | "comunidad" | "recursos" | "quienes-somos"
                )
              }
            >
              <NavigationMenuList className="flex-wrap gap-0.5 xl:gap-1 2xl:gap-1.5">

                {/* Inicio */}
                <NavigationMenuItem>
                  <Link href="/">
                    <NavigationMenuLink className={topLevelNavLinkClass}>Inicio</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Quiénes somos */}
                <NavigationMenuItem value="quienes-somos">
                  <NavigationMenuTrigger
                    className={triggerClassName}
                    onPointerEnter={(e) => e.preventDefault()}
                    onPointerMove={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.preventDefault();
                      setDesktopMenuOpen((prev) =>
                        prev === "quienes-somos" ? "" : "quienes-somos"
                      );
                    }}
                  >
                    Quiénes somos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-full left-1/2 -translate-x-1/2 z-50">
                    <ul className="grid w-[460px] grid-cols-2 gap-3 p-4">
                      {[
                        { href: "/nosotros", title: "Nosotros", desc: "Misión, visión y valores del CID" },
                        { href: "/gestores", title: "Gestores de Innovación", desc: "Equipo de Gestores de Innovación" },
                        { href: "/salas", title: "Nuestros Espacios", desc: "Espacios educativos y ambientes de aprendizaje" },
                        { href: "/centro", title: "Aula Audiovisual", desc: "Aula de Experimentación Audiovisual del CID" },
                      ].map(({ href, title, desc }) => (
                        <li key={href}>
                          <Link href={href}>
                            <NavigationMenuLink className={dropdownItemClass}>
                              <div className="text-sm font-medium leading-none">{title}</div>
                              <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">{desc}</p>
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Contenido */}
                <NavigationMenuItem value="contenido">
                  <NavigationMenuTrigger
                    className={triggerClassName}
                    onPointerEnter={(e) => e.preventDefault()}
                    onPointerMove={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.preventDefault();
                      setDesktopMenuOpen((prev) => (prev === "contenido" ? "" : "contenido"));
                    }}
                  >
                    Contenido
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-full left-1/2 -translate-x-1/2 z-50">
                    <ul className="grid w-[460px] grid-cols-2 gap-3 p-4">
                      {[
                        { href: "/noticias", title: "Noticias", desc: "Noticias y menciones del CID" },
                        { href: "/videos", title: "Videos", desc: "Galería audiovisual del CID" },
                        ...(showProyectos
                          ? [{ href: "/proyectos", title: "Proyectos", desc: "Proyectos STEM e investigación" }]
                          : []),
                        { href: "/semana-stem-complete", title: "Semana STEM", desc: "Programa completo de la Semana STEM+" },
                        { href: "/publicaciones", title: "Publicaciones", desc: "Libros y revistas" },
                        { href: "/reconocimientos", title: "Reconocimientos", desc: "Premios y logros destacados" },
                      ].map(({ href, title, desc }) => (
                        <li key={href}>
                          <Link href={href}>
                            <NavigationMenuLink className={dropdownItemClass}>
                              <div className="text-sm font-medium leading-none">{title}</div>
                              <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">{desc}</p>
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Comunidad */}
                <NavigationMenuItem value="comunidad">
                  <NavigationMenuTrigger
                    className={triggerClassName}
                    onPointerEnter={(e) => e.preventDefault()}
                    onPointerMove={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.preventDefault();
                      setDesktopMenuOpen((prev) => (prev === "comunidad" ? "" : "comunidad"));
                    }}
                  >
                    Comunidad
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-full left-1/2 -translate-x-1/2 z-50">
                    <ul className="grid w-[460px] grid-cols-2 gap-3 p-4">
                      {[
                        { href: "/ie-oficiales", title: "IE Oficiales", desc: "Instituciones Educativas" },
                        { href: "/territorio-stem", title: "Territorio STEM", desc: "Proyectos y actores STEM Envigado" },
                        { href: "/aliados", title: "Aliados", desc: "Aliados estratégicos" },
                      ].map(({ href, title, desc }) => (
                        <li key={href}>
                          <Link href={href}>
                            <NavigationMenuLink className={dropdownItemClass}>
                              <div className="text-sm font-medium leading-none">{title}</div>
                              <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">{desc}</p>
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Recursos */}
                <NavigationMenuItem value="recursos">
                  <NavigationMenuTrigger
                    className={triggerClassName}
                    onPointerEnter={(e) => e.preventDefault()}
                    onPointerMove={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.preventDefault();
                      setDesktopMenuOpen((prev) => (prev === "recursos" ? "" : "recursos"));
                    }}
                  >
                    Recursos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-full left-1/2 -translate-x-1/2 z-50">
                    <ul className="grid w-[460px] grid-cols-2 gap-3 p-4">
                      {[
                        { href: "/normatividad", title: "Normatividad", desc: "Acuerdos, leyes, resoluciones y circulares" },
                      ].map(({ href, title, desc }) => (
                        <li key={href}>
                          <Link href={href}>
                            <NavigationMenuLink className={dropdownItemClass}>
                              <div className="text-sm font-medium leading-none">{title}</div>
                              <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">{desc}</p>
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Formación */}
                <NavigationMenuItem>
                  <Link href="/formacion">
                    <NavigationMenuLink className={topLevelNavLinkClass}>Formación</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Transparencia */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={topLevelNavLinkClass}>
                    <a href="https://www.envigado.gov.co/transparencia" target="_blank" rel="noreferrer">
                      Transparencia
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {showCidKids && (
                  <NavigationMenuItem>
                    <Link href="/cid-kids">
                      <NavigationMenuLink className={topLevelNavLinkClass}>CID Kids</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}

                {/* Contáctanos */}
                <NavigationMenuItem>
                  <Link href="/mesa-ayuda">
                    <NavigationMenuLink className={topLevelNavLinkClass}>Contáctanos</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* ── Col 3: Acciones (lupa + hamburguesa) ── */}
          <div className="flex shrink-0 items-center gap-1 -mr-2 lg:mr-0">

            {/* Desktop: form de búsqueda expandido O botón lupa */}
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center gap-2">
                <input
                  ref={desktopSearchInputRef}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchResults([]);
                  }}
                  type="text"
                  placeholder="Buscar en esta pagina"
                  className="h-9 w-32 xl:w-40 2xl:w-48 rounded-md border border-input bg-background px-3 text-sm"
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
                className={[
                  "hidden lg:inline-flex",
                  isTransparent ? "text-white hover:bg-black/25" : "",
                ].join(" ")}
                aria-label="Abrir busqueda"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Lupa móvil (solo < lg) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSearchOpen((prev) => !prev);
                setMobileMenuOpen(false);
                setSearchResults([]);
              }}
              className={isTransparent ? "lg:hidden text-white hover:bg-black/25" : "lg:hidden"}
              aria-label={searchOpen ? "Cerrar busqueda" : "Abrir busqueda"}
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Hamburguesa (solo < lg) */}
            <Button
              variant="ghost"
              size="icon"
              className={isTransparent ? "lg:hidden text-white hover:bg-black/25" : "lg:hidden"}
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

        {/* Buscador móvil desplegable */}
        {searchOpen && (
          <form onSubmit={handleSearchSubmit} className="lg:hidden border-t py-3">
            <div className="flex items-center gap-2">
              <input
                ref={mobileSearchInputRef}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
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

        {/* Resultados de búsqueda */}
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

        {/* Menú móvil desplegable */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4 bg-white">
            <nav className="flex flex-col gap-2">
              <Link href="/" className={mobileMenuItemClass} onClick={closeMobileMenu}>
                Inicio
              </Link>

              <Accordion type="single" collapsible className="px-2">
                <AccordionItem value="quienes-somos" className="border-b">
                  <AccordionTrigger className={mobileAccordionTriggerClass}>
                    Quiénes somos
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="flex flex-col gap-1">
                      <Link href="/nosotros" className={mobileMenuItemClass} onClick={closeMobileMenu}>Nosotros</Link>
                      <Link href="/gestores" className={mobileMenuItemClass} onClick={closeMobileMenu}>Gestores</Link>
                      <Link href="/salas" className={mobileMenuItemClass} onClick={closeMobileMenu}>Salas</Link>
                      <Link href="/centro" className={mobileMenuItemClass} onClick={closeMobileMenu}>Centro de Ciencia</Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="contenido" className="border-b">
                  <AccordionTrigger className={mobileAccordionTriggerClass}>Contenido</AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="flex flex-col gap-1">
                      <Link href="/noticias" className={mobileMenuItemClass} onClick={closeMobileMenu}>Noticias</Link>
                      <Link href="/videos" className={mobileMenuItemClass} onClick={closeMobileMenu}>Videos</Link>
                      {showProyectos && (
                        <Link href="/proyectos" className={mobileMenuItemClass} onClick={closeMobileMenu}>Proyectos</Link>
                      )}
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
                      <Link href="/normatividad" className={mobileMenuItemClass} onClick={closeMobileMenu}>Normatividad</Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link href="/formacion" className={mobileMenuItemClass} onClick={closeMobileMenu}>Formación</Link>
              <a
                href="https://www.envigado.gov.co/transparencia"
                target="_blank"
                rel="noreferrer"
                className={mobileMenuItemClass}
                onClick={closeMobileMenu}
              >
                Transparencia
              </a>
              {showCidKids && (
                <Link href="/cid-kids" className={mobileMenuItemClass} onClick={closeMobileMenu}>CID Kids</Link>
              )}
              <Link href="/mesa-ayuda" className={mobileMenuItemClass} onClick={closeMobileMenu}>Mesa de Ayuda</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}