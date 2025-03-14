ALTER TABLE "Race" ADD COLUMN "slug" varchar;--> statement-breakpoint
ALTER TABLE "SubRace" ADD COLUMN "slug" varchar;--> statement-breakpoint
ALTER TABLE "Race" ADD CONSTRAINT "Race_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "SubRace" ADD CONSTRAINT "SubRace_slug_unique" UNIQUE("slug");