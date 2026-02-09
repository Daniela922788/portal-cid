# Portal de Innovación Educativa CID - TODO

## Configuración Base
- [x] Configurar diseño y paleta de colores institucional (azul/verde)
- [x] Crear sistema de navegación principal
- [x] Implementar header con logo y título
- [x] Implementar footer con contacto y enlaces
- [x] Configurar breadcrumbs para navegación interna
- [x] Implementar diseño responsivo (móvil, tablet, escritorio)

## Página Principal
- [x] Página de inicio (index.html) con presentación del CID
- [x] Tarjetas de acceso rápido a secciones principales
- [x] Buscador simple en header

## Secciones del Sitio (24 páginas)
- [x] 1. Portal de Innovación Educativa CID (inicio) - misión, visión, objetivo
- [x] 2. Noticias (propias y menciones externas)
- [x] 3. Territorio STEM Envig - proyectos, actores, mapa
- [x] 4. Proyectos tipo Netflix - carrusel horizontal con modal de detalle
- [x] 5. IE oficiales - listado con filtro/búsqueda
- [x] 6. Gestores de innovación - perfiles y experiencias
- [ ] 7. Seguimiento asesoría - calendario, tabla de eventos
- [x] 8. CID Kids - juegos educativos y trivia STEM
- [x] 9. Kit de herramientas docentes - recursos por tema
- [x] 10. Links - Minedu, MinTIC, MinCiencias, STEM Latam, etc.
- [x] 11. Normatividad - MEN y propia
- [x] 12. Semana STEM - descripción, programación, galería
- [x] 13. Convocatorias - MEN y EJC
- [ ] 14. Infraestructura Innovación - Centro Audiovisual
- [x] 15. Aliados - Microsoft, ICB, UPB
- [ ] 16. Oferta para la comunidad - formación
- [x] 17. Eventos en IE - experiencias significativas, ferias
- [x] 18. Premios y reconocimiento - múltiples categorías
- [x] 19. Centro de Ciencia - qué es, proceso, oferta
- [x] 20. Mesa de Ayuda/PQRS - FAQ, formulario, WhatsApp, chatbot
- [ ] 21. Innovación en CTrap - PowerBI, planeación
- [x] 22. Formación por temáticas - Inn, Creativ, cursos gratis
- [x] 23. Publicaciones - libros y revistas
- [x] 24. Testimonios STEM - rectores, docentes, estudiantes

## Funcionalidades JavaScript
- [x] Carrusel horizontal tipo Netflix para proyectos
- [x] Modales para detalles de proyectos
- [x] Sistema de búsqueda/filtrado
- [x] Acordeones para FAQ y recursos
- [x] Navegación entre páginas
- [x] Breadcrumbs dinámicos

## Accesibilidad y UX
- [ ] Etiquetas semánticas HTML5
- [ ] Textos alternativos en imágenes
- [ ] Contraste adecuado de colores
- [ ] Navegación por teclado
- [ ] Enlaces funcionales sin rotos

## Nuevos Ajustes Solicitados

### Página Nosotros
- [x] Crear nueva página "Nosotros" con tres tarjetas (Misión, Visión, Objetivo)
- [x] Agregar bloque de redes sociales (Facebook, Instagram, X, YouTube)
- [x] Añadir "Nosotros" como elemento principal en el menú superior

### Carrusel de Cursos en Inicio
- [x] Implementar carrusel de E-Cards de cursos debajo del banner principal
- [x] Configurar 3 tarjetas visibles en escritorio, 2 en tablet, 1 en móvil
- [x] Agregar flechas laterales e indicadores de puntos
- [x] Incluir imagen, título y descripción en cada tarjeta

### Reorganización del Menú
- [x] Sacar "Formación" del apartado "Recursos"
- [x] Convertir "Formación" en categoría principal del menú

### Botón de Contacto Global
- [x] Agregar bloque de contacto antes del footer en todas las páginas
- [x] Incluir texto "¿Necesitas ayuda? Habla con nosotros"
- [x] Botón hacia Mesa de Ayuda o WhatsApp

### Rediseño Mesa de Ayuda/PQRS
- [x] Crear bloque superior con 9 tipos de solicitud en tarjetas
- [x] Implementar scroll automático al formulario al hacer clic en botones
- [x] Preselección automática del tipo de solicitud
- [x] Diseño de dos columnas: FAQ (izquierda) + Formulario (derecha)
- [x] Agregar bloque inferior con tarjetas WhatsApp y Chatbot
- [x] Implementar modal de chatbot (solo maquetado)
- [x] Asegurar responsividad completa


## Tercera Actualización - Mejoras Mayores

### Base de Datos Simulada
- [x] Crear estructura JSON con tablas: Cursos, Gestores/Master Teachers, Inscripciones
- [x] Implementar funciones CRUD para gestionar datos
- [x] Preparar datos de ejemplo para pruebas

### Carrusel de Cursos Mejorado
- [x] Rediseñar carrusel: solo imágenes, sin texto ni botones
- [x] Hacer tarjetas clickeables para ir a detalle del curso
- [x] Sincronizar datos con sección de Formación

### Páginas de Detalle de Curso
- [x] Crear página dinámica /curso/:id
- [x] Encabezado: título, imagen, descripción
- [x] Información clave: fechas, horarios, lugar, cupos, público objetivo
- [x] Formulario de inscripción tipo Microsoft Forms
- [x] Campos: selección de fecha, datos participante, datos acudiente, residencia, horario

### Sistema de Login
- [x] Crear página /login con correo y contraseña
- [x] Implementar autenticación hardcodeada (admin, gestor, master_teacher)
- [x] Redirigir a /crm después de login exitoso

### Panel CRM
- [x] Crear página /crm con encabezado y sidebar
- [x] Pestaña Inscripciones: tabla con filtros y búsqueda
- [x] Modal de detalle de inscripción con cambio de estado
- [x] Pestaña Cursos: listado con responsables e inscritos
- [x] Pestaña Gestores: lista con contactos y contador de inscripciones
- [x] Integración con inscripciones del sitio público

### Sección Territorio STEM+ Itagüí
- [x] Crear página /territorio-stem-itagui
- [x] Encabezado con descripción del enfoque STEM+
- [x] Grid de 6 IE participantes (3x2)
- [x] Tarjetas horizontales de aliados
- [x] Tarjetas de recursos STEM+
- [x] Sección de novedades/noticias
- [x] Carrusel de testimonios (Voces STEM+)

### Mejoras a Sección Eventos
- [x] Crear página /eventos con grid de tarjetas
- [x] Página individual /evento/:id con estructura completa
- [x] Galería de fotos con modal y carrusel
- [x] Bloque de videos embebidos
- [x] Carrusel de testimonios del evento
- [x] Calendario visual del evento
- [x] Agenda/cronograma hora a hora
- [x] Línea de tiempo del evento
- [x] Bloque de memorias con descarga PDF


## Tareas Pendientes - Fase Final

- [x] Agregar botón de Login en el header para acceder al CRM
- [x] Mejorar página de Eventos con listado de eventos
- [x] Completar página de Gestores con perfiles
- [x] Mejorar página de CID Kids con juegos funcionales
- [x] Optimizar página de Territorio STEM con mapa interactivo
- [x] Agregar enlace a Territorio STEM+ Itagüí en menú principal


## Rediseño Página Nosotros - Nuevas Tareas

- [x] Crear carrusel de línea de tiempo histórica (3 tarjetas visibles, flechas, puntos indicadores)
- [x] Crear galería fotográfica con categorías y lightbox
- [x] Implementar sección Centro de Ciencia con fotos y descripción
- [x] Implementar sección Centro Audiovisual con fotos y descripción
- [x] Crear tarjetas de 4 Pilares (Formación, Innovación, Creatividad, Sostenibilidad)
- [x] Rediseñar sección Misión, Visión y Objetivos
- [x] Agregar iconos de redes sociales modernos
- [x] Crear botón flotante de WhatsApp
- [x] Optimizar responsividad y animaciones


## Base de Datos y Persistencia - Implementación Final

- [x] Agregar feature web-db-user para habilitar servidor y base de datos
- [x] Crear esquema de base de datos con 7 tablas (users, courses, enrollments, pqrs, news, events, projects)
- [x] Migrar esquema a base de datos MySQL con Drizzle ORM
- [x] Crear funciones de consulta en server/db.ts
- [x] Crear procedimientos tRPC en server/routers.ts para acceso desde frontend
- [x] Implementar validación de datos con Zod
- [x] Configurar persistencia de inscripciones, PQRS y contenido


## Ajustes Finales - Última Fase

- [x] Restaurar página Contactanos con ubicación y correo (sin WhatsApp ni teléfono)
- [x] Ajustar imágenes de cursos destacados a 1080x1350 px verticales sin corte
- [x] Crear sección de Reconocimientos en Contenido (Ciudad del Aprendizaje, Ganadores Semana STEM, Colombia Líder)
- [x] Posicionar Centro de Ciencia primero en IE Oficiales sin botón de sitio web


## Juegos Interactivos CID Kids - Nueva Fase

- [x] Crear página juego Sistema Solar Interactivo (/juegos/espacio)
- [x] Crear página juego Suma Matemática (/juegos/matematicas)
- [x] Crear página juego Laboratorio de Energía (/juegos/energia)
- [x] Actualizar CIDKids.tsx con enlaces a páginas de juegos
- [x] Agregar rutas de juegos en App.tsx


## Reemplazo de Juego - Fábrica de Inventos

- [x] Crear nuevo juego Fábrica de Inventos (/juegos/fabrica-inventos)
- [x] Actualizar rutas en App.tsx (reemplazar Energia por FabricaInventos)
- [x] Actualizar CIDKids.tsx con nueva ruta y descripción
- [x] Eliminar página anterior Energia.tsx


## Actualización de Instituciones Educativas Oficiales

- [x] Copiar imagen del Centro de Ciencia a carpeta pública
- [x] Actualizar IEOficiales.tsx con 14 IE y campos de imagen
- [x] Agregar imagen del Centro de Ciencia en su sección destacada

- [x] Eliminar campo "Agregar imagen (URL)" de IEOficiales.tsx

- [x] Actualizar URLs de sitios web de cada Institución Educativa


## Logo del Centro CID

- [x] Copiar logo a carpeta pública
- [x] Actualizar Header para mostrar logo en lugar de "App"


## Actualización de Información de IE

- [x] Actualizar rectores, teléfonos y direcciones de todas las 14 IE


## Fotos de Instituciones Educativas

- [x] Copiar 8 fotos de IE a carpeta pública
- [x] Actualizar IEOficiales.tsx con rutas de imágenes


## Cambios en Página Proyectos

- [x] Cambiar título de "Proyectos STEM e Investigación" a "Proyectos de Innovación"


## Actualización de Territorio STEM

- [x] Cambiar "Instituciones Educativas" de 15 a 14
- [x] Cambiar "Gestores de Innovación" de 45 a 14


## Logos de Instituciones Educativas

- [x] Copiar 6 logos de IE a carpeta pública
- [x] Actualizar IEOficiales.tsx para mostrar logos debajo de fotos


## Ajuste de Posición de Logos

- [x] Eliminar sección de logos debajo de fotos
- [x] Reemplazar icono del edificio por logo pequeño en parte izquierda


## Cambios Finales Solicitados

- [x] Agregar transición deslizar al carrusel de E-Cards en Cursos Destacados
- [x] Eliminar Centro de Ciencia de página IE Oficiales
- [x] Reemplazar "Normatividad MEN" por: Acuerdos, Leyes, Resoluciones, Circulares


## Transición Deslizar en Carrusel

- [x] Agregar transición deslizar al carrusel de E-Cards en Cursos Destacados


## Juego Envigado Curioso (CID Kids)

- [ ] Copiar mapa e imágenes de animales a carpeta pública
- [ ] Crear página del juego Envigado Curioso (/juegos/envigado-curioso)
- [ ] Actualizar CIDKids.tsx con enlace al nuevo juego
- [ ] Agregar ruta en App.tsx


## Rediseño CRM - Nueva Fase

### Base de Datos
- [x] Crear tablas: centros_interes, sesiones, asistencia, asesorias
- [x] Crear funciones de base de datos en db.ts
- [x] Crear procedimientos tRPC para todas las tablas
- [ ] Crear endpoint para cargar datos desde Excel (solo admin)
- [ ] Validar integridad referencial de datos

### Interfaz de Usuario
- [x] Crear componente CRMNew.tsx con 4 pestañas
- [x] Implementar búsqueda en cada pestaña
- [x] Crear diálogos para crear centros de interés
- [x] Crear diálogos para crear sesiones
- [ ] Crear diálogos para agregar asistencia
- [x] Crear diálogos para crear asesorías
- [ ] Crear diálogos para editar registros
- [ ] Implementar confirmación de eliminación

### Funcionalidades Avanzadas
- [ ] Exportar reportes de asistencia a Excel
- [ ] Exportar reportes de asistencia a PDF
- [ ] Validación de datos en formularios
- [ ] Manejo de errores y mensajes de éxito
- [ ] Paginación para tablas grandes

### Permisos y Seguridad
- [ ] Verificar que gestores solo ven sus registros
- [ ] Verificar que admins ven todos los registros
- [ ] Proteger endpoints tRPC con autenticación
- [ ] Auditoría de cambios (quién creó/editó qué)

### Testing
- [ ] Escribir tests para procedimientos tRPC
- [ ] Escribir tests para restricciones de permisos
- [ ] Escribir tests para exportación de reportes
- [ ] Pruebas manuales de flujos completos

### Carga de Datos
- [ ] Crear script para cargar datos desde Excel
- [ ] Validar que los datos se cargan correctamente
- [ ] Crear datos de prueba para demostración
