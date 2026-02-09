CREATE TABLE `asesorias` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`tipoDocumento` varchar(50) NOT NULL,
	`documentoIdentidad` varchar(50) NOT NULL,
	`primerNombre` varchar(100) NOT NULL,
	`segundoNombre` varchar(100),
	`primerApellido` varchar(100) NOT NULL,
	`segundoApellido` varchar(100),
	`telefono` varchar(20),
	`correoElectronico` varchar(320),
	`institucionEducativa` varchar(255) NOT NULL,
	`rolPersona` varchar(100) NOT NULL,
	`barrioVereda` varchar(255),
	`ruralUrbano` enum('Rural','Urbano'),
	`fechaNacimiento` timestamp,
	`edad` int,
	`genero` enum('Hombre','Mujer','Otro'),
	`personasEspecialInteres` text,
	`autoreconocimientoEtnico` varchar(255),
	`orientacionSexual` varchar(255),
	`grado` varchar(50),
	`gestorInnovacionId` int NOT NULL,
	`duracionMinutos` int NOT NULL,
	`fechaAsesoria` timestamp NOT NULL,
	`tipoAcompanamiento` varchar(255) NOT NULL,
	`desarrolloAcompanamiento` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `asesorias_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `asistencia` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sesionId` int NOT NULL,
	`documentoEstudiante` varchar(50) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `asistencia_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `centros_interes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`gestorId` int NOT NULL,
	`correoGestor` varchar(320) NOT NULL,
	`institucionEducativa` varchar(255) NOT NULL,
	`fechaInicio` timestamp NOT NULL,
	`numeroSesiones` int NOT NULL,
	`lineaTematica` varchar(255) NOT NULL,
	`codigoGrupo` varchar(100) NOT NULL,
	`grado` text,
	`numeroEstudiantes` int NOT NULL,
	`numeroDocentes` int NOT NULL,
	`estado` enum('activo','inactivo','completado') DEFAULT 'activo',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `centros_interes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sesiones` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`centroInteresId` int NOT NULL,
	`numeroSesion` int NOT NULL,
	`fechaHora` timestamp NOT NULL,
	`duracionMinutos` int NOT NULL,
	`estado` enum('pendiente','completada','cancelada') DEFAULT 'pendiente',
	`observaciones` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sesiones_id` PRIMARY KEY(`id`)
);
