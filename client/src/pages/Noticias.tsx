import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, ExternalLink, Newspaper, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";

type NoticiaLocal = {
  id: string;
  titulo: string;
  fecha: string;
  resumen: string;
  contenido: string[];
  tipo: "propia" | "mencion";
  imagenes: string[];
  autor?: string;
};

type NoticiaUI = {
  id: string;
  titulo: string;
  fecha: string;
  resumen: string;
  tipo: "propia" | "mencion";
  imagenes: string[];
  autor?: string;
  contenido?: string[];
};

const noticiasLocales: NoticiaLocal[] = [
  {
    id: "envigado-red-nacional-ciudades-aprendizaje",
    titulo: "Envigado se suma a la Red Nacional de Ciudades del Aprendizaje",
    fecha: "2026-02-04",
    resumen:
      "Envigado hace parte de la recién creada Red Nacional de Ciudades del Aprendizaje, integrada por ciudades que representan a Colombia ante la Red Mundial de la UNESCO.",
    contenido: [
      "Envigado hace parte de la recién creada Red Nacional de Ciudades del Aprendizaje, integrada además por Medellín, La Estrella, Bogotá, Manizales, Quibdó, Rionegro, Chía y Tunja, que representan a Colombia ante la Red Mundial de la UNESCO. Esta articulación busca consolidar territorios inteligentes, inclusivos y sostenibles, donde la educación, la innovación y la transferencia de conocimiento sean pilares del desarrollo.",
      "Con este logro, Envigado reafirma su compromiso de construir desarrollo desde la formación permanente y las oportunidades reales para su comunidad, fortaleciendo capacidades locales y aportando al cumplimiento de los Objetivos de Desarrollo Sostenible.",
      "La Red Mundial de Ciudades del Aprendizaje de la UNESCO reúne actualmente a 425 ciudades de 91 países, promoviendo políticas públicas orientadas al aprendizaje a lo largo de la vida, la cooperación internacional y la garantía del derecho a la educación en todas las etapas.",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/Envigado%20se%20suma%20a%20la%20Red%20Nacional%20de%20Ciudades%20del%20Aprendizaje/1.jpeg",
      "/Noticias/Envigado%20se%20suma%20a%20la%20Red%20Nacional%20de%20Ciudades%20del%20Aprendizaje/2.jpeg",
      "/Noticias/Envigado%20se%20suma%20a%20la%20Red%20Nacional%20de%20Ciudades%20del%20Aprendizaje/3.jpeg",
      "/Noticias/Envigado%20se%20suma%20a%20la%20Red%20Nacional%20de%20Ciudades%20del%20Aprendizaje/4.jpeg",
    ],
    autor: "Municipio de Envigado",
  },
  {
    id: "estudiantes-el-salado-estrenaron-computadores",
    titulo: "Estudiantes de la I. E. El Salado, en Envigado, estrenaron computadores",
    fecha: "2026-01-29",
    resumen:
      "La Alcaldía de Envigado entregó 28 computadores nuevos para fortalecer el aula de sistemas de la I. E. El Salado.",
    contenido: [
      "La Alcaldía de Envigado entregó 28 computadores nuevos, como dotación al aula de sistemas de la Institución Educativa El Salado, como parte de la estrategia de mejoramiento tecnológico que se implementa a través de la Secretaría de Educación.",
      "El valor total de estos equipos ascendió a $136 millones, gestionados a través de los convenios que la Administración Municipal suscribe con entidades privadas como contraprestación a la exoneración del impuesto predial, como lo establece el Acuerdo Municipal 046 de 2024.",
      "El Liceo Francisco Restrepo Molina y la Fundación Unidad Educativa San Marcos acogieron esta disposición municipal a través de la entrega de los equipos de cómputo, que servirán para fortalecer competencias tecnológicas en los estudiantes de la I. E. El Salado.",
      "El Alcalde Raúl Cardona González, se refirió a esta nueva dotación como \"un importante aporte a la educación, a través equipos con especificaciones apropiadas para el desarrollo de competencias tecnológicas y proyectos en informática\"",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/Estudiantes%20de%20la%20I.%20E.%20El%20Salado,%20en%20Envigado,%20estrenaron%20computadores/151822_estudiantes-de-la-i-e-el-salado-en-envigado-estrenaron_1024x600.jpeg",
      "/Noticias/Estudiantes%20de%20la%20I.%20E.%20El%20Salado,%20en%20Envigado,%20estrenaron%20computadores/151823_whatsapp-image-20260129-at-23459-pm_1024x600.jpeg",
      "/Noticias/Estudiantes%20de%20la%20I.%20E.%20El%20Salado,%20en%20Envigado,%20estrenaron%20computadores/151824_whatsapp-image-20260129-at-23502-pm_1024x600.jpeg",
      "/Noticias/Estudiantes%20de%20la%20I.%20E.%20El%20Salado,%20en%20Envigado,%20estrenaron%20computadores/151825_whatsapp-image-20260129-at-23459-pm-1_1024x600.jpeg",
      "/Noticias/Estudiantes%20de%20la%20I.%20E.%20El%20Salado,%20en%20Envigado,%20estrenaron%20computadores/151826_whatsapp-image-20260129-at-23459-pm-2_1024x600.jpeg",
      "/Noticias/Estudiantes%20de%20la%20I.%20E.%20El%20Salado,%20en%20Envigado,%20estrenaron%20computadores/151827_whatsapp-image-20260129-at-23500-pm-2_1024x600.jpeg",
      "/Noticias/Estudiantes%20de%20la%20I.%20E.%20El%20Salado,%20en%20Envigado,%20estrenaron%20computadores/151828_whatsapp-image-20260129-at-23500-pm-1_1024x600.jpeg",
      "/Noticias/Estudiantes%20de%20la%20I.%20E.%20El%20Salado,%20en%20Envigado,%20estrenaron%20computadores/151829_whatsapp-image-20260129-at-23501-pm_1024x600.jpeg",
      "/Noticias/Estudiantes%20de%20la%20I.%20E.%20El%20Salado,%20en%20Envigado,%20estrenaron%20computadores/151830_whatsapp-image-20260129-at-23500-pm-3_1024x600.jpeg",
    ],
    autor: "Alcaldía de Envigado",
  },
  {
    id: "envigado-ganador-reto-nacional-educacion-2025",
    titulo: "Envigado, ganador del Reto Nacional por la Educación 2025",
    fecha: "2025-12-10",
    resumen:
      "Envigado fue exaltado como ganador del Reto Nacional por la Educación 2025 en la categoría IV, reconocimiento promovido por Colombia Líder.",
    contenido: [
      "Envigado fue exaltado como ganador del Reto Nacional por la Educación 2025 en la categoría IV (municipios con población superior a 100.001 habitantes), reconocimiento promovido por la organización Colombia Líder.",
      "La distinción se otorgó gracias a la mayor inversión presupuestal en educación, programas para fortalecer la calidad, una cobertura superior al 99%, formación en habilidades blandas y competencias STEM+, además de la promoción de saberes y oportunidades de aprendizaje a lo largo de la vida.",
      "Entre las experiencias destacadas por la Administración Municipal se encuentran la formación STEM+ a más de mil estudiantes en robótica, programación e inteligencia artificial; la articulación con instituciones técnicas que permite que el 42,5% de los estudiantes accedan a formación laboral y obtengan además de su título como bachilleres, certificados de aptitud ocupacional al finalizar la media; y la implementación de Zonas de Orientación Escolar, que atienden de manera permanente la salud mental de estudiantes y docentes, reduciendo el estrés laboral y la deserción escolar.",
      "Para la Alcaldía de Envigado, este reconocimiento avala los procesos de transformación educativa que consolidan al municipio como un territorio de oportunidades, guiado por la innovación, la creatividad y el compromiso con la calidad.",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/Envigado,%20ganador%20del%20Reto%20Nacional%20por%20la%20Educaci%C3%B3n%202025/1.jpeg",
      "/Noticias/Envigado,%20ganador%20del%20Reto%20Nacional%20por%20la%20Educaci%C3%B3n%202025/2.jpg",
    ],
    autor: "Alcaldía de Envigado",
  },
  {
    id: "envigado-reconocimiento-foro-latinoamericano-ciudades-aprendizaje",
    titulo: "Envigado recibió reconocimiento por sus buenas prácticas en Foro Latinoamericano de Ciudades del Aprendizaje",
    fecha: "2025-11-06",
    resumen:
      "El Municipio de Envigado recibió un reconocimiento de la Red Latinoamericana de Ciudades del Aprendizaje por su experiencia de territorio STEM + SMART Regenerativo.",
    contenido: [
      "El Municipio de Envigado recibió el reconocimiento otorgado por la Red Latinoamericana de Ciudades del Aprendizaje por su experiencia Construyendo futuro: territorio STEM + SMART Regenerativo, teniendo en cuenta las buenas prácticas que se implementan en el territorio y que apuntan a la implementación de programas de aprendizaje para el cierre de la brecha digital y el desarrollo de competencias en docentes y estudiantes, en función de su contexto socioeconómico y su sentido de pertenencia hacia el municipio. La entrega del reconocimiento se llevó a cabo en ceremonia oficial desde la ciudad de La Paz (México), dentro del Tercer Foro de Ciudades del Aprendizaje de Latinoamérica Aprendizaje basado en el lugar.",
      "La experiencia presentada desde Envigado proyecta el territorio con la promoción de estrategias y experiencias de aprendizaje a lo largo de la vida, para desarrollar competencias, conocimientos, actitudes y valores a través de procesos de investigación, promoción de la ciencia, la tecnología y la innovación. En el sistema educativo local se entiende lo regenerativo como una apuesta que hace énfasis en la sostenibilidad, el pensamiento crítico, la conciencia ambiental, la equidad y el compromiso ciudadano, a través de una perspectiva pedagógica.",
      "Es importante señalar que la UNESCO ratificó a Envigado como parte de la Red Global de Ciudades del Aprendizaje, designación que tiene desde 2022 y que le permite recibir y transferir buenas prácticas educativas de alto impacto global, como las que se tienen en temas como la promoción de habilidades STEM entre sus estudiantes.",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/Envigado%20recibi%C3%B3%20reconocimiento%20por%20sus%20buenas%20pr%C3%A1cticas%20en%20Foro%20Latinoamericano%20de%20Ciudades%20del%20Aprendizaje/1.jpeg",
      "/Noticias/Envigado%20recibi%C3%B3%20reconocimiento%20por%20sus%20buenas%20pr%C3%A1cticas%20en%20Foro%20Latinoamericano%20de%20Ciudades%20del%20Aprendizaje/2.jpeg",
      "/Noticias/Envigado%20recibi%C3%B3%20reconocimiento%20por%20sus%20buenas%20pr%C3%A1cticas%20en%20Foro%20Latinoamericano%20de%20Ciudades%20del%20Aprendizaje/3.jpeg",
      "/Noticias/Envigado%20recibi%C3%B3%20reconocimiento%20por%20sus%20buenas%20pr%C3%A1cticas%20en%20Foro%20Latinoamericano%20de%20Ciudades%20del%20Aprendizaje/4.jpeg",
    ],
    autor: "Municipio de Envigado",
  },
  {
    id: "envigado-gala-maestro-2025",
    titulo: "Envigado exaltó a los mejores docentes de 2025 en la Gala del Maestro",
    fecha: "2025-10-14",
    resumen:
      "La Alcaldía de Envigado reconoció a docentes y directivos docentes destacados en la tradicional Gala del Maestro 2025.",
    contenido: [
      "La Alcaldía de Envigado hizo reconocimiento a los docentes y directivos docentes que se destacaron durante este año escolar 2025, en la tradicional Gala del Maestro. En este evento se premian las experiencias educativas y buenas prácticas de aula a lo largo del período escolar en las instituciones educativas públicas del territorio.",
      "Esta actividad hace parte del programa de bienestar laboral y de formación y capacitación para los 705 docentes y 40 directivos docentes de los planteles educativos oficiales de Envigado. En esta ocasión se destacó a:",
      "Claudia Andrea Ríos Ocampo, en la categoría: Reconocimiento a las experiencias significativas y creativas.",
      "Jaime Alonso Chavarriaga Bedoya, en la categoría: Reconocimiento al docente inspirador de talentos y proyección de estos en la comunidad educativa.",
      "Ana Lucía Ceballos Duque, en la categoría: Reconocimiento al docente que promueve experiencias de aprendizaje con sentido social para la convivencia de los estudiantes.",
      "John Alexander Echeverri Acosta, en la categoría: Reconocimiento al liderazgo del docente para favorecer la alineación de voluntades académicas y sociales, orientadas al mejoramiento de procesos, programas o proyectos de la comunidad educativa.",
      "Luz Janet Gómez Arroyave fue destacada como docente que dejó un legado significativo de trascendencia para la comunidad educativa envigadeña.",
      "Claudia Elena Cardona Villa fue la elegida para el reconocimiento a los docentes que resignifican la práctica pedagógica en educación inicial con enfoque en atención integral.",
      "Elis Yaneth Vides Bulloso obtuvo el reconocimiento al docente que promueve experiencias que fomentan la investigación como estrategia de desarrollo escolar.",
      "Carolina Torres Lasso fue exaltada como docente que promueve experiencias que fomentan la innovación educativa como estrategia de desarrollo escolar.",
      "Este encuentro sirvió para rendir tributo póstumo a la docente Dora Inés Molina Ramírez, fallecida a comienzos del presente año.",
      "Envigado agradece a todos los maestros su entrega y compromiso con la niñez y la juventud. Gracias por hacer de nuestra ciudad un lugar donde la educación es el reflejo del amor por la gente y el compromiso con los sueños y proyectos de vida que se gestan en nuestra Ciudad del Aprendizaje.",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/Envigado%20exalt%C3%B3%20a%20los%20mejores%20docentes%20de%202025%20en%20la%20Gala%20del%20Maestro/145681_envigado-exalto-a-los-mejores-docentes-de-2025-en-la_1024x600.jpeg",
      "/Noticias/Envigado%20exalt%C3%B3%20a%20los%20mejores%20docentes%20de%202025%20en%20la%20Gala%20del%20Maestro/145683_whatsapp-image-20251014-at-104909-am_1024x600.jpeg",
      "/Noticias/Envigado%20exalt%C3%B3%20a%20los%20mejores%20docentes%20de%202025%20en%20la%20Gala%20del%20Maestro/145684_whatsapp-image-20251014-at-104911-am-1_1024x600.jpeg",
      "/Noticias/Envigado%20exalt%C3%B3%20a%20los%20mejores%20docentes%20de%202025%20en%20la%20Gala%20del%20Maestro/145685_whatsapp-image-20251014-at-104911-am_1024x600.jpeg",
      "/Noticias/Envigado%20exalt%C3%B3%20a%20los%20mejores%20docentes%20de%202025%20en%20la%20Gala%20del%20Maestro/145686_whatsapp-image-20251014-at-104912-am-1_1024x600.jpeg",
      "/Noticias/Envigado%20exalt%C3%B3%20a%20los%20mejores%20docentes%20de%202025%20en%20la%20Gala%20del%20Maestro/145687_whatsapp-image-20251014-at-104912-am-2_1024x600.jpeg",
      "/Noticias/Envigado%20exalt%C3%B3%20a%20los%20mejores%20docentes%20de%202025%20en%20la%20Gala%20del%20Maestro/145688_whatsapp-image-20251014-at-104913-am_1024x600.jpeg",
      "/Noticias/Envigado%20exalt%C3%B3%20a%20los%20mejores%20docentes%20de%202025%20en%20la%20Gala%20del%20Maestro/145690_whatsapp-image-20251014-at-104914-am-2_1024x600.jpeg",
    ],
    autor: "Alcaldía de Envigado",
  },
  {
    id: "ie-comercial-envigado-premio-santillana-2025",
    titulo:
      "La I.E. Comercial de Envigado ganó el Premio Santillana al mejor proyecto de sostenibilidad ambiental en Colombia",
    fecha: "2025-10-03",
    resumen:
      "La Institución Educativa Comercial de Envigado fue reconocida con el Premio Santillana por el mejor proyecto del país en sostenibilidad ambiental.",
    contenido: [
      "La Institución Educativa Comercial de Envigado fue reconocida con el Premio Santillana como el mejor proyecto del país en sostenibilidad ambiental, gracias a una propuesta innovadora que articula procesos educativos, conciencia ecológica y cultura de paz.",
      "El proyecto Metodología de Investigación Socioambiental GCA, desarrollado por la institución, fue seleccionado entre los 10 finalistas nacionales en la categoría secundaria del Premio Escuelas Sostenibles, organizado por Santillana, la Organización de Estados Iberoamericanos (OEI) y la Fundación Santillana. La ceremonia de premiación se realizó en Bogotá, en el marco de la tercera edición del galardón, que busca visibilizar e inspirar iniciativas escolares que integren sostenibilidad ambiental, social y de gobernanza.",
      "Este logro es fruto del trabajo conjunto entre estudiantes, docentes, directivos y familias, con el acompañamiento de la Secretaría de Educación de Envigado y el respaldo permanente del alcalde Raúl Cardona, quien ha promovido la investigación y la innovación como pilares de la formación integral.",
      "El proyecto galardonado, que también aborda aprendizajes derivados del contexto del COVID-19, será presentado próximamente en Brasil como parte de una misión internacional de intercambio académico. Envigado continúa demostrando que la educación es motor de transformación, sostenibilidad y construcción de sociedad.",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/La%20I.E.%20Comercial%20de%20Envigado%20gan%C3%B3%20el%20Premio%20Santillana%20al%20mejor%20proyecto%20de%20sostenibilidad%20ambiental%20en%20Colombia/145363_la-ie-comercial-de-envi.jpeg",
      "/Noticias/La%20I.E.%20Comercial%20de%20Envigado%20gan%C3%B3%20el%20Premio%20Santillana%20al%20mejor%20proyecto%20de%20sostenibilidad%20ambiental%20en%20Colombia/145364_whatsapp-image-2025.jpeg",
      "/Noticias/La%20I.E.%20Comercial%20de%20Envigado%20gan%C3%B3%20el%20Premio%20Santillana%20al%20mejor%20proyecto%20de%20sostenibilidad%20ambiental%20en%20Colombia/145365_whatsapp-image-20251003.jpeg",
    ],
    autor: "Alcaldía de Envigado",
  },
  {
    id: "envigado-congreso-internacional-gestion-riesgo-2025",
    titulo: "Envigado llevó su innovación educativa al Congreso Internacional de Gestión del Riesgo",
    fecha: "2025-10-03",
    resumen:
      "Los equipos destacados de la Semana STEM+ Envigado 2025 representaron al municipio en el Congreso Internacional de Gestión del Riesgo de Desastres de Antioquia y Medellín.",
    contenido: [
      "Los equipos destacados de la Semana STEM + Envigado 2025, conformados por estudiantes y docentes de instituciones educativas del municipio, fueron invitados a participar en el Congreso Internacional de Gestión del Riesgo de Desastres de Antioquia y Medellín.",
      "Envigado se convirtió en el único territorio con representación escolar en este encuentro de alto nivel, orientado a la búsqueda de soluciones innovadoras frente a los desafíos de la prevención y atención de emergencias.",
      "La delegación envigadeña estuvo integrada por representantes de las instituciones educativas Las Palmas, Comercial, José Miguel de la Calle y el Colegio Benedictinos de Santa María. Durante el evento, presentaron la iniciativa Prototipos robóticos educativos para el rescate en estructuras colapsadas, un proyecto desarrollado en las aulas que aplica modelos de innovación tecnológica al servicio del cuidado, la prevención y el rescate de vidas humanas.",
      "Estudiantes, docentes y gestores de innovación compartieron experiencias exitosas que aportan a la construcción de ciudades menos vulnerables, fortaleciendo el papel de la educación como motor de transformación social.",
      "Con esta participación, Envigado reafirma su compromiso con una formación de calidad, en la que la ciencia, la tecnología y la innovación se consolidan como pilares fundamentales para el aprendizaje a lo largo de la vida.",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/Envigado%20llev%C3%B3%20su%20innovaci%C3%B3n%20educativa%20al%20Congreso%20Internacional%20de%20Gesti%C3%B3n%20del%20Riesgo/145349_envigado-lleva-su-innova.jpg",
      "/Noticias/Envigado%20llev%C3%B3%20su%20innovaci%C3%B3n%20educativa%20al%20Congreso%20Internacional%20de%20Gesti%C3%B3n%20del%20Riesgo/145350_315a0044_1024x600.jpg",
      "/Noticias/Envigado%20llev%C3%B3%20su%20innovaci%C3%B3n%20educativa%20al%20Congreso%20Internacional%20de%20Gesti%C3%B3n%20del%20Riesgo/145351_315a0050_1024x600.jpg",
      "/Noticias/Envigado%20llev%C3%B3%20su%20innovaci%C3%B3n%20educativa%20al%20Congreso%20Internacional%20de%20Gesti%C3%B3n%20del%20Riesgo/145352_315a0024_1024x600.jpg",
      "/Noticias/Envigado%20llev%C3%B3%20su%20innovaci%C3%B3n%20educativa%20al%20Congreso%20Internacional%20de%20Gesti%C3%B3n%20del%20Riesgo/145353_315a0074_1024x600.jpg",
      "/Noticias/Envigado%20llev%C3%B3%20su%20innovaci%C3%B3n%20educativa%20al%20Congreso%20Internacional%20de%20Gesti%C3%B3n%20del%20Riesgo/145354_whatsapp-image-20251002-at-10837-pm-1_1024x600.jpeg",
      "/Noticias/Envigado%20llev%C3%B3%20su%20innovaci%C3%B3n%20educativa%20al%20Congreso%20Internacional%20de%20Gesti%C3%B3n%20del%20Riesgo/145355_whatsapp-image-20251002-at-10836-pm_1024x600.jpeg",
    ],
    autor: "Alcaldía de Envigado",
  },
  {
    id: "envigado-inicio-semana-stem-2025",
    titulo: "Envigado da inicio a la Semana STEM+ 2025 con foro sobre educación, tecnología y ética",
    fecha: "2025-09-23",
    resumen:
      "Envigado inició la Semana STEM+ 2025 con un foro sobre tendencias que transforman la educación y la tecnología en el territorio.",
    contenido: [
      "Este martes 23 de septiembre comenzó en Envigado la Semana STEM+ 2025, una iniciativa que se extenderá hasta el viernes 26 y que busca fortalecer la innovación educativa en el municipio. El evento reúne a estudiantes, docentes, instituciones públicas y privadas, así como aliados estratégicos, para promover experiencias de aula centradas en el desarrollo de competencias tecnológicas, creatividad y pensamiento crítico.",
      "La jornada inaugural tuvo lugar con el foro Tendencias que transforman, en el que participaron representantes del sector educativo y empresarial, enfocados en impulsar habilidades blandas y fundamentos tecnológicos entre los estudiantes envigadeños.",
      "Durante el acto de apertura, el alcalde Raúl Cardona resaltó el papel de la ciencia y la innovación como motores del desarrollo local. También se anunció que el proyecto Construyendo futuro: Territorio STEM+ SMART Regenerativo, liderado por la Secretaría de Educación y el Centro de Innovación y Desarrollo, será reconocido internacionalmente por la Red Latinoamericana de Ciudades del Aprendizaje de la UNESCO. La distinción se entregará el próximo 5 de noviembre en México, durante la ceremonia de buenas prácticas latinoamericanas.",
      "La programación de la Semana STEM+ incluye actividades como las Olimpiadas Maker, la Feria Municipal de Investigación Escolar y una Hackathon de Inteligencia Artificial, que buscan posicionar a Envigado como referente en educación transformadora.",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/Envigado da inicio a la Semana STEM+ 2025 con foro sobre educación, tecnología y ética/144974_envigado-da-inicio-a-la-semana-stem-2025-con-foro-.jpeg",
      "/Noticias/Envigado da inicio a la Semana STEM+ 2025 con foro sobre educación, tecnología y ética/144975_whatsapp-image-20250923-at-104322-am_1024x600.jpeg",
      "/Noticias/Envigado da inicio a la Semana STEM+ 2025 con foro sobre educación, tecnología y ética/144976_whatsapp-image-20250923-at-104319-am_1024x600.jpeg",
      "/Noticias/Envigado da inicio a la Semana STEM+ 2025 con foro sobre educación, tecnología y ética/144977_whatsapp-image-20250923-at-104322-am-1_1024x600.jpeg",
      "/Noticias/Envigado da inicio a la Semana STEM+ 2025 con foro sobre educación, tecnología y ética/144978_315a9767_1024x600.jpg",
      "/Noticias/Envigado da inicio a la Semana STEM+ 2025 con foro sobre educación, tecnología y ética/144979_whatsapp-image-20250922-at-103714-am_1024x600.jpeg",
    ],
    autor: "Alcaldía de Envigado",
  },
  {
    id: "envigado-canta-cuenta-historia-creatividad-estudiantil",
    titulo: "Envigado canta y cuenta su historia con creatividad estudiantil",
    fecha: "2025-09-30",
    resumen:
      "La Alcaldía de Envigado premió a instituciones educativas por su creatividad en el reto Envigado Canta y Cuenta, en el marco de los 250 años del municipio.",
    contenido: [
      "La Alcaldía de Envigado, a través de su Secretaría de Educación, realizó la ceremonia de premiación del Reto Envigado Canta y Cuenta: Un Viaje por Nuestro Himno y Patrimonio, una iniciativa que convocó a las instituciones educativas públicas y privadas del municipio para explorar, representar y celebrar el valor histórico, cultural y simbólico de Envigado, en el marco de la conmemoración de sus 250 años.",
      "Desde comienzos de este año, la Alcaldía y el Concejo Municipal promovieron iniciativas para recuperar la tradición y el orgullo que representa el Himno de Envigado como símbolo identitario, tanto a nivel local como nacional e internacional.",
      "Este concurso buscó fomentar en los estudiantes la apropiación del Himno y su significado, así como el conocimiento del patrimonio local mediante una participación activa y creativa. Cada institución conformó un equipo estudiantil que eligió una estrofa del himno acorde con su Proyecto Educativo Institucional (PEI), y desarrolló cinco fases temáticas: Ruta patrimonial, Retratos sonoros, Imágenes que hablan, Enigma envigadeño y Comparsa. Como parte esencial del reto, todos los grupos presentaron un video entonando el himno de manera colectiva.",
      "En total, 7 equipos fueron reconocidos por su esfuerzo, compromiso y creatividad. Los premios fueron entregados de la siguiente manera:",
      "Reconocimiento al esfuerzo significativo y compromiso colectivo: Institución Educativa José Miguel de la Calle.",
      "Reconocimiento a la mejor ruta patrimonial interactiva: Institución Educativa Normal Superior de Envigado.",
      "Reconocimiento a las voces del pasado: Institución Educativa José Manuel Restrepo Vélez.",
      "Reconocimiento a las mejores imágenes que hablan: Colegio Avanzar.",
      "Reconocimiento Enigma envigadeño: Institución Educativa Las Palmas.",
      "Reconocimiento a la mejor comparsa: Institución Educativa Leticia Arango de Avendaño.",
      "Ganador absoluto del reto: Institución Educativa Alejandro Vélez Barrientos, por su creatividad, compromiso y puesta en escena.",
      "Con este reto, Envigado reafirma su compromiso con la educación, la identidad y la memoria, fortaleciendo el vínculo entre las nuevas generaciones y el legado que construye nuestra Ciudad Señorial.",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/Envigado%20canta%20y%20cuenta%20su%20historia%20con%20creatividad%20estudiantil/145310_envigado-canta-y-cuenta-su-historia-con-creativida.jpeg",
      "/Noticias/Envigado%20canta%20y%20cuenta%20su%20historia%20con%20creatividad%20estudiantil/145311_whatsapp-image-20250930-at-44558-pm-1_1024x600.jpeg",
      "/Noticias/Envigado%20canta%20y%20cuenta%20su%20historia%20con%20creatividad%20estudiantil/145312_whatsapp-image-20250930-at-44600-pm_1024x600.jpeg",
      "/Noticias/Envigado%20canta%20y%20cuenta%20su%20historia%20con%20creatividad%20estudiantil/145313_whatsapp-image-20250930-at-44602-pm-1_1024x600.jpeg",
      "/Noticias/Envigado%20canta%20y%20cuenta%20su%20historia%20con%20creatividad%20estudiantil/145314_whatsapp-image-20250930-at-44559-pm_1024x600.jpeg",
      "/Noticias/Envigado%20canta%20y%20cuenta%20su%20historia%20con%20creatividad%20estudiantil/145315_whatsapp-image-20250930-at-44602-pm_1024x600.jpeg",
      "/Noticias/Envigado%20canta%20y%20cuenta%20su%20historia%20con%20creatividad%20estudiantil/145316_whatsapp-image-20250930-at-44559-pm-1_1024x600.jpeg",
      "/Noticias/Envigado%20canta%20y%20cuenta%20su%20historia%20con%20creatividad%20estudiantil/145317_whatsapp-image-20250930-at-44605-pm_1024x600.jpeg",
      "/Noticias/Envigado%20canta%20y%20cuenta%20su%20historia%20con%20creatividad%20estudiantil/145318_whatsapp-image-20250930-at-44604-pm_1024x600.jpeg",
    ],
    autor: "Alcaldía de Envigado",
  },
  {
    id: "envigado-visita-certificacion-centro-ciencia",
    titulo: "Envigado recibió visita para avanzar en su certificación como Centro de Ciencia",
    fecha: "2025-07-18",
    resumen:
      "Envigado recibió visita oficial del Ministerio de Ciencia, Tecnología e Innovación como parte del proceso de certificación como Centro de Ciencia.",
    contenido: [
      "Este viernes, el municipio de Envigado recibió la visita oficial de Pablo Moreno, funcionario del Ministerio de Ciencia, Tecnología e Innovación, como parte del proceso de certificación como Centro de Ciencia. Esta apuesta se construye a partir de dos componentes estratégicos: el Centro de Innovación y Desarrollo (CID) y el Museo Arqueológico de Envigado, ambos ubicados en la Biblioteca Pública y Parque Cultural Débora Arango.",
      "La visita técnica y conceptual permitió visibilizar el modelo articulado entre ciencia, cultura, educación y territorio que el municipio viene consolidando. De obtener la certificación, Envigado ingresaría a la Red Nacional de Centros de Ciencia, lo que posibilitaría la gestión de recursos, la ejecución de proyectos con impacto social, el fortalecimiento de redes especializadas y la promoción de una ciudadanía participativa en torno al conocimiento científico.",
      "El CID, liderado por la Secretaría de Educación, impulsa procesos formativos en ciencia y tecnología mediante aulas especializadas, laboratorios STEAM+, salas multimedia y espacios de cocreación para niños, niñas, jóvenes, docentes y comunidades.",
      "Por su parte, el Museo Arqueológico de Envigado, liderado por la Secretaría de Cultura, fue destacado como un componente esencial del proyecto. En este espacio se realizan investigaciones arqueológicas que permiten descubrir, conservar y divulgar la memoria de los pueblos ancestrales que habitaron el territorio, así como comprender los orígenes de la ocupación humana en el Valle de Aburrá. A partir de estos hallazgos, el museo desarrolla propuestas pedagógicas e innovadoras que fortalecen la apropiación social del conocimiento y la identidad territorial.",
      "Durante su visita, el funcionario del Ministerio recorrió los diferentes espacios involucrados en el Centro de Innovación y Desarrollo (CID) y en el Museo Arqueológico, reconociendo su relevancia para el proyecto de certificación.",
      "Al finalizar la visita, el funcionario entregó algunas recomendaciones orientadas a continuar con el proceso de certificación, reconociendo el compromiso institucional de Envigado y agradeciendo la articulación entre la Secretaría de Educación y la Secretaría de Cultura. Destacó especialmente las experiencias significativas y transformadoras que ambos espacios ofrecen a la ciudadanía, por su capacidad de inspirar, enseñar y conectar el conocimiento con la vida cotidiana de las personas.",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/Envigado%20recibi%C3%B3%20visita%20para%20avanzar%20en%20su%20certificaci%C3%B3n%20como%20Centro%20de%20Ciencia/140823_envigado-recibio-visita-para-avanzar-en-su-certificacion_1024x600.jpg",
      "/Noticias/Envigado%20recibi%C3%B3%20visita%20para%20avanzar%20en%20su%20certificaci%C3%B3n%20como%20Centro%20de%20Ciencia/140824_315a4208_1024x600.jpg",
      "/Noticias/Envigado%20recibi%C3%B3%20visita%20para%20avanzar%20en%20su%20certificaci%C3%B3n%20como%20Centro%20de%20Ciencia/140826_315a4071_1024x600.jpg",
      "/Noticias/Envigado%20recibi%C3%B3%20visita%20para%20avanzar%20en%20su%20certificaci%C3%B3n%20como%20Centro%20de%20Ciencia/140828_315a4182_1024x600.jpg",
    ],
    autor: "Alcaldía de Envigado",
  },
  {
    id: "envigado-kits-tecnologia-mobiliario-colegios-publicos",
    titulo: "Alcaldía de Envigado entregará kits escolares, tecnología y mobiliario para colegios públicos",
    fecha: "2025-01-08",
    resumen:
      "La Alcaldía de Envigado anunció la entrega de kits escolares, dotación tecnológica y mobiliario para instituciones educativas públicas del municipio.",
    contenido: [
      "La Alcaldía de Envigado, en su compromiso con la educación, tiene todo preparado para el inicio de clases. Este año se hará entrega de kits escolares, dotación tecnológica y mobiliario en las instituciones educativas públicas del municipio.",
      "La inversión de todos estos elementos para la educación de los niños, niñas y adolescentes, es superior a los $3.000 millones e incluye:",
      "Kits escolares: se entregarán 1.000 kits con útiles escolares para la primera infancia y 15.300 para los estudiantes de básica primaria, secundaria y media.",
      "Dotación de mobiliario: incluye sillas, pupitres, mesones, casilleros, módulos de oficina, archivadores y mobiliario auxiliar para docentes, entre otros.",
      "Dotación tecnológica: computadores, impresoras, proyectores, televisores y kits de robótica, entre otros.",
      "La entrega oficial se realizará a partir del 20 de enero de 2025, fecha de regreso a clases, y contará con la presencia del Alcalde Raúl Cardona González y la Secretaria de Educación Jazmín Andrea González Arias.",
      "En Envigado vamos adelante por una educación de calidad.",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/Alcald%C3%ADa%20de%20Envigado%20entregar%C3%A1%20kits%20escolares,%20tecnolog%C3%ADa%20y%20mobiliario%20para%20colegios%20p%C3%BAblicos/131105_alcaldia-de-envigado-invierte-mas-de-3000-millones-en_102.jpeg",
      "/Noticias/Alcald%C3%ADa%20de%20Envigado%20entregar%C3%A1%20kits%20escolares,%20tecnolog%C3%ADa%20y%20mobiliario%20para%20colegios%20p%C3%BAblicos/131109_img_1440_1024x600.jpeg",
      "/Noticias/Alcald%C3%ADa%20de%20Envigado%20entregar%C3%A1%20kits%20escolares,%20tecnolog%C3%ADa%20y%20mobiliario%20para%20colegios%20p%C3%BAblicos/131110_img_1432_1024x600.jpeg",
      "/Noticias/Alcald%C3%ADa%20de%20Envigado%20entregar%C3%A1%20kits%20escolares,%20tecnolog%C3%ADa%20y%20mobiliario%20para%20colegios%20p%C3%BAblicos/131111_img_1435_1024x600.jpeg",
      "/Noticias/Alcald%C3%ADa%20de%20Envigado%20entregar%C3%A1%20kits%20escolares,%20tecnolog%C3%ADa%20y%20mobiliario%20para%20colegios%20p%C3%BAblicos/131112_img_1377_1024x600.jpeg",
      "/Noticias/Alcald%C3%ADa%20de%20Envigado%20entregar%C3%A1%20kits%20escolares,%20tecnolog%C3%ADa%20y%20mobiliario%20para%20colegios%20p%C3%BAblicos/131113_img_9309_1024x600.jpeg",
      "/Noticias/Alcald%C3%ADa%20de%20Envigado%20entregar%C3%A1%20kits%20escolares,%20tecnolog%C3%ADa%20y%20mobiliario%20para%20colegios%20p%C3%BAblicos/131114_img_1413_1024x600.jpeg",
      "/Noticias/Alcald%C3%ADa%20de%20Envigado%20entregar%C3%A1%20kits%20escolares,%20tecnolog%C3%ADa%20y%20mobiliario%20para%20colegios%20p%C3%BAblicos/131116_img_1442_1024x600.jpeg",
    ],
    autor: "Alcaldía de Envigado",
  },
];

const fuentesOficialesById: Record<string, string> = {
  "envigado-kits-tecnologia-mobiliario-colegios-publicos": "https://www.envigado.gov.co/noticias/alcaldia-de-envigado-invierte-mas-de-3000-millones-en",
  "envigado-visita-certificacion-centro-ciencia": "https://www.envigado.gov.co/noticias/envigado-recibio-visita-para-avanzar-en-su-certificacion",
  "envigado-canta-cuenta-historia-creatividad-estudiantil": "https://www.envigado.gov.co/noticias/envigado-canta-y-cuenta-su-historia-con-creatividad",
  "envigado-inicio-semana-stem-2025": "https://www.envigado.gov.co/noticias/envigado-da-inicio-a-la-semana-stem-2025-con-foro-sobre",
  "envigado-congreso-internacional-gestion-riesgo-2025": "https://www.envigado.gov.co/noticias/envigado-lleva-su-innovacion-educativa-al-congreso-internacional",
  "ie-comercial-envigado-premio-santillana-2025": "https://www.envigado.gov.co/noticias/la-ie-comercial-de-envigado-gana-el-premio-santillana",
  "envigado-gala-maestro-2025": "https://www.envigado.gov.co/noticias/envigado-exalto-a-los-mejores-docentes-de-2025-en-la",
  "envigado-reconocimiento-foro-latinoamericano-ciudades-aprendizaje": "https://www.envigado.gov.co/noticias/envigado-fue-reconocido-por-sus-buenas-practicas-en",
  "envigado-ganador-reto-nacional-educacion-2025": "https://www.envigado.gov.co/noticias/envigado-ganador-del-reto-nacional-por-la-educacion",
  "estudiantes-el-salado-estrenaron-computadores": "https://www.envigado.gov.co/noticias/estudiantes-de-la-i-e-el-salado-en-envigado-estrenaron",
  "envigado-red-nacional-ciudades-aprendizaje": "https://www.envigado.gov.co/noticias/envigado-se-suma-a-la-red-nacional-de-ciudades-del-aprendizaje",
};

const toWebp = (src: string) => src.replace(/\.(jpe?g|png)$/i, ".webp");
const getPreferredImageSrc = (src: string) => (/\.(jpe?g|png)$/i.test(src) ? toWebp(src) : src);

export default function Noticias() {
  const [selectedNews, setSelectedNews] = useState<NoticiaUI | null>(null);
  const [currentImageByNews, setCurrentImageByNews] = useState<Record<string, number>>({});
  const { data: noticias = [], isLoading } = trpc.news.list.useQuery();
  
  // Mapear noticias de la BD a formato de UI
  const noticiasMapeadas: NoticiaUI[] = noticias.map(n => ({
    id: String(n.id),
    titulo: n.titulo,
    fecha: n.createdAt ? new Date(n.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    resumen: n.descripcion || n.contenido || "",
    tipo: n.estado === "publicado" ? "propia" as const : "mencion" as const,
    imagenes: [n.imagen || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop"],
    autor: n.autor ?? undefined
  }));
  
  const noticiasFiltradas: NoticiaUI[] = [...noticiasLocales, ...noticiasMapeadas];

  const getCurrentImageIndex = (newsId: string) => currentImageByNews[newsId] ?? 0;
  const nextImage = (newsId: string, total: number) => {
    setCurrentImageByNews((prev) => ({
      ...prev,
      [newsId]: ((prev[newsId] ?? 0) + 1) % total,
    }));
  };
  const prevImage = (newsId: string, total: number) => {
    setCurrentImageByNews((prev) => ({
      ...prev,
      [newsId]: ((prev[newsId] ?? 0) - 1 + total) % total,
    }));
  };
  const getFuenteOficialUrl = (newsId: string) => fuentesOficialesById[newsId];
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>, fallbackSrc: string) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied === "true") return;
    target.dataset.fallbackApplied = "true";
    target.src = fallbackSrc;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Noticias" }]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Noticias</h1>
          <p className="text-xl text-muted-foreground">Mantente informado sobre las últimas actividades del CID</p>
        </div>
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : noticiasFiltradas.length === 0 ? (
          <div className="text-center py-12">
            <Newspaper className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No hay noticias disponibles</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticiasFiltradas.map((noticia) => (
              <Card key={noticia.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={getPreferredImageSrc(noticia.imagenes[getCurrentImageIndex(noticia.id)])}
                    alt={noticia.titulo}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    onError={(e) => handleImageError(e, noticia.imagenes[getCurrentImageIndex(noticia.id)])}
                    className="w-full h-full object-cover"
                  />
                  {noticia.imagenes.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Imagen anterior"
                        onClick={() => prevImage(noticia.id, noticia.imagenes.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-1.5 text-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Siguiente imagen"
                        onClick={() => nextImage(noticia.id, noticia.imagenes.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-1.5 text-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
                <CardHeader>
                  <Badge variant="secondary">
                    Noticia Externa
                  </Badge>
                  <CardTitle className="line-clamp-2">{noticia.titulo}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Fecha de publicación:</span>
                    {new Date(noticia.fecha).toLocaleDateString('es-CO')}
                    {noticia.autor && <span className="ml-2">• {noticia.autor}</span>}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{noticia.resumen}</p>
                  <Button variant="outline" className="w-full" onClick={() => setSelectedNews(noticia)}>
                    Leer más
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedNews && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedNews(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
                <h2 className="text-xl font-bold text-slate-900">{selectedNews.titulo}</h2>
                <button
                  type="button"
                  aria-label="Cerrar noticia"
                  onClick={() => setSelectedNews(null)}
                  className="rounded-full p-1 text-slate-600 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="relative mb-6 overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={getPreferredImageSrc(selectedNews.imagenes[getCurrentImageIndex(selectedNews.id)])}
                    alt={selectedNews.titulo}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    onError={(e) => handleImageError(e, selectedNews.imagenes[getCurrentImageIndex(selectedNews.id)])}
                    className="h-[380px] w-full object-cover"
                  />
                  {selectedNews.imagenes.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Imagen anterior"
                        onClick={() => prevImage(selectedNews.id, selectedNews.imagenes.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Siguiente imagen"
                        onClick={() => nextImage(selectedNews.id, selectedNews.imagenes.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <Badge variant="secondary">
                    Noticia Externa
                  </Badge>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Fecha de publicación:</span>
                    {new Date(selectedNews.fecha).toLocaleDateString("es-CO")}
                  </span>
                  {selectedNews.autor && <span>• {selectedNews.autor}</span>}
                </div>

                {getFuenteOficialUrl(selectedNews.id) && (
                  <div className="mb-5">
                    <Button asChild>
                      <a
                        href={getFuenteOficialUrl(selectedNews.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ir a la fuente oficial
                      </a>
                    </Button>
                  </div>
                )}

                <div className="space-y-4 text-slate-700 leading-relaxed">
                  {(selectedNews.contenido ?? [selectedNews.resumen]).map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
