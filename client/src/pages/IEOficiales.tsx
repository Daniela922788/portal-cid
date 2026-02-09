import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, School, Microscope, Upload } from "lucide-react";

interface IE {
  id: number;
  nombre: string;
  rector: string;
  telefono: string;
  direccion: string;
  sitioWeb: string;
  imagen?: string;
  logo?: string;
}


const iesData: IE[] = [
  { id: 1, nombre: "Institución Educativa Alejandro Vélez Barrientos", rector: "Ana Luz Henao Ospina", telefono: "604 332 43 66", direccion: "Dg. 29 No. 35D SUR 10, Barrio La Sebastiana", sitioWeb: "https://www.iealejandrovelez.edu.co/", imagen: "/InstituciónEducativaAlejandroVélezBarrientos.jpg" },
  { id: 2, nombre: "Institución Educativa San Vicente Alto de las Flores", rector: "Isabel Cristina Montoya Posada", telefono: "312 765 8029", direccion: "CALLE 41 SUR # 24 C 71 Barrio La Mina", sitioWeb: "https://www.iesanvicente.edu.co/", imagen: "/InstituciónEducativaSanVicenteAltodelasFlores.jpg" },
  { id: 3, nombre: "Institución Educativa Comercial de Envigado", rector: "Oswaldo Quiceno Guarín", telefono: "604 333 33 73", direccion: "Carrera 45C N° 39 Sur-11 Alcalá", sitioWeb: "https://www.iece.edu.co/", imagen: "/InstituciónEducativaComercialdeEnvigado.jpg" },
  { id: 4, nombre: "Institución Educativa Darío de Bedout", rector: "Maria Nohelia Ochoa Betancur", telefono: "319 784 6802", direccion: "Calle 53 sur N° 39 - 62 Alto de las Flores", sitioWeb: "https://iedariodebedout.edu.co/", imagen: "/InstituciónEducativaDaríodeBedout.jpg", logo: "/InstituciónEducativaDaríodeBedout.png" },
  { id: 5, nombre: "Institución Educativa El Salado", rector: "William Alonso Gaviria Campuzano", telefono: "324 516 7648", direccion: "Carrera 25 No. 39D SUR 60 Envigado", sitioWeb: "https://www.iesalado.edu.co/", imagen: "/InstituciónEducativaElSalado.jpg" },
  { id: 6, nombre: "Institución Educativa José Manuel Restrepo Vélez", rector: "Francy Esperanza Chávez Jaime", telefono: "2763988", direccion: "Calle 38 Sur # 45 A 87 Barrio Alcalá", sitioWeb: "https://www.jomar.edu.co/", imagen: "/InstituciónEducativaJoséManuelRestrepoVélez.jpg" },
  { id: 7, nombre: "Institución Educativa José Miguel de la Calle", rector: "Doris Omaira Sánchez Álvarez", telefono: "276 24 26", direccion: "Tv 34b sur # 31e66 # 31e, Zona 9", sitioWeb: "https://www.lajose.edu.co/", imagen: "/InstituciónEducativaJoséMigueldelaCalle.png" },
  { id: 8, nombre: "Institución Educativa La Paz", rector: "Jorge Marulanda Carmona", telefono: "276 77 97", direccion: "Calle 46 S Nro. 42", sitioWeb: "https://www.institucioneducativalapaz.edu.co/", imagen: "/InstituciónEducativaLaPaz.jpg", logo: "/InstituciónEducativaLaPaz.png" },
  { id: 9, nombre: "Institución Educativa Las Palmas", rector: "Ana Lucia Rivera", telefono: "6043860198", direccion: "Calle 25B Sur #5D61. – Sector los Lotes- Las Palmas", sitioWeb: "https://www.ielaspalmas.edu.co/", imagen: "/InstituciónEducativaLasPalmas.JPG", logo: "/InstituciónEducativaLasPalmas.png" },
  { id: 10, nombre: "Institución Educativa Manuel Uribe Ángel", rector: "Francisco E. Lopera Salgado", telefono: "604 276 17 88", direccion: "Carrera 44 No. 38 SUR - 15, Envigado", sitioWeb: "https://www.iemua.edu.co/", imagen: "/InstituciónEducativaManuelUribeÁngel.JPG", logo: "/InstituciónEducativaManuelUribeÁngel.png" },
  { id: 11, nombre: "Institución Educativa María Poussepin", rector: "Margarita María Gutiérrez Cano", telefono: "604 276 17 56", direccion: "Calle 37 SUR No. 33 - 14, Envigado", sitioWeb: "https://www.iemariapoussepin.edu.co/", imagen: "/InstituciónEducativaMaríaPoussepin.JPG", logo: "/InstituciónEducativaMaríaPoussepin.png" },
  { id: 12, nombre: "Institución Educativa Martín Eduardo Ríos Llanos", rector: "Roberto Torres Payares", telefono: "276 47 55", direccion: "Calle 45B sur N° 42c -09", sitioWeb: "https://iemartineduardorios.edu.co/", imagen: "/InstituciónEducativaMartínEduardoRíosLlanos.png" },
  { id: 13, nombre: "Institución Educativa Normal Superior de Envigado", rector: "Pedro Alonso Rivera Bustamante", telefono: "304 283 82 40", direccion: "Calle 34DD SUR No. 28 - 24", sitioWeb: "https://www.iende.edu.co/", imagen: "/InstituciónEducativaNormalSuperiordeEnvigado.jpg", logo: "/InstituciónEducativaNormalSuperiordeEnvigado.png" },
  { id: 14, nombre: "Institución Educativa Leticia Arango de Avendaño", rector: "Margarita María Gutiérrez Cano", telefono: "538 01 01", direccion: "Vereda Pantanillo", sitioWeb: "https://leticiaarango.edu.co/", imagen: "/InstituciónEducativaLeticiaArangodeAvendaño.JPG" },
];

export default function IEOficiales() {
  const [busqueda, setBusqueda] = useState("");
  const [iesEditadas, setIesEditadas] = useState<{ [key: number]: IE }>({});

  const iesFiltradas = iesData.filter(ie => 
    ie.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleImagenChange = (ieId: number, imagenUrl: string) => {
    setIesEditadas({
      ...iesEditadas,
      [ieId]: {
        ...iesData.find(ie => ie.id === ieId)!,
        imagen: imagenUrl
      }
    });
  };

  const getIEData = (ieId: number) => {
    return iesEditadas[ieId] || iesData.find(ie => ie.id === ieId)!;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "IE Oficiales" }]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Instituciones Educativas Oficiales</h1>
          <p className="text-xl text-muted-foreground">
            Conoce las instituciones educativas oficiales del municipio de Envigado
          </p>
        </div>

        {/* Instituciones Educativas */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Instituciones Educativas Participantes</h2>
          
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nombre..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {iesFiltradas.map((ie) => {
              const ieData = getIEData(ie.id);
              return (
                <Card key={ie.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  {/* Área de imagen */}
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center overflow-hidden relative group">
                    {ieData.imagen ? (
                      <img
                        src={ieData.imagen}
                        alt={ie.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Sin imagen</p>
                      </div>
                    )}
                    
                    {/* Overlay para cambiar imagen */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <label className="cursor-pointer">
                        <div className="bg-white rounded-lg p-3 hover:bg-gray-100">
                          <Upload className="h-5 w-5 text-primary" />
                        </div>
                        <input
                          type="text"
                          placeholder="URL de imagen"
                          className="hidden"
                          onBlur={(e) => {
                            if (e.currentTarget.value) {
                              handleImagenChange(ie.id, e.currentTarget.value);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>



                  <CardHeader>
                    <div className="flex items-start gap-3 mb-3">
                      {ieData.logo ? (
                        <img
                          src={ieData.logo}
                          alt={`Logo ${ie.nombre}`}
                          className="h-12 w-12 object-contain flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <School className="h-6 w-6 text-primary" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg">{ie.nombre}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-2 text-sm flex-1 flex flex-col">
                    <div>
                      <span className="text-muted-foreground">Rector:</span>
                      <p className="font-medium">{ieData.rector}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Teléfono:</span>
                      <p className="font-medium">{ieData.telefono}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Dirección:</span>
                      <p className="font-medium">{ieData.direccion}</p>
                    </div>

                    <Button variant="outline" className="w-full mt-4" asChild>
                      <a href={ieData.sitioWeb} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visitar Sitio Web
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {iesFiltradas.length === 0 && (
            <div className="text-center py-12">
              <School className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No se encontraron instituciones</h3>
              <p className="text-muted-foreground">Intenta con otro término de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
