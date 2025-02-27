-- CreateTable
CREATE TABLE "Ability" (
    "id" UUID NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armor" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "description" TEXT,
    "modifier" INTEGER,
    "magic_item_id" UUID,

    CONSTRAINT "Armor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArmorProperty" (
    "id" UUID NOT NULL,
    "Armor_id" UUID,
    "value" VARCHAR,

    CONSTRAINT "ArmorProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttunedItems" (
    "id" UUID NOT NULL,
    "player_character_id" UUID,
    "item_id" UUID,
    "item_type" VARCHAR,

    CONSTRAINT "AttunedItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Background" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "description" TEXT,

    CONSTRAINT "Background_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackgroundFeature" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "level" INTEGER,
    "background_id" UUID,
    "type" VARCHAR,
    "description" TEXT,
    "max_uses" INTEGER,
    "refresh_period" VARCHAR,

    CONSTRAINT "BackgroundFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "slug" VARCHAR,
    "description" TEXT,
    "hitDice" VARCHAR,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassFeature" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "level" INTEGER,
    "base_class_id" UUID,
    "SubClass_id" UUID,
    "type" VARCHAR,
    "description" TEXT,
    "max_uses" INTEGER,
    "refresh_period" VARCHAR,

    CONSTRAINT "ClassFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condition" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "description" TEXT,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "denomination" INTEGER,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExhaustionLevel" (
    "level" INTEGER NOT NULL,
    "effect" TEXT,

    CONSTRAINT "ExhaustionLevel_pkey" PRIMARY KEY ("level")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "capacity" INTEGER,
    "type" VARCHAR,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" UUID NOT NULL,
    "inventory_id" UUID,
    "item_type" VARCHAR,
    "item_id" UUID,
    "quantity" INTEGER,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Languages" (
    "id" UUID NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagicItem" (
    "id" UUID NOT NULL,
    "item_type" VARCHAR,
    "item_id" UUID,
    "requires_attunement" BOOLEAN,

    CONSTRAINT "MagicItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "item_id" UUID,
    "item_type" VARCHAR,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacter" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "gender" VARCHAR,
    "alignment" VARCHAR,
    "player_id" TEXT,
    "race_id" UUID,
    "sub_race_id" UUID,
    "max_hp" INTEGER,
    "current_hp" INTEGER,
    "temporary_hp" INTEGER,
    "death_save_successes" INTEGER,
    "death_save_failures" INTEGER,
    "darkvision_bright_ft" INTEGER,
    "darkvision_dim_ft" INTEGER,
    "walk_speed_ft" INTEGER,
    "fly_speed_ft" INTEGER,
    "climb_speed_ft" INTEGER,
    "swim_speed_ft" INTEGER,
    "exhaustion_level" INTEGER,

    CONSTRAINT "PlayerCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacterAbilityScore" (
    "id" UUID NOT NULL,
    "player_character_id" UUID,
    "ability_id" UUID,
    "score" INTEGER,
    "proficient" BOOLEAN,

    CONSTRAINT "PlayerCharacterAbilityScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacterBackground" (
    "id" UUID NOT NULL,
    "player_character_id" UUID,
    "background_id" UUID,

    CONSTRAINT "PlayerCharacterBackground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacterClass" (
    "id" UUID NOT NULL,
    "player_character_id" UUID,
    "class_id" UUID,
    "SubClass_ud" UUID,

    CONSTRAINT "PlayerCharacterClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacterCondition" (
    "id" UUID NOT NULL,
    "player_character_id" UUID,
    "condition_id" UUID,

    CONSTRAINT "PlayerCharacterCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacterCurrency" (
    "id" UUID NOT NULL,
    "player_character_id" UUID,
    "currency_id" UUID,
    "amount" INTEGER,

    CONSTRAINT "PlayerCharacterCurrency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacterFeature" (
    "id" UUID NOT NULL,
    "player_character_id" UUID,
    "feature_id" UUID,
    "feature_type" VARCHAR,
    "uses_expended" INTEGER,

    CONSTRAINT "PlayerCharacterFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacterInventory" (
    "id" UUID NOT NULL,
    "player_character_id" UUID,
    "inventory_id" UUID,

    CONSTRAINT "PlayerCharacterInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacterNote" (
    "id" UUID NOT NULL,
    "player_character_id" UUID,
    "name" VARCHAR,
    "contents" TEXT,

    CONSTRAINT "PlayerCharacterNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacterProficiency" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "type" VARCHAR,
    "type_id" UUID,
    "source_type" VARCHAR,
    "source_id" UUID,

    CONSTRAINT "PlayerCharacterProficiency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacterSkill" (
    "id" UUID NOT NULL,
    "player_character_id" UUID,
    "skill_id" UUID,
    "proficient" BOOLEAN,
    "expert" BOOLEAN,

    CONSTRAINT "PlayerCharacterSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacterSpell" (
    "id" UUID NOT NULL,
    "player_character_spellcaster_id" UUID,
    "spell_id" UUID,
    "prepared" BOOLEAN,

    CONSTRAINT "PlayerCharacterSpell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacterSpellSlot" (
    "id" UUID NOT NULL,
    "player_character_spellcaster_id" UUID,
    "level" INTEGER,
    "max" INTEGER,
    "expended" INTEGER,

    CONSTRAINT "PlayerCharacterSpellSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCharacterSpellcaster" (
    "id" UUID NOT NULL,
    "player_character_id" UUID,
    "player_character_ability_score_id" UUID,

    CONSTRAINT "PlayerCharacterSpellcaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "description" TEXT,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaceFeature" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "level" INTEGER,
    "race_id" UUID,
    "sub_race_id" UUID,
    "type" VARCHAR,
    "description" TEXT,
    "max_uses" INTEGER,
    "refresh_period" VARCHAR,

    CONSTRAINT "RaceFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "ability_id" UUID,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "description" TEXT,
    "verbal" BOOLEAN,
    "somatic" BOOLEAN,
    "material" BOOLEAN,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpellMaterial" (
    "id" UUID NOT NULL,
    "spell_id" UUID,
    "material_id" UUID,
    "amount" INTEGER,

    CONSTRAINT "SpellMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubClass" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "slug" VARCHAR,
    "min_level" INTEGER,
    "description" TEXT,
    "base_class_id" UUID,

    CONSTRAINT "SubClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubRace" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "description" TEXT,
    "race_id" UUID,

    CONSTRAINT "SubRace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "description" TEXT,
    "range_ft" INTEGER,
    "long_range_ft" INTEGER,
    "hit_bonus" INTEGER,
    "magic_item_id" UUID,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponDamage" (
    "id" UUID NOT NULL,
    "weapon_id" UUID,
    "dice" VARCHAR,
    "bonus" INTEGER,
    "type" VARCHAR,

    CONSTRAINT "WeaponDamage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponProperty" (
    "id" UUID NOT NULL,
    "weapon_id" UUID,
    "value" VARCHAR,

    CONSTRAINT "WeaponProperty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Armor_magic_item_id_key" ON "Armor"("magic_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "BackgroundFeature_name_key" ON "BackgroundFeature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Class_slug_key" ON "Class"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ClassFeature_name_key" ON "ClassFeature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RaceFeature_name_key" ON "RaceFeature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubClass_name_key" ON "SubClass"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubClass_slug_key" ON "SubClass"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_name_key" ON "Weapon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_magic_item_id_key" ON "Weapon"("magic_item_id");

-- AddForeignKey
ALTER TABLE "ArmorProperty" ADD CONSTRAINT "ArmorProperty_Armor_id_fkey" FOREIGN KEY ("Armor_id") REFERENCES "Armor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AttunedItems" ADD CONSTRAINT "AttunedItems_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "PlayerCharacter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BackgroundFeature" ADD CONSTRAINT "BackgroundFeature_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "Background"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ClassFeature" ADD CONSTRAINT "ClassFeature_SubClass_id_fkey" FOREIGN KEY ("SubClass_id") REFERENCES "SubClass"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ClassFeature" ADD CONSTRAINT "ClassFeature_base_class_id_fkey" FOREIGN KEY ("base_class_id") REFERENCES "Class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MagicItem" ADD CONSTRAINT "MagicItem_id_fkey" FOREIGN KEY ("id") REFERENCES "Weapon"("magic_item_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MagicItem" ADD CONSTRAINT "MagicItem_id_fkey1" FOREIGN KEY ("id") REFERENCES "Armor"("magic_item_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacter" ADD CONSTRAINT "PlayerCharacter_exhaustion_level_fkey" FOREIGN KEY ("exhaustion_level") REFERENCES "ExhaustionLevel"("level") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacter" ADD CONSTRAINT "PlayerCharacter_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterAbilityScore" ADD CONSTRAINT "PlayerCharacterAbilityScore_ability_id_fkey" FOREIGN KEY ("ability_id") REFERENCES "Ability"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterAbilityScore" ADD CONSTRAINT "PlayerCharacterAbilityScore_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "PlayerCharacter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterBackground" ADD CONSTRAINT "PlayerCharacterBackground_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "Background"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterBackground" ADD CONSTRAINT "PlayerCharacterBackground_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "PlayerCharacter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterClass" ADD CONSTRAINT "PlayerCharacterClass_SubClass_ud_fkey" FOREIGN KEY ("SubClass_ud") REFERENCES "SubClass"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterClass" ADD CONSTRAINT "PlayerCharacterClass_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterClass" ADD CONSTRAINT "PlayerCharacterClass_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "PlayerCharacter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterCondition" ADD CONSTRAINT "PlayerCharacterCondition_condition_id_fkey" FOREIGN KEY ("condition_id") REFERENCES "Condition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterCondition" ADD CONSTRAINT "PlayerCharacterCondition_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "PlayerCharacter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterCurrency" ADD CONSTRAINT "PlayerCharacterCurrency_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "Currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterCurrency" ADD CONSTRAINT "PlayerCharacterCurrency_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "PlayerCharacter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterFeature" ADD CONSTRAINT "PlayerCharacterFeature_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "PlayerCharacter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterInventory" ADD CONSTRAINT "PlayerCharacterInventory_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "PlayerCharacter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterSkill" ADD CONSTRAINT "PlayerCharacterSkill_player_character_id_fkey" FOREIGN KEY ("player_character_id") REFERENCES "PlayerCharacter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCharacterSkill" ADD CONSTRAINT "PlayerCharacterSkill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RaceFeature" ADD CONSTRAINT "RaceFeature_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "Race"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RaceFeature" ADD CONSTRAINT "RaceFeature_sub_race_id_fkey" FOREIGN KEY ("sub_race_id") REFERENCES "SubRace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_ability_id_fkey" FOREIGN KEY ("ability_id") REFERENCES "Ability"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SubClass" ADD CONSTRAINT "SubClass_base_class_id_fkey" FOREIGN KEY ("base_class_id") REFERENCES "Class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SubRace" ADD CONSTRAINT "SubRace_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "Race"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "WeaponDamage" ADD CONSTRAINT "WeaponDamage_weapon_id_fkey" FOREIGN KEY ("weapon_id") REFERENCES "Weapon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "WeaponProperty" ADD CONSTRAINT "WeaponProperty_weapon_id_fkey" FOREIGN KEY ("weapon_id") REFERENCES "Weapon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
