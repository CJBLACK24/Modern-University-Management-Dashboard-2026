DO $$ BEGIN
    CREATE TYPE "public"."room_type" AS ENUM('lecture', 'lab', 'special');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;--> statement-breakpoint
CREATE TABLE "exam_periods" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "exam_periods_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exams" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "exams_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"exam_period_id" integer NOT NULL,
	"class_id" integer NOT NULL,
	"room_id" integer,
	"proctor_id" text,
	"exam_date" date NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"status" varchar(20) DEFAULT 'scheduled',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "rooms_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"capacity" integer NOT NULL,
	"type" "room_type" DEFAULT 'lecture' NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "rooms_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "exams" ADD CONSTRAINT "exams_exam_period_id_exam_periods_id_fk" FOREIGN KEY ("exam_period_id") REFERENCES "public"."exam_periods"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exams" ADD CONSTRAINT "exams_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exams" ADD CONSTRAINT "exams_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exams" ADD CONSTRAINT "exams_proctor_id_user_id_fk" FOREIGN KEY ("proctor_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "exams_period_idx" ON "exams" USING btree ("exam_period_id");--> statement-breakpoint
CREATE INDEX "exams_class_idx" ON "exams" USING btree ("class_id");--> statement-breakpoint
CREATE INDEX "exams_date_idx" ON "exams" USING btree ("exam_date");--> statement-breakpoint
CREATE INDEX "exams_room_idx" ON "exams" USING btree ("room_id");--> statement-breakpoint
CREATE INDEX "exams_proctor_idx" ON "exams" USING btree ("proctor_id");