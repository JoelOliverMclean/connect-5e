CREATE TABLE "BaseClass" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"slug" varchar,
	"description" text,
	"hitDice" varchar,
	CONSTRAINT "BaseClass_name_key" UNIQUE("name"),
	CONSTRAINT "BaseClass_slug_key" UNIQUE("slug")
);
