CREATE TABLE `centros_gestores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`centroInteresId` int NOT NULL,
	`gestorId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `centros_gestores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gestores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`email` varchar(320),
	`estado` enum('activo','inactivo') DEFAULT 'activo',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gestores_id` PRIMARY KEY(`id`),
	CONSTRAINT `gestores_nombre_unique` UNIQUE(`nombre`)
);
--> statement-breakpoint
ALTER TABLE `centros_interes` DROP COLUMN `gestorId`;