CREATE TABLE `favorite_tracks` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`album_image_url` text NOT NULL,
	`album_name` text NOT NULL,
	`duration` integer NOT NULL,
	`created_at` integer DEFAULT '"2025-09-16T16:28:22.377Z"' NOT NULL
);
