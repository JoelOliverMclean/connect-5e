CREATE TABLE "Ability" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE "Armor" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" text,
	"modifier" integer,
	"magic_item_id" uuid,
	CONSTRAINT "Armor_magic_item_id_key" UNIQUE("magic_item_id")
);
--> statement-breakpoint
CREATE TABLE "ArmorProperty" (
	"id" uuid PRIMARY KEY NOT NULL,
	"armor_id" uuid,
	"value" varchar
);
--> statement-breakpoint
CREATE TABLE "AttunedItems" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_character_id" uuid,
	"item_id" uuid,
	"item_type" varchar
);
--> statement-breakpoint
CREATE TABLE "Background" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "BackgroundFeature" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"level" integer,
	"background_id" uuid,
	"type" varchar,
	"description" text,
	"max_uses" integer,
	"refresh_period" varchar,
	CONSTRAINT "BackgroundFeature_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "ClassFeature" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"level" integer,
	"base_class_id" uuid,
	"sub_class_id" uuid,
	"type" varchar,
	"description" text,
	"max_uses" integer,
	"refresh_period" varchar,
	CONSTRAINT "ClassFeature_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "Condition" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "Currency" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"denomination" integer
);
--> statement-breakpoint
CREATE TABLE "ExhaustionLevel" (
	"level" integer PRIMARY KEY NOT NULL,
	"effect" text
);
--> statement-breakpoint
CREATE TABLE "Inventory" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"capacity" integer,
	"type" varchar
);
--> statement-breakpoint
CREATE TABLE "InventoryItem" (
	"id" uuid PRIMARY KEY NOT NULL,
	"inventory_id" uuid,
	"item_type" varchar,
	"item_id" uuid,
	"quantity" integer
);
--> statement-breakpoint
CREATE TABLE "Languages" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE "MagicItem" (
	"id" uuid PRIMARY KEY NOT NULL,
	"item_type" varchar,
	"item_id" uuid,
	"requires_attunement" boolean
);
--> statement-breakpoint
CREATE TABLE "Material" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"item_id" uuid,
	"item_type" varchar
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacter" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"gender" varchar,
	"alignment" varchar,
	"player_id" text,
	"race_id" uuid,
	"sub_race_id" uuid,
	"max_hp" integer,
	"current_hp" integer,
	"temporary_hp" integer,
	"death_save_successes" integer,
	"death_save_failures" integer,
	"darkvision_bright_ft" integer,
	"darkvision_dim_ft" integer,
	"walk_speed_ft" integer,
	"fly_speed_ft" integer,
	"climb_speed_ft" integer,
	"swim_speed_ft" integer,
	"exhaustion_level" integer
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacterAbilityScore" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_character_id" uuid,
	"ability_id" uuid,
	"score" integer,
	"proficient" boolean
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacterBackground" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_character_id" uuid,
	"background_id" uuid
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacterClass" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_character_id" uuid,
	"base_class_id" uuid,
	"sub_class_ud" uuid
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacterCondition" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_character_id" uuid,
	"condition_id" uuid
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacterCurrency" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_character_id" uuid,
	"currency_id" uuid,
	"amount" integer
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacterFeature" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_character_id" uuid,
	"feature_id" uuid,
	"feature_type" varchar,
	"uses_expended" integer
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacterInventory" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_character_id" uuid,
	"inventory_id" uuid
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacterNote" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_character_id" uuid,
	"name" varchar,
	"contents" text
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacterProficiency" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"type" varchar,
	"type_id" uuid,
	"source_type" varchar,
	"source_id" uuid
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacterSkill" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_character_id" uuid,
	"skill_id" uuid,
	"proficient" boolean,
	"expert" boolean
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacterSpell" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_character_spellcaster_id" uuid,
	"spell_id" uuid,
	"prepared" boolean
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacterSpellSlot" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_character_spellcaster_id" uuid,
	"level" integer,
	"max" integer,
	"expended" integer
);
--> statement-breakpoint
CREATE TABLE "PlayerCharacterSpellcaster" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_character_id" uuid,
	"player_character_ability_score_id" uuid
);
--> statement-breakpoint
CREATE TABLE "Race" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "RaceFeature" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"level" integer,
	"race_id" uuid,
	"sub_race_id" uuid,
	"type" varchar,
	"description" text,
	"max_uses" integer,
	"refresh_period" varchar,
	CONSTRAINT "RaceFeature_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "Skill" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"ability_id" uuid
);
--> statement-breakpoint
CREATE TABLE "Spell" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" text,
	"verbal" boolean,
	"somatic" boolean,
	"material" boolean
);
--> statement-breakpoint
CREATE TABLE "SpellMaterial" (
	"id" uuid PRIMARY KEY NOT NULL,
	"spell_id" uuid,
	"material_id" uuid,
	"amount" integer
);
--> statement-breakpoint
CREATE TABLE "SubClass" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"slug" varchar,
	"min_level" integer,
	"description" text,
	"base_class_id" uuid,
	CONSTRAINT "SubClass_name_key" UNIQUE("name"),
	CONSTRAINT "SubClass_slug_key" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "SubRace" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" text,
	"race_id" uuid
);
--> statement-breakpoint
CREATE TABLE "Weapon" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"description" text,
	"range_ft" integer,
	"long_range_ft" integer,
	"hit_bonus" integer,
	"magic_item_id" uuid,
	CONSTRAINT "Weapon_name_key" UNIQUE("name"),
	CONSTRAINT "Weapon_magic_item_id_key" UNIQUE("magic_item_id")
);
--> statement-breakpoint
CREATE TABLE "WeaponDamage" (
	"id" uuid PRIMARY KEY NOT NULL,
	"weapon_id" uuid,
	"dice" varchar,
	"bonus" integer,
	"type" varchar
);
--> statement-breakpoint
CREATE TABLE "WeaponProperty" (
	"id" uuid PRIMARY KEY NOT NULL,
	"weapon_id" uuid,
	"value" varchar
);
--> statement-breakpoint
ALTER TABLE "authenticator" RENAME COLUMN "credentialID" TO "credentialId";--> statement-breakpoint
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_credentialID_unique";--> statement-breakpoint
ALTER TABLE "ArmorProperty" ADD CONSTRAINT "ArmorProperty_armor_id_fkey" FOREIGN KEY ("armor_id") REFERENCES "public"."Armor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ArmorProperty" ADD CONSTRAINT "ArmorProperty_armor_id_fkey1" FOREIGN KEY ("armor_id") REFERENCES "public"."Armor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "AttunedItems" ADD CONSTRAINT "AttunedItems_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "public"."PlayerCharacter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BackgroundFeature" ADD CONSTRAINT "BackgroundFeature_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "public"."Background"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ClassFeature" ADD CONSTRAINT "ClassFeature_base_class_id_fkey" FOREIGN KEY ("base_class_id") REFERENCES "public"."BaseClass"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ClassFeature" ADD CONSTRAINT "ClassFeature_sub_class_id_fkey" FOREIGN KEY ("sub_class_id") REFERENCES "public"."SubClass"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ClassFeature" ADD CONSTRAINT "ClassFeature_base_class_id_fkey1" FOREIGN KEY ("base_class_id") REFERENCES "public"."BaseClass"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ClassFeature" ADD CONSTRAINT "ClassFeature_sub_class_id_fkey1" FOREIGN KEY ("sub_class_id") REFERENCES "public"."SubClass"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "MagicItem" ADD CONSTRAINT "MagicItem_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Weapon"("magic_item_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "MagicItem" ADD CONSTRAINT "MagicItem_id_fkey1" FOREIGN KEY ("id") REFERENCES "public"."Armor"("magic_item_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "MagicItem" ADD CONSTRAINT "MagicItem_id_fkey2" FOREIGN KEY ("id") REFERENCES "public"."Weapon"("magic_item_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "MagicItem" ADD CONSTRAINT "MagicItem_id_fkey3" FOREIGN KEY ("id") REFERENCES "public"."Armor"("magic_item_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacter" ADD CONSTRAINT "PlayerCharacter_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacter" ADD CONSTRAINT "PlayerCharacter_exhaustion_level_fkey" FOREIGN KEY ("exhaustion_level") REFERENCES "public"."ExhaustionLevel"("level") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterAbilityScore" ADD CONSTRAINT "PlayerCharacterAbilityScore_ability_id_fkey" FOREIGN KEY ("ability_id") REFERENCES "public"."Ability"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterAbilityScore" ADD CONSTRAINT "PlayerCharacterAbilityScore_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "public"."PlayerCharacter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterBackground" ADD CONSTRAINT "PlayerCharacterBackground_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "public"."PlayerCharacter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterBackground" ADD CONSTRAINT "PlayerCharacterBackground_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "public"."Background"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterClass" ADD CONSTRAINT "PlayerCharacterClass_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "public"."PlayerCharacter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterClass" ADD CONSTRAINT "PlayerCharacterClass_base_class_id_fkey" FOREIGN KEY ("base_class_id") REFERENCES "public"."BaseClass"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterClass" ADD CONSTRAINT "PlayerCharacterClass_sub_class_ud_fkey" FOREIGN KEY ("sub_class_ud") REFERENCES "public"."SubClass"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterCondition" ADD CONSTRAINT "PlayerCharacterCondition_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "public"."PlayerCharacter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterCondition" ADD CONSTRAINT "PlayerCharacterCondition_condition_id_fkey" FOREIGN KEY ("condition_id") REFERENCES "public"."Condition"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterCurrency" ADD CONSTRAINT "PlayerCharacterCurrency_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "public"."PlayerCharacter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterCurrency" ADD CONSTRAINT "PlayerCharacterCurrency_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "public"."Currency"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterFeature" ADD CONSTRAINT "PlayerCharacterFeature_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "public"."PlayerCharacter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterInventory" ADD CONSTRAINT "PlayerCharacterInventory_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "public"."PlayerCharacter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterSkill" ADD CONSTRAINT "PlayerCharacterSkill_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "public"."PlayerCharacter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerCharacterSkill" ADD CONSTRAINT "PlayerCharacterSkill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."Skill"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "RaceFeature" ADD CONSTRAINT "RaceFeature_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "public"."Race"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "RaceFeature" ADD CONSTRAINT "RaceFeature_sub_race_id_fkey" FOREIGN KEY ("sub_race_id") REFERENCES "public"."SubRace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "RaceFeature" ADD CONSTRAINT "RaceFeature_race_id_fkey1" FOREIGN KEY ("race_id") REFERENCES "public"."Race"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "RaceFeature" ADD CONSTRAINT "RaceFeature_sub_race_id_fkey1" FOREIGN KEY ("sub_race_id") REFERENCES "public"."SubRace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_ability_id_fkey" FOREIGN KEY ("ability_id") REFERENCES "public"."Ability"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SubClass" ADD CONSTRAINT "SubClass_base_class_id_fkey" FOREIGN KEY ("base_class_id") REFERENCES "public"."BaseClass"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SubClass" ADD CONSTRAINT "SubClass_base_class_id_fkey1" FOREIGN KEY ("base_class_id") REFERENCES "public"."BaseClass"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SubRace" ADD CONSTRAINT "SubRace_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "public"."Race"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SubRace" ADD CONSTRAINT "SubRace_race_id_fkey1" FOREIGN KEY ("race_id") REFERENCES "public"."Race"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WeaponDamage" ADD CONSTRAINT "WeaponDamage_weapon_id_fkey" FOREIGN KEY ("weapon_id") REFERENCES "public"."Weapon"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WeaponDamage" ADD CONSTRAINT "WeaponDamage_weapon_id_fkey1" FOREIGN KEY ("weapon_id") REFERENCES "public"."Weapon"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WeaponProperty" ADD CONSTRAINT "WeaponProperty_weapon_id_fkey" FOREIGN KEY ("weapon_id") REFERENCES "public"."Weapon"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WeaponProperty" ADD CONSTRAINT "WeaponProperty_weapon_id_fkey1" FOREIGN KEY ("weapon_id") REFERENCES "public"."Weapon"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialId");