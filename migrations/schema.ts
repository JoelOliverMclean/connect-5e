import { pgTable, uuid, varchar, integer, text, timestamp, unique, foreignKey, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const inventory = pgTable("Inventory", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	capacity: integer(),
	type: varchar(),
});

export const verificationToken = pgTable("verificationToken", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
});

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text(),
	email: text(),
	emailVerified: timestamp({ mode: 'string' }),
	image: text(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const account = pgTable("account", {
	userId: text().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const authenticator = pgTable("authenticator", {
	credentialId: text().notNull(),
	userId: text().notNull(),
	providerAccountId: text().notNull(),
	credentialPublicKey: text().notNull(),
	counter: integer().notNull(),
	credentialDeviceType: text().notNull(),
	credentialBackedUp: boolean().notNull(),
	transports: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "authenticator_userId_user_id_fk"
		}).onDelete("cascade"),
	unique("authenticator_credentialID_unique").on(table.credentialId),
]);

export const session = pgTable("session", {
	sessionToken: text().primaryKey().notNull(),
	userId: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const playerCharacterInventory = pgTable("PlayerCharacterInventory", {
	id: uuid().primaryKey().notNull(),
	playerCharacterId: uuid("player_character_id"),
	inventoryId: uuid("inventory_id"),
}, (table) => [
	foreignKey({
			columns: [table.playerCharacterId],
			foreignColumns: [playerCharacter.id],
			name: "PlayerCharacterInventory_player_character_id_fkey"
		}),
]);

export const inventoryItem = pgTable("InventoryItem", {
	id: uuid().primaryKey().notNull(),
	inventoryId: uuid("inventory_id"),
	itemType: varchar("item_type"),
	itemId: uuid("item_id"),
	quantity: integer(),
});

export const playerCharacterNote = pgTable("PlayerCharacterNote", {
	id: uuid().primaryKey().notNull(),
	playerCharacterId: uuid("player_character_id"),
	name: varchar(),
	contents: text(),
});

export const magicItem = pgTable("MagicItem", {
	id: uuid().primaryKey().notNull(),
	itemType: varchar("item_type"),
	itemId: uuid("item_id"),
	requiresAttunement: boolean("requires_attunement"),
}, (table) => [
	foreignKey({
			columns: [table.id],
			foreignColumns: [weapon.magicItemId],
			name: "MagicItem_id_fkey"
		}),
	foreignKey({
			columns: [table.id],
			foreignColumns: [armor.magicItemId],
			name: "MagicItem_id_fkey1"
		}),
	foreignKey({
			columns: [table.id],
			foreignColumns: [weapon.magicItemId],
			name: "MagicItem_id_fkey2"
		}),
	foreignKey({
			columns: [table.id],
			foreignColumns: [armor.magicItemId],
			name: "MagicItem_id_fkey3"
		}),
]);

export const classFeature = pgTable("ClassFeature", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	level: integer(),
	baseClassId: uuid("base_class_id"),
	subClassId: uuid("sub_class_id"),
	type: varchar(),
	description: text(),
	maxUses: integer("max_uses"),
	refreshPeriod: varchar("refresh_period"),
}, (table) => [
	foreignKey({
			columns: [table.baseClassId],
			foreignColumns: [baseClass.id],
			name: "ClassFeature_base_class_id_fkey"
		}),
	foreignKey({
			columns: [table.subClassId],
			foreignColumns: [subClass.id],
			name: "ClassFeature_sub_class_id_fkey"
		}),
	foreignKey({
			columns: [table.baseClassId],
			foreignColumns: [baseClass.id],
			name: "ClassFeature_base_class_id_fkey1"
		}),
	foreignKey({
			columns: [table.subClassId],
			foreignColumns: [subClass.id],
			name: "ClassFeature_sub_class_id_fkey1"
		}),
	unique("ClassFeature_name_key").on(table.name),
]);

export const baseClass = pgTable("BaseClass", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	slug: varchar(),
	description: text(),
	hitDice: varchar(),
}, (table) => [
	unique("BaseClass_name_key").on(table.name),
	unique("BaseClass_slug_key").on(table.slug),
]);

export const weapon = pgTable("Weapon", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	description: text(),
	rangeFt: integer("range_ft"),
	longRangeFt: integer("long_range_ft"),
	hitBonus: integer("hit_bonus"),
	magicItemId: uuid("magic_item_id"),
}, (table) => [
	unique("Weapon_name_key").on(table.name),
	unique("Weapon_magic_item_id_key").on(table.magicItemId),
]);

export const armor = pgTable("Armor", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	description: text(),
	modifier: integer(),
	magicItemId: uuid("magic_item_id"),
}, (table) => [
	unique("Armor_magic_item_id_key").on(table.magicItemId),
]);

export const armorProperty = pgTable("ArmorProperty", {
	id: uuid().primaryKey().notNull(),
	armorId: uuid("armor_id"),
	value: varchar(),
}, (table) => [
	foreignKey({
			columns: [table.armorId],
			foreignColumns: [armor.id],
			name: "ArmorProperty_armor_id_fkey"
		}),
	foreignKey({
			columns: [table.armorId],
			foreignColumns: [armor.id],
			name: "ArmorProperty_armor_id_fkey1"
		}),
]);

export const race = pgTable("Race", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	description: text(),
});

export const raceFeature = pgTable("RaceFeature", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	level: integer(),
	raceId: uuid("race_id"),
	subRaceId: uuid("sub_race_id"),
	type: varchar(),
	description: text(),
	maxUses: integer("max_uses"),
	refreshPeriod: varchar("refresh_period"),
}, (table) => [
	foreignKey({
			columns: [table.raceId],
			foreignColumns: [race.id],
			name: "RaceFeature_race_id_fkey"
		}),
	foreignKey({
			columns: [table.subRaceId],
			foreignColumns: [subRace.id],
			name: "RaceFeature_sub_race_id_fkey"
		}),
	foreignKey({
			columns: [table.raceId],
			foreignColumns: [race.id],
			name: "RaceFeature_race_id_fkey1"
		}),
	foreignKey({
			columns: [table.subRaceId],
			foreignColumns: [subRace.id],
			name: "RaceFeature_sub_race_id_fkey1"
		}),
	unique("RaceFeature_name_key").on(table.name),
]);

export const playerCharacter = pgTable("PlayerCharacter", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	gender: varchar(),
	alignment: varchar(),
	playerId: text("player_id"),
	raceId: uuid("race_id"),
	subRaceId: uuid("sub_race_id"),
	maxHp: integer("max_hp"),
	currentHp: integer("current_hp"),
	temporaryHp: integer("temporary_hp"),
	deathSaveSuccesses: integer("death_save_successes"),
	deathSaveFailures: integer("death_save_failures"),
	darkvisionBrightFt: integer("darkvision_bright_ft"),
	darkvisionDimFt: integer("darkvision_dim_ft"),
	walkSpeedFt: integer("walk_speed_ft"),
	flySpeedFt: integer("fly_speed_ft"),
	climbSpeedFt: integer("climb_speed_ft"),
	swimSpeedFt: integer("swim_speed_ft"),
	exhaustionLevel: integer("exhaustion_level"),
}, (table) => [
	foreignKey({
			columns: [table.playerId],
			foreignColumns: [user.id],
			name: "PlayerCharacter_player_id_fkey"
		}),
	foreignKey({
			columns: [table.exhaustionLevel],
			foreignColumns: [exhaustionLevel.level],
			name: "PlayerCharacter_exhaustion_level_fkey"
		}),
]);

export const weaponDamage = pgTable("WeaponDamage", {
	id: uuid().primaryKey().notNull(),
	weaponId: uuid("weapon_id"),
	dice: varchar(),
	bonus: integer(),
	type: varchar(),
}, (table) => [
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weapon.id],
			name: "WeaponDamage_weapon_id_fkey"
		}),
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weapon.id],
			name: "WeaponDamage_weapon_id_fkey1"
		}),
]);

export const weaponProperty = pgTable("WeaponProperty", {
	id: uuid().primaryKey().notNull(),
	weaponId: uuid("weapon_id"),
	value: varchar(),
}, (table) => [
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weapon.id],
			name: "WeaponProperty_weapon_id_fkey"
		}),
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weapon.id],
			name: "WeaponProperty_weapon_id_fkey1"
		}),
]);

export const background = pgTable("Background", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	description: text(),
});

export const playerCharacterBackground = pgTable("PlayerCharacterBackground", {
	id: uuid().primaryKey().notNull(),
	playerCharacterId: uuid("player_character_id"),
	backgroundId: uuid("background_id"),
}, (table) => [
	foreignKey({
			columns: [table.playerCharacterId],
			foreignColumns: [playerCharacter.id],
			name: "PlayerCharacterBackground_player_character_id_fkey"
		}),
	foreignKey({
			columns: [table.backgroundId],
			foreignColumns: [background.id],
			name: "PlayerCharacterBackground_background_id_fkey"
		}),
]);

export const playerCharacterFeature = pgTable("PlayerCharacterFeature", {
	id: uuid().primaryKey().notNull(),
	playerCharacterId: uuid("player_character_id"),
	featureId: uuid("feature_id"),
	featureType: varchar("feature_type"),
	usesExpended: integer("uses_expended"),
}, (table) => [
	foreignKey({
			columns: [table.playerCharacterId],
			foreignColumns: [playerCharacter.id],
			name: "PlayerCharacterFeature_player_character_id_fkey"
		}),
]);

export const exhaustionLevel = pgTable("ExhaustionLevel", {
	level: integer().primaryKey().notNull(),
	effect: text(),
});

export const playerCharacterCondition = pgTable("PlayerCharacterCondition", {
	id: uuid().primaryKey().notNull(),
	playerCharacterId: uuid("player_character_id"),
	conditionId: uuid("condition_id"),
}, (table) => [
	foreignKey({
			columns: [table.playerCharacterId],
			foreignColumns: [playerCharacter.id],
			name: "PlayerCharacterCondition_player_character_id_fkey"
		}),
	foreignKey({
			columns: [table.conditionId],
			foreignColumns: [condition.id],
			name: "PlayerCharacterCondition_condition_id_fkey"
		}),
]);

export const condition = pgTable("Condition", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	description: text(),
});

export const skill = pgTable("Skill", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	abilityId: uuid("ability_id"),
}, (table) => [
	foreignKey({
			columns: [table.abilityId],
			foreignColumns: [ability.id],
			name: "Skill_ability_id_fkey"
		}),
]);

export const playerCharacterSkill = pgTable("PlayerCharacterSkill", {
	id: uuid().primaryKey().notNull(),
	playerCharacterId: uuid("player_character_id"),
	skillId: uuid("skill_id"),
	proficient: boolean(),
	expert: boolean(),
}, (table) => [
	foreignKey({
			columns: [table.playerCharacterId],
			foreignColumns: [playerCharacter.id],
			name: "PlayerCharacterSkill_player_character_id_fkey"
		}),
	foreignKey({
			columns: [table.skillId],
			foreignColumns: [skill.id],
			name: "PlayerCharacterSkill_skill_id_fkey"
		}),
]);

export const playerCharacterProficiency = pgTable("PlayerCharacterProficiency", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	type: varchar(),
	typeId: uuid("type_id"),
	sourceType: varchar("source_type"),
	sourceId: uuid("source_id"),
});

export const languages = pgTable("Languages", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
});

export const playerCharacterCurrency = pgTable("PlayerCharacterCurrency", {
	id: uuid().primaryKey().notNull(),
	playerCharacterId: uuid("player_character_id"),
	currencyId: uuid("currency_id"),
	amount: integer(),
}, (table) => [
	foreignKey({
			columns: [table.playerCharacterId],
			foreignColumns: [playerCharacter.id],
			name: "PlayerCharacterCurrency_player_character_id_fkey"
		}),
	foreignKey({
			columns: [table.currencyId],
			foreignColumns: [currency.id],
			name: "PlayerCharacterCurrency_currency_id_fkey"
		}),
]);

export const currency = pgTable("Currency", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	denomination: integer(),
});

export const ability = pgTable("Ability", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
});

export const playerCharacterClass = pgTable("PlayerCharacterClass", {
	id: uuid().primaryKey().notNull(),
	playerCharacterId: uuid("player_character_id"),
	baseClassId: uuid("base_class_id"),
	subClassUd: uuid("sub_class_ud"),
}, (table) => [
	foreignKey({
			columns: [table.playerCharacterId],
			foreignColumns: [playerCharacter.id],
			name: "PlayerCharacterClass_player_character_id_fkey"
		}),
	foreignKey({
			columns: [table.baseClassId],
			foreignColumns: [baseClass.id],
			name: "PlayerCharacterClass_base_class_id_fkey"
		}),
	foreignKey({
			columns: [table.subClassUd],
			foreignColumns: [subClass.id],
			name: "PlayerCharacterClass_sub_class_ud_fkey"
		}),
]);

export const spell = pgTable("Spell", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	description: text(),
	verbal: boolean(),
	somatic: boolean(),
	material: boolean(),
});

export const material = pgTable("Material", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	itemId: uuid("item_id"),
	itemType: varchar("item_type"),
});

export const spellMaterial = pgTable("SpellMaterial", {
	id: uuid().primaryKey().notNull(),
	spellId: uuid("spell_id"),
	materialId: uuid("material_id"),
	amount: integer(),
});

export const playerCharacterSpellcaster = pgTable("PlayerCharacterSpellcaster", {
	id: uuid().primaryKey().notNull(),
	playerCharacterId: uuid("player_character_id"),
	playerCharacterAbilityScoreId: uuid("player_character_ability_score_id"),
});

export const playerCharacterSpellSlot = pgTable("PlayerCharacterSpellSlot", {
	id: uuid().primaryKey().notNull(),
	playerCharacterSpellcasterId: uuid("player_character_spellcaster_id"),
	level: integer(),
	max: integer(),
	expended: integer(),
});

export const playerCharacterSpell = pgTable("PlayerCharacterSpell", {
	id: uuid().primaryKey().notNull(),
	playerCharacterSpellcasterId: uuid("player_character_spellcaster_id"),
	spellId: uuid("spell_id"),
	prepared: boolean(),
});

export const subClass = pgTable("SubClass", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	slug: varchar(),
	minLevel: integer("min_level"),
	description: text(),
	baseClassId: uuid("base_class_id"),
}, (table) => [
	foreignKey({
			columns: [table.baseClassId],
			foreignColumns: [baseClass.id],
			name: "SubClass_base_class_id_fkey"
		}),
	foreignKey({
			columns: [table.baseClassId],
			foreignColumns: [baseClass.id],
			name: "SubClass_base_class_id_fkey1"
		}),
	unique("SubClass_name_key").on(table.name),
	unique("SubClass_slug_key").on(table.slug),
]);

export const subRace = pgTable("SubRace", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	description: text(),
	raceId: uuid("race_id"),
}, (table) => [
	foreignKey({
			columns: [table.raceId],
			foreignColumns: [race.id],
			name: "SubRace_race_id_fkey"
		}),
	foreignKey({
			columns: [table.raceId],
			foreignColumns: [race.id],
			name: "SubRace_race_id_fkey1"
		}),
]);

export const backgroundFeature = pgTable("BackgroundFeature", {
	id: uuid().primaryKey().notNull(),
	name: varchar(),
	level: integer(),
	backgroundId: uuid("background_id"),
	type: varchar(),
	description: text(),
	maxUses: integer("max_uses"),
	refreshPeriod: varchar("refresh_period"),
}, (table) => [
	foreignKey({
			columns: [table.backgroundId],
			foreignColumns: [background.id],
			name: "BackgroundFeature_background_id_fkey"
		}),
	unique("BackgroundFeature_name_key").on(table.name),
]);

export const attunedItems = pgTable("AttunedItems", {
	id: uuid().primaryKey().notNull(),
	playerCharacterId: uuid("player_character_id"),
	itemId: uuid("item_id"),
	itemType: varchar("item_type"),
}, (table) => [
	foreignKey({
			columns: [table.playerCharacterId],
			foreignColumns: [playerCharacter.id],
			name: "AttunedItems_player_character_id_fkey"
		}),
]);

export const playerCharacterAbilityScore = pgTable("PlayerCharacterAbilityScore", {
	id: uuid().primaryKey().notNull(),
	playerCharacterId: uuid("player_character_id"),
	abilityId: uuid("ability_id"),
	score: integer(),
	proficient: boolean(),
}, (table) => [
	foreignKey({
			columns: [table.abilityId],
			foreignColumns: [ability.id],
			name: "PlayerCharacterAbilityScore_ability_id_fkey"
		}),
	foreignKey({
			columns: [table.playerCharacterId],
			foreignColumns: [playerCharacter.id],
			name: "PlayerCharacterAbilityScore_player_character_id_fkey"
		}),
]);
