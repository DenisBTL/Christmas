CREATE TABLE `invitation_responses` (
	`guest_id` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`attendance` text NOT NULL,
	`films` text NOT NULL,
	`allergy_status` text NOT NULL,
	`allergy_detail` text NOT NULL,
	`note` text NOT NULL,
	`updated_at` text NOT NULL
);
