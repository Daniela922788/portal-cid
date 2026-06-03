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
  video?: string;
  videoFinal?: string;
  instagramReels?: string[];
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
  video?: string;
  videoFinal?: string;
  instagramReels?: string[];
};

const noticiasLocales: NoticiaLocal[] = [
  {
    id: "tlaxcala-envigado-jovenes-innovacion",
    titulo: "Desde Tlaxcala hasta Envigado: jóvenes que inspiran con innovación y educación",
    fecha: "2026-05-25",
    resumen:
      "Jóvenes embajadores de México llegaron a Envigado para compartir conocimiento, en un encuentro que conectó a Tlaxcala con Envigado a través de la innovación, la creatividad y el aprendizaje.",
    contenido: [
      "El talento no tiene fronteras. México y Colombia se conectaron a través de la creatividad, el aprendizaje y la innovación en un encuentro que unió a Tlaxcala con Envigado.",
      "Jóvenes embajadores de México llegaron hasta Envigado para compartir conocimiento, en una experiencia que demuestra cómo, cuando la educación cruza países, nacen vivencias que transforman.",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/Mexico/4S8A3179.jpg",
      "/Noticias/Mexico/4S8A3197.jpg",
      "/Noticias/Mexico/4S8A3287.jpg",
      "/Noticias/Mexico/4S8A3344.jpg",
      "/Noticias/Mexico/4S8A3377.jpg",
    ],
    instagramReels: ["DYxrqXIRxF7"],
    autor: "Secretaría de Educación de Envigado",
  },
  {
    id: "robojam-2026",
    titulo: "El talento, la creatividad y el trabajo en equipo brillaron en RoboJam 2026",
    fecha: "2026-05-25",
    resumen:
      "RoboJam 2026 reunió a 21 equipos y 56 estudiantes de las instituciones educativas de Envigado. Seis delegaciones clasificaron a las finales y el equipo Los Reales, de la I. E. San Vicente Alto de las Flores, se consagró subcampeón en la categoría Bristle Race.",
    contenido: [
      "RoboJam 2026 cerró su primera ronda con una destacada participación: 21 equipos y 56 estudiantes de las diferentes instituciones educativas de Envigado se midieron en la fase inicial de la competencia.",
      "La Secretaría de Educación agradeció el compromiso de los 15 equipos (39 estudiantes) que completaron su participación en esta primera ronda, un esfuerzo que constituye la base de todo el proceso de innovación.",
      "Seis delegaciones, integradas por 17 estudiantes, clasificaron a la fase de finales: Comercial de Envigado, Darío de Bedout, Leticia Arango de Avendaño, Manuel Uribe Ángel, Normal Superior de Envigado y San Vicente Alto de las Flores.",
      "En las rondas decisivas, los equipos de Envigado demostraron que la pasión por la robótica y la innovación puede llevarlos muy lejos y motivarlos a aprender más cada día. La Secretaría de Educación destacó de manera especial al equipo Los Reales, de la I. E. San Vicente Alto de las Flores, que alcanzó el título de subcampeones en la categoría Bristle Race.",
      "El talento, la creatividad y el trabajo en equipo fueron protagonistas de RoboJam 2026. Cada prueba se convirtió en una oportunidad para crecer, crear y demostrar que el futuro se construye desde hoy, gracias a estos jóvenes talentos y a todos quienes hicieron parte de este gran logro.",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/RoboJam/4S8A3409.jpg",
      "/Noticias/RoboJam/4S8A3429.jpg",
      "/Noticias/RoboJam/4S8A3435.jpg",
      "/Noticias/RoboJam/4S8A3441.jpg",
      "/Noticias/RoboJam/4S8A3443.jpg",
      "/Noticias/RoboJam/4S8A3475.jpg",
    ],
    instagramReels: ["DYxTI61RdrJ", "DYsfxQmRJ0O"],
    autor: "Secretaría de Educación de Envigado",
  },
  {
    id: "comercial-envigado-top-10-mundo-global-schools-prize",
    titulo:
      "El Colegio Comercial de Envigado, entre los 10 mejores colegios del mundo por su apuesta a la innovación y la formación integral",
    fecha: "2026-05-19",
    resumen:
      "El Colegio Comercial de Envigado fue reconocido como uno de los 10 mejores colegios del mundo en el Global Schools Prize, certamen liderado por la Varkey Foundation y la UNESCO, gracias a un modelo pedagógico centrado en la investigación, la innovación y la solución de problemáticas reales de su comunidad.",
    contenido: [
      "El Colegio Comercial de Envigado fue reconocido como uno de los 10 mejores colegios del mundo en el Global Schools Prize, un certamen internacional liderado por la Varkey Foundation en alianza con la UNESCO, que cada año exalta a las instituciones educativas más innovadoras e influyentes del planeta. El anuncio se realizó en Londres, Inglaterra, el 19 de mayo de 2026.",
      "El profesor Alexander Echeverri, quien representó a la institución durante la premiación, celebró la distinción desde la capital británica: \"Es un orgullo representar a la institución y a nuestro país en este certamen. Este es un trabajo en equipo. Colombia es sostenibilidad, de justicia ambiental y armonía\".",
      "Detrás de este reconocimiento hay un modelo pedagógico que pone la investigación, la innovación y la solución de problemáticas reales de las comunidades en el centro del aprendizaje. Desde las aulas, estudiantes y docentes han desarrollado proyectos científicos y tecnológicos con impacto social y ambiental, demostrando que la educación puede transformar territorios y mejorar la calidad de vida de las personas.",
      "Entre los proyectos que han marcado la diferencia se cuentan iniciativas para contribuir a la erradicación del dengue, el desarrollo de prótesis para víctimas de minas antipersona y una mano robótica pensada para acompañar procesos relacionados con el túnel carpiano. A ello se suman máquinas capaces de convertir el humo contaminante en tinta y biocombustible, además de prototipos orientados a mejorar la calidad del agua y a proteger el medio ambiente.",
      "Buena parte de este trabajo ha sido impulsado desde el centro de interés InventiPaz —liderado por el profesor Alexander Echeverri— y desde la metodología de investigación socioambiental, estrategias que articulan la sostenibilidad, la ciencia y la innovación como pilares de la formación integral. A través de ellas, los estudiantes se comprometen con el cuidado del medio ambiente y con proyectos productivos para su comunidad, al tiempo que fortalecen el pensamiento crítico, el liderazgo y el trabajo colaborativo desde edades tempranas.",
      "Para la educación colombiana, el caso del Colegio Comercial de Envigado se convierte en un referente de cómo las apuestas pedagógicas centradas en la formación integral permiten que niñas, niños y jóvenes desarrollen habilidades para construir soluciones, aportar al cuidado del entorno y transformar su realidad desde la escuela.",
      "Desde el Ministerio de Educación se extendió una felicitación al colegio y al profesor Alexander Echeverri por su trabajo en favor de la formación integral.",
    ],
    tipo: "propia",
    imagenes: [
      "/Noticias/El Colegio Comercial de Envigado, entre los 10 mejores/Comercial_Top1.jpg",
      "/Noticias/El Colegio Comercial de Envigado, entre los 10 mejores/Comercial_Top2.jpg",
      "/Noticias/El Colegio Comercial de Envigado, entre los 10 mejores/Comercial_Top3.jpg",
    ],
    videoFinal: "yG90mPOCwWM",
    autor: "MinEducación",
  },
  {
    id: "centro-innovacion-desarrollo-cid",
    titulo: "Centro de Innovación y Desarrollo CID",
    fecha: "2026-03-12",
    resumen:
      "Una de las fortalezas educativas de Envigado es la implementación del enfoque STEM y el trabajo de las habilidades blandas, que han permitido obtener reconocimientos nacionales e internacionales. El municipio cuenta con 16 gestores de innovación que acompañan a 14 instituciones educativas.",
    contenido: [
      "Una de nuestras fortalezas en educación en el municipio de Envigado es la implementación del enfoque STEM y el trabajo de las habilidades blandas. Esto nos ha permitido obtener reconocimientos tanto nacionales como internacionales.",
      "Contamos con 16 gestores de innovación, quienes acompañan nuestras 14 instituciones educativas. Allí también tenemos el acompañamiento de nuestras gestoras de investigación.",
      "Desde el Centro de Innovación brindamos formación constante y gratuita para toda la comunidad.",
      "Mi labor como gestor de innovación incluye varias tareas. Una de ellas, la más importante para mí, es brindarles la oportunidad de formación a los docentes para que dinamicen y creen espacios educativos de alta calidad.",
      "Por otro lado, también realizamos el acompañamiento a diferentes tipos de semilleros. En estos semilleros trabajamos temas relacionados con el STEM, desde la tecnología y las ciencias naturales, y abordamos también temas que tienen que ver con las artes, las humanidades y otras áreas.",
      "Lo más satisfactorio de mi labor como gestor de innovación es, definitivamente, la creación de esperanza y de nuevas formas de ver el mundo en los estudiantes y en los docentes. Ese es el componente que más me genera satisfacción.",
    ],
    tipo: "propia",
    imagenes: [],
    video: "qcuBE1JJjMY",
    autor: "Alcaldía de Envigado",
  },
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
      "/Noticias/envigado-red-ciudades-aprendizaje/1.jpeg",
      "/Noticias/envigado-red-ciudades-aprendizaje/2.jpeg",
      "/Noticias/envigado-red-ciudades-aprendizaje/3.jpeg",
      "/Noticias/envigado-red-ciudades-aprendizaje/4.jpeg",
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
      "/Noticias/estudiantes-el-salado-computadores/151822_estudiantes-de-la-i-e-el-salado-en-envigado-estrenaron_1024x600.jpeg",
      "/Noticias/estudiantes-el-salado-computadores/151823_whatsapp-image-20260129-at-23459-pm_1024x600.jpeg",
      "/Noticias/estudiantes-el-salado-computadores/151824_whatsapp-image-20260129-at-23502-pm_1024x600.jpeg",
      "/Noticias/estudiantes-el-salado-computadores/151825_whatsapp-image-20260129-at-23459-pm-1_1024x600.jpeg",
      "/Noticias/estudiantes-el-salado-computadores/151826_whatsapp-image-20260129-at-23459-pm-2_1024x600.jpeg",
      "/Noticias/estudiantes-el-salado-computadores/151827_whatsapp-image-20260129-at-23500-pm-2_1024x600.jpeg",
      "/Noticias/estudiantes-el-salado-computadores/151828_whatsapp-image-20260129-at-23500-pm-1_1024x600.jpeg",
      "/Noticias/estudiantes-el-salado-computadores/151829_whatsapp-image-20260129-at-23501-pm_1024x600.jpeg",
      "/Noticias/estudiantes-el-salado-computadores/151830_whatsapp-image-20260129-at-23500-pm-3_1024x600.jpeg",
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
      "/Noticias/envigado-ganador-reto-nacional/1.jpeg",
      "/Noticias/envigado-ganador-reto-nacional/2.jpg",
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
      "/Noticias/envigado-reconocimiento-foro-latinoamericano/1.jpeg",
      "/Noticias/envigado-reconocimiento-foro-latinoamericano/2.jpeg",
      "/Noticias/envigado-reconocimiento-foro-latinoamericano/3.jpeg",
      "/Noticias/envigado-reconocimiento-foro-latinoamericano/4.jpeg",
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
      "/Noticias/gala-maestro-2025/145681_envigado-exalto-a-los-mejores-docentes-de-2025-en-la_1024x600.jpeg",
      "/Noticias/gala-maestro-2025/145683_whatsapp-image-20251014-at-104909-am_1024x600.jpeg",
      "/Noticias/gala-maestro-2025/145684_whatsapp-image-20251014-at-104911-am-1_1024x600.jpeg",
      "/Noticias/gala-maestro-2025/145685_whatsapp-image-20251014-at-104911-am_1024x600.jpeg",
      "/Noticias/gala-maestro-2025/145686_whatsapp-image-20251014-at-104912-am-1_1024x600.jpeg",
      "/Noticias/gala-maestro-2025/145687_whatsapp-image-20251014-at-104912-am-2_1024x600.jpeg",
      "/Noticias/gala-maestro-2025/145688_whatsapp-image-20251014-at-104913-am_1024x600.jpeg",
      "/Noticias/gala-maestro-2025/145690_whatsapp-image-20251014-at-104914-am-2_1024x600.jpeg",
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
      "/Noticias/premio-santillana-ie-comercial/145363_la-ie-comercial-de-envi.jpeg",
      "/Noticias/premio-santillana-ie-comercial/145364_whatsapp-image-2025.jpeg",
      "/Noticias/premio-santillana-ie-comercial/145365_whatsapp-image-20251003.jpeg",
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
      "/Noticias/congreso-gestion-riesgo-2025/145349_envigado-lleva-su-innova.jpg",
      "/Noticias/congreso-gestion-riesgo-2025/145350_315a0044_1024x600.jpg",
      "/Noticias/congreso-gestion-riesgo-2025/145351_315a0050_1024x600.jpg",
      "/Noticias/congreso-gestion-riesgo-2025/145352_315a0024_1024x600.jpg",
      "/Noticias/congreso-gestion-riesgo-2025/145353_315a0074_1024x600.jpg",
      "/Noticias/congreso-gestion-riesgo-2025/145354_whatsapp-image-20251002-at-10837-pm-1_1024x600.jpeg",
      "/Noticias/congreso-gestion-riesgo-2025/145355_whatsapp-image-20251002-at-10836-pm_1024x600.jpeg",
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
      "/Noticias/semana-stem-2025-foro/144974_envigado-da-inicio-a-la-semana-stem-2025-con-foro-.jpeg",
      "/Noticias/semana-stem-2025-foro/144975_whatsapp-image-20250923-at-104322-am_1024x600.jpeg",
      "/Noticias/semana-stem-2025-foro/144976_whatsapp-image-20250923-at-104319-am_1024x600.jpeg",
      "/Noticias/semana-stem-2025-foro/144977_whatsapp-image-20250923-at-104322-am-1_1024x600.jpeg",
      "/Noticias/semana-stem-2025-foro/144978_315a9767_1024x600.jpg",
      "/Noticias/semana-stem-2025-foro/144979_whatsapp-image-20250922-at-103714-am_1024x600.jpeg",
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
      "/Noticias/envigado-canta-cuenta/145310_envigado-canta-y-cuenta-su-historia-con-creativida.jpeg",
      "/Noticias/envigado-canta-cuenta/145311_whatsapp-image-20250930-at-44558-pm-1_1024x600.jpeg",
      "/Noticias/envigado-canta-cuenta/145312_whatsapp-image-20250930-at-44600-pm_1024x600.jpeg",
      "/Noticias/envigado-canta-cuenta/145313_whatsapp-image-20250930-at-44602-pm-1_1024x600.jpeg",
      "/Noticias/envigado-canta-cuenta/145314_whatsapp-image-20250930-at-44559-pm_1024x600.jpeg",
      "/Noticias/envigado-canta-cuenta/145315_whatsapp-image-20250930-at-44602-pm_1024x600.jpeg",
      "/Noticias/envigado-canta-cuenta/145316_whatsapp-image-20250930-at-44559-pm-1_1024x600.jpeg",
      "/Noticias/envigado-canta-cuenta/145317_whatsapp-image-20250930-at-44605-pm_1024x600.jpeg",
      "/Noticias/envigado-canta-cuenta/145318_whatsapp-image-20250930-at-44604-pm_1024x600.jpeg",
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
      "/Noticias/envigado-certificacion-centro-ciencia/140823_envigado-recibio-visita-para-avanzar-en-su-certificacion_1024x600.jpg",
      "/Noticias/envigado-certificacion-centro-ciencia/140824_315a4208_1024x600.jpg",
      "/Noticias/envigado-certificacion-centro-ciencia/140826_315a4071_1024x600.jpg",
      "/Noticias/envigado-certificacion-centro-ciencia/140828_315a4182_1024x600.jpg",
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
      "/Noticias/kits-escolares-2025/131105_alcaldia-de-envigado-invierte-mas-de-3000-millones-en_102.jpeg",
      "/Noticias/kits-escolares-2025/131109_img_1440_1024x600.jpeg",
      "/Noticias/kits-escolares-2025/131110_img_1432_1024x600.jpeg",
      "/Noticias/kits-escolares-2025/131111_img_1435_1024x600.jpeg",
      "/Noticias/kits-escolares-2025/131112_img_1377_1024x600.jpeg",
      "/Noticias/kits-escolares-2025/131113_img_9309_1024x600.jpeg",
      "/Noticias/kits-escolares-2025/131114_img_1413_1024x600.jpeg",
      "/Noticias/kits-escolares-2025/131116_img_1442_1024x600.jpeg",
    ],
    autor: "Alcaldía de Envigado",
  },
];

const fuentesOficialesById: Record<string, string> = {
  "comercial-envigado-top-10-mundo-global-schools-prize": "https://www.mineducacion.gov.co/portal/salaprensa/Comunicados/428954:El-Colegio-Comercial-de-Envigado-entre-los-10-mejores-colegios-del-mundo-por-su-apuesta-a-la-innovacion-y-la-formacion-integral",
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

const getPreferredImageSrc = (src: string) =>
  src.replace(/\.(jpe?g|png)$/i, '.webp');

// Encuadre por imagen. Por defecto se ancla arriba ("center top"), que funciona
// para fotos de personas/grupos. Aquí se sobrescriben los casos puntuales en los
// que el sujeto está en otra zona de la foto.
const imagePositionOverrides: Record<string, string> = {
  "/Noticias/El Colegio Comercial de Envigado, entre los 10 mejores/Comercial_Top2.jpg": "center bottom",
  "/Noticias/estudiantes-el-salado-computadores/151822_estudiantes-de-la-i-e-el-salado-en-envigado-estrenaron_1024x600.jpeg": "center 30%",
};
const getImagePosition = (src: string) => {
  // Ajustes puntuales por imagen (tienen prioridad sobre las reglas por carpeta).
  if (imagePositionOverrides[src]) return imagePositionOverrides[src];
  // RoboJam y Colegio Comercial: fotos de personas con las caras en la parte alta.
  if (src.startsWith("/Noticias/RoboJam/")) return "center top";
  if (src.startsWith("/Noticias/El Colegio Comercial de Envigado, entre los 10 mejores/")) return "center top";
  // México: encuadre hacia la parte baja de la foto, sin llegar al fondo del todo.
  if (src.startsWith("/Noticias/Mexico/")) return "center 70%";
  // Por defecto, centrado (como estaba originalmente y como se ven bien las demás).
  return "center";
};

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
  const latestNewsTimestamp = noticiasFiltradas.length
    ? Math.max(...noticiasFiltradas.map((item) => new Date(item.fecha).getTime()))
    : null;
  const latestNewsLabel = latestNewsTimestamp
    ? new Date(latestNewsTimestamp).toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Sin publicaciones";

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
    // Si ya estamos mostrando justamente este fallback, no hacemos nada (evita bucles).
    if (target.dataset.currentFallback === fallbackSrc) return;
    // Marcamos el fallback de ESTA imagen (no una bandera global de la tarjeta),
    // así cada imagen del carrusel puede recuperarse de forma independiente.
    target.dataset.currentFallback = fallbackSrc;
    target.src = fallbackSrc;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <Breadcrumbs items={[{ label: "Noticias" }]} />
        <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-[#0D4B56]/20 bg-[linear-gradient(125deg,#182130_0%,#0D4B56_45%,#11B2AA_100%)] p-6 text-white shadow-xl sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#FFDE07]/25 blur-2xl" />
          <div className="pointer-events-none absolute -left-14 bottom-0 h-40 w-40 rounded-full bg-[#EC6910]/20 blur-2xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
              <Newspaper className="h-4 w-4" />
              Boletin CID
            </div>

            <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Noticias
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-cyan-50 sm:text-base lg:text-lg">
              Mantente al dia con los avances, reconocimientos y actividades que fortalecen la innovacion educativa en Envigado.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <div className="rounded-full border border-white/35 bg-white/12 px-4 py-2 font-medium">
                {noticiasFiltradas.length} noticias publicadas
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/12 px-4 py-2 font-medium">
                <Calendar className="h-4 w-4" />
                Ultima publicacion: {latestNewsLabel}
              </div>
            </div>
          </div>
        </section>
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
                <div className="relative h-48 overflow-hidden bg-[#11B2AA]/10">
                  {noticia.video ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${noticia.video}?autoplay=1&mute=1&loop=1&playlist=${noticia.video}&playsinline=1&controls=0&rel=0&modestbranding=1`}
                      title={noticia.titulo}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : (
                    <>
                      <img
                        src={getPreferredImageSrc(noticia.imagenes[getCurrentImageIndex(noticia.id)])}
                        alt={noticia.titulo}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        onError={(e) => handleImageError(e, noticia.imagenes[getCurrentImageIndex(noticia.id)])}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: getImagePosition(noticia.imagenes[getCurrentImageIndex(noticia.id)]) }}
                      />
                      {noticia.imagenes.length > 1 && (
                        <>
                          <button
                            type="button"
                            aria-label="Imagen anterior"
                            onClick={() => prevImage(noticia.id, noticia.imagenes.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-[#0D4B56]/90 p-1.5 text-[#FFDE07] hover:bg-[#023A34]"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            aria-label="Siguiente imagen"
                            onClick={() => nextImage(noticia.id, noticia.imagenes.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#0D4B56]/90 p-1.5 text-[#FFDE07] hover:bg-[#023A34]"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="border-[#11B2AA]/40 bg-[#11B2AA]/20 text-[#0D4B56]">
                    Noticia Externa
                  </Badge>
                  <CardTitle className="line-clamp-2">{noticia.titulo}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#0D4B56]" />
                    <span className="font-medium">Fecha de publicación:</span>
                    {new Date(noticia.fecha).toLocaleDateString('es-CO')}
                    {noticia.autor && <span className="ml-2">• {noticia.autor}</span>}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{noticia.resumen}</p>
                  <Button
                    variant="outline"
                    className="w-full border-[#0D4B56] bg-[#FFDE07]/20 text-[#182130] hover:bg-[#FFDE07]/35"
                    onClick={() => setSelectedNews(noticia)}
                  >
                    Leer más
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedNews && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#182130]/70 p-4"
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
                  className="rounded-full p-1 text-[#0D4B56] hover:bg-[#11B2AA]/15"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="relative mb-6 overflow-hidden rounded-xl bg-[#11B2AA]/10">
                  {selectedNews.video ? (
                    <div className="relative aspect-video w-full bg-black">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedNews.video}?autoplay=1&mute=1&loop=1&playlist=${selectedNews.video}&playsinline=1&rel=0&modestbranding=1`}
                        title={selectedNews.titulo}
                        loading="eager"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  ) : (
                    <>
                      <img
                        src={getPreferredImageSrc(selectedNews.imagenes[getCurrentImageIndex(selectedNews.id)])}
                        alt={selectedNews.titulo}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        onError={(e) => handleImageError(e, selectedNews.imagenes[getCurrentImageIndex(selectedNews.id)])}
                        className="h-[380px] w-full object-cover"
                        style={{ objectPosition: getImagePosition(selectedNews.imagenes[getCurrentImageIndex(selectedNews.id)]) }}
                      />
                      {selectedNews.imagenes.length > 1 && (
                        <>
                          <button
                            type="button"
                            aria-label="Imagen anterior"
                            onClick={() => prevImage(selectedNews.id, selectedNews.imagenes.length)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-[#0D4B56]/90 p-2 text-[#FFDE07] hover:bg-[#023A34]"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            aria-label="Siguiente imagen"
                            onClick={() => nextImage(selectedNews.id, selectedNews.imagenes.length)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[#0D4B56]/90 p-2 text-[#FFDE07] hover:bg-[#023A34]"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-[#023A34]">
                  <Badge variant="secondary" className="border-[#11B2AA]/40 bg-[#11B2AA]/20 text-[#0D4B56]">
                    Noticia Externa
                  </Badge>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-[#0D4B56]" />
                    <span className="font-medium">Fecha de publicación:</span>
                    {new Date(selectedNews.fecha).toLocaleDateString("es-CO")}
                  </span>
                  {selectedNews.autor && <span>• {selectedNews.autor}</span>}
                </div>

                {getFuenteOficialUrl(selectedNews.id) && (
                  <div className="mb-5">
                    <Button asChild className="bg-[#0D4B56] text-[#FFDE07] hover:bg-[#023A34]">
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

                {selectedNews.videoFinal && (
                  <div className="mt-8">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0D4B56]">
                      Conozca aquí la historia
                    </p>
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedNews.videoFinal}?autoplay=1&mute=1&loop=1&playlist=${selectedNews.videoFinal}&playsinline=1&rel=0&modestbranding=1`}
                        title={`Video: ${selectedNews.titulo}`}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  </div>
                )}
                {selectedNews.instagramReels && selectedNews.instagramReels.length > 0 && (
                  <div className="mt-8">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0D4B56]">
                      Míralo en Instagram
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                      {selectedNews.instagramReels.map((code) => (
                        <iframe
                          key={code}
                          src={`https://www.instagram.com/reel/${code}/embed`}
                          title={`Reel de Instagram ${code}`}
                          loading="lazy"
                          scrolling="no"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                          className="h-[640px] w-full max-w-[340px] overflow-hidden rounded-xl border border-[#0D4B56]/15 bg-white shadow-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}