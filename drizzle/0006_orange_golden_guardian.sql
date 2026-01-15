CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other');--> statement-breakpoint
ALTER TABLE "subjects" ADD COLUMN "year_level" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "gender" "gender";