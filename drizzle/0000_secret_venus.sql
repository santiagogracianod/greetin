CREATE TABLE "responses" (
	"id" serial PRIMARY KEY NOT NULL,
	"answer" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
