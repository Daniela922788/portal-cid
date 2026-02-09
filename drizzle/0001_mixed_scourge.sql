CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descripcion` text,
	`imagen` varchar(500),
	`fechaInicio` timestamp,
	`fechaFin` timestamp,
	`horario` varchar(100),
	`lugar` varchar(255),
	`cupos` int,
	`publicoObjetivo` varchar(255),
	`responsable` varchar(255),
	`estado` enum('activo','inactivo','completado') DEFAULT 'activo',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `enrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`nombreParticipante` varchar(255) NOT NULL,
	`apellidoParticipante` varchar(255) NOT NULL,
	`emailParticipante` varchar(320) NOT NULL,
	`telefonoParticipante` varchar(20),
	`edadParticipante` int,
	`institucion` varchar(255),
	`nombreAcudiente` varchar(255),
	`emailAcudiente` varchar(320),
	`telefonoAcudiente` varchar(20),
	`residencia` varchar(255),
	`horarioPreferido` varchar(100),
	`estado` enum('nuevo','revisado','aprobado','rechazado') DEFAULT 'nuevo',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `enrollments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descripcion` text,
	`imagen` varchar(500),
	`fechaInicio` timestamp,
	`fechaFin` timestamp,
	`lugar` varchar(255),
	`estado` enum('proximo','en_curso','finalizado') DEFAULT 'proximo',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descripcion` text,
	`contenido` text,
	`imagen` varchar(500),
	`autor` varchar(255),
	`estado` enum('borrador','publicado','archivado') DEFAULT 'borrador',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `news_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pqrs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tipo` enum('peticion','queja','reclamo','sugerencia','felicitacion','denuncia','solicitud_info','solicitud_datos','agenda_cita') NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`telefono` varchar(20),
	`asunto` varchar(255) NOT NULL,
	`descripcion` text NOT NULL,
	`estado` enum('nuevo','en_proceso','resuelto','cerrado') DEFAULT 'nuevo',
	`respuesta` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pqrs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descripcion` text,
	`imagen` varchar(500),
	`institucion` varchar(255),
	`responsable` varchar(255),
	`estado` enum('activo','completado','archivado') DEFAULT 'activo',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
