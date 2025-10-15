-- Add columns as nullable first
ALTER TABLE "users" ADD COLUMN "first_name" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar(255);
-- Set all existing users to have a first and last name
UPDATE "users" SET "first_name" = 'Default', "last_name" = 'User';
-- Now make the columns NOT NULL
ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL;
ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL;
