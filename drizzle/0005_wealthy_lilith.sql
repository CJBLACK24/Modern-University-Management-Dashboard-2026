ALTER TABLE "enrollments" ADD COLUMN "enrolled_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "subjects" ADD COLUMN "credits" integer DEFAULT 3 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "first_name" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "last_name" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "birthday" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "university_id" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "semester" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "signature_url" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "department_id" integer;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_university_id_unique" UNIQUE("university_id");