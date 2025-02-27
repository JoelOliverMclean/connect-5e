import { relations } from "drizzle-orm/relations";
import { user, account, authenticator, session, playerCharacter, playerCharacterInventory, weapon, magicItem, armor, baseClass, classFeature, subClass, armorProperty, race, raceFeature, subRace, exhaustionLevel, weaponDamage, weaponProperty, playerCharacterBackground, background, playerCharacterFeature, playerCharacterCondition, condition, ability, skill, playerCharacterSkill, playerCharacterCurrency, currency, playerCharacterClass, backgroundFeature, attunedItems, playerCharacterAbilityScore } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	authenticators: many(authenticator),
	sessions: many(session),
	playerCharacters: many(playerCharacter),
}));

export const authenticatorRelations = relations(authenticator, ({one}) => ({
	user: one(user, {
		fields: [authenticator.userId],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const playerCharacterInventoryRelations = relations(playerCharacterInventory, ({one}) => ({
	playerCharacter: one(playerCharacter, {
		fields: [playerCharacterInventory.playerCharacterId],
		references: [playerCharacter.id]
	}),
}));

export const playerCharacterRelations = relations(playerCharacter, ({one, many}) => ({
	playerCharacterInventories: many(playerCharacterInventory),
	user: one(user, {
		fields: [playerCharacter.playerId],
		references: [user.id]
	}),
	exhaustionLevel: one(exhaustionLevel, {
		fields: [playerCharacter.exhaustionLevel],
		references: [exhaustionLevel.level]
	}),
	playerCharacterBackgrounds: many(playerCharacterBackground),
	playerCharacterFeatures: many(playerCharacterFeature),
	playerCharacterConditions: many(playerCharacterCondition),
	playerCharacterSkills: many(playerCharacterSkill),
	playerCharacterCurrencies: many(playerCharacterCurrency),
	playerCharacterClasses: many(playerCharacterClass),
	attunedItems: many(attunedItems),
	playerCharacterAbilityScores: many(playerCharacterAbilityScore),
}));

export const magicItemRelations = relations(magicItem, ({one}) => ({
	weapon_id: one(weapon, {
		fields: [magicItem.id],
		references: [weapon.magicItemId],
		relationName: "magicItem_id_weapon_magicItemId"
	}),
	armor_id: one(armor, {
		fields: [magicItem.id],
		references: [armor.magicItemId],
		relationName: "magicItem_id_armor_magicItemId"
	}),
	weapon_id: one(weapon, {
		fields: [magicItem.id],
		references: [weapon.magicItemId],
		relationName: "magicItem_id_weapon_magicItemId"
	}),
	armor_id: one(armor, {
		fields: [magicItem.id],
		references: [armor.magicItemId],
		relationName: "magicItem_id_armor_magicItemId"
	}),
}));

export const weaponRelations = relations(weapon, ({many}) => ({
	magicItems_id: many(magicItem, {
		relationName: "magicItem_id_weapon_magicItemId"
	}),
	magicItems_id: many(magicItem, {
		relationName: "magicItem_id_weapon_magicItemId"
	}),
	weaponDamages_weaponId: many(weaponDamage, {
		relationName: "weaponDamage_weaponId_weapon_id"
	}),
	weaponDamages_weaponId: many(weaponDamage, {
		relationName: "weaponDamage_weaponId_weapon_id"
	}),
	weaponProperties_weaponId: many(weaponProperty, {
		relationName: "weaponProperty_weaponId_weapon_id"
	}),
	weaponProperties_weaponId: many(weaponProperty, {
		relationName: "weaponProperty_weaponId_weapon_id"
	}),
}));

export const armorRelations = relations(armor, ({many}) => ({
	magicItems_id: many(magicItem, {
		relationName: "magicItem_id_armor_magicItemId"
	}),
	magicItems_id: many(magicItem, {
		relationName: "magicItem_id_armor_magicItemId"
	}),
	armorProperties_armorId: many(armorProperty, {
		relationName: "armorProperty_armorId_armor_id"
	}),
	armorProperties_armorId: many(armorProperty, {
		relationName: "armorProperty_armorId_armor_id"
	}),
}));

export const classFeatureRelations = relations(classFeature, ({one}) => ({
	baseClass_baseClassId: one(baseClass, {
		fields: [classFeature.baseClassId],
		references: [baseClass.id],
		relationName: "classFeature_baseClassId_baseClass_id"
	}),
	subClass_subClassId: one(subClass, {
		fields: [classFeature.subClassId],
		references: [subClass.id],
		relationName: "classFeature_subClassId_subClass_id"
	}),
	baseClass_baseClassId: one(baseClass, {
		fields: [classFeature.baseClassId],
		references: [baseClass.id],
		relationName: "classFeature_baseClassId_baseClass_id"
	}),
	subClass_subClassId: one(subClass, {
		fields: [classFeature.subClassId],
		references: [subClass.id],
		relationName: "classFeature_subClassId_subClass_id"
	}),
}));

export const baseClassRelations = relations(baseClass, ({many}) => ({
	classFeatures_baseClassId: many(classFeature, {
		relationName: "classFeature_baseClassId_baseClass_id"
	}),
	classFeatures_baseClassId: many(classFeature, {
		relationName: "classFeature_baseClassId_baseClass_id"
	}),
	playerCharacterClasses: many(playerCharacterClass),
	subClasses_baseClassId: many(subClass, {
		relationName: "subClass_baseClassId_baseClass_id"
	}),
	subClasses_baseClassId: many(subClass, {
		relationName: "subClass_baseClassId_baseClass_id"
	}),
}));

export const subClassRelations = relations(subClass, ({one, many}) => ({
	classFeatures_subClassId: many(classFeature, {
		relationName: "classFeature_subClassId_subClass_id"
	}),
	classFeatures_subClassId: many(classFeature, {
		relationName: "classFeature_subClassId_subClass_id"
	}),
	playerCharacterClasses: many(playerCharacterClass),
	baseClass_baseClassId: one(baseClass, {
		fields: [subClass.baseClassId],
		references: [baseClass.id],
		relationName: "subClass_baseClassId_baseClass_id"
	}),
	baseClass_baseClassId: one(baseClass, {
		fields: [subClass.baseClassId],
		references: [baseClass.id],
		relationName: "subClass_baseClassId_baseClass_id"
	}),
}));

export const armorPropertyRelations = relations(armorProperty, ({one}) => ({
	armor_armorId: one(armor, {
		fields: [armorProperty.armorId],
		references: [armor.id],
		relationName: "armorProperty_armorId_armor_id"
	}),
	armor_armorId: one(armor, {
		fields: [armorProperty.armorId],
		references: [armor.id],
		relationName: "armorProperty_armorId_armor_id"
	}),
}));

export const raceFeatureRelations = relations(raceFeature, ({one}) => ({
	race_raceId: one(race, {
		fields: [raceFeature.raceId],
		references: [race.id],
		relationName: "raceFeature_raceId_race_id"
	}),
	subRace_subRaceId: one(subRace, {
		fields: [raceFeature.subRaceId],
		references: [subRace.id],
		relationName: "raceFeature_subRaceId_subRace_id"
	}),
	race_raceId: one(race, {
		fields: [raceFeature.raceId],
		references: [race.id],
		relationName: "raceFeature_raceId_race_id"
	}),
	subRace_subRaceId: one(subRace, {
		fields: [raceFeature.subRaceId],
		references: [subRace.id],
		relationName: "raceFeature_subRaceId_subRace_id"
	}),
}));

export const raceRelations = relations(race, ({many}) => ({
	raceFeatures_raceId: many(raceFeature, {
		relationName: "raceFeature_raceId_race_id"
	}),
	raceFeatures_raceId: many(raceFeature, {
		relationName: "raceFeature_raceId_race_id"
	}),
	subRaces_raceId: many(subRace, {
		relationName: "subRace_raceId_race_id"
	}),
	subRaces_raceId: many(subRace, {
		relationName: "subRace_raceId_race_id"
	}),
}));

export const subRaceRelations = relations(subRace, ({one, many}) => ({
	raceFeatures_subRaceId: many(raceFeature, {
		relationName: "raceFeature_subRaceId_subRace_id"
	}),
	raceFeatures_subRaceId: many(raceFeature, {
		relationName: "raceFeature_subRaceId_subRace_id"
	}),
	race_raceId: one(race, {
		fields: [subRace.raceId],
		references: [race.id],
		relationName: "subRace_raceId_race_id"
	}),
	race_raceId: one(race, {
		fields: [subRace.raceId],
		references: [race.id],
		relationName: "subRace_raceId_race_id"
	}),
}));

export const exhaustionLevelRelations = relations(exhaustionLevel, ({many}) => ({
	playerCharacters: many(playerCharacter),
}));

export const weaponDamageRelations = relations(weaponDamage, ({one}) => ({
	weapon_weaponId: one(weapon, {
		fields: [weaponDamage.weaponId],
		references: [weapon.id],
		relationName: "weaponDamage_weaponId_weapon_id"
	}),
	weapon_weaponId: one(weapon, {
		fields: [weaponDamage.weaponId],
		references: [weapon.id],
		relationName: "weaponDamage_weaponId_weapon_id"
	}),
}));

export const weaponPropertyRelations = relations(weaponProperty, ({one}) => ({
	weapon_weaponId: one(weapon, {
		fields: [weaponProperty.weaponId],
		references: [weapon.id],
		relationName: "weaponProperty_weaponId_weapon_id"
	}),
	weapon_weaponId: one(weapon, {
		fields: [weaponProperty.weaponId],
		references: [weapon.id],
		relationName: "weaponProperty_weaponId_weapon_id"
	}),
}));

export const playerCharacterBackgroundRelations = relations(playerCharacterBackground, ({one}) => ({
	playerCharacter: one(playerCharacter, {
		fields: [playerCharacterBackground.playerCharacterId],
		references: [playerCharacter.id]
	}),
	background: one(background, {
		fields: [playerCharacterBackground.backgroundId],
		references: [background.id]
	}),
}));

export const backgroundRelations = relations(background, ({many}) => ({
	playerCharacterBackgrounds: many(playerCharacterBackground),
	backgroundFeatures: many(backgroundFeature),
}));

export const playerCharacterFeatureRelations = relations(playerCharacterFeature, ({one}) => ({
	playerCharacter: one(playerCharacter, {
		fields: [playerCharacterFeature.playerCharacterId],
		references: [playerCharacter.id]
	}),
}));

export const playerCharacterConditionRelations = relations(playerCharacterCondition, ({one}) => ({
	playerCharacter: one(playerCharacter, {
		fields: [playerCharacterCondition.playerCharacterId],
		references: [playerCharacter.id]
	}),
	condition: one(condition, {
		fields: [playerCharacterCondition.conditionId],
		references: [condition.id]
	}),
}));

export const conditionRelations = relations(condition, ({many}) => ({
	playerCharacterConditions: many(playerCharacterCondition),
}));

export const skillRelations = relations(skill, ({one, many}) => ({
	ability: one(ability, {
		fields: [skill.abilityId],
		references: [ability.id]
	}),
	playerCharacterSkills: many(playerCharacterSkill),
}));

export const abilityRelations = relations(ability, ({many}) => ({
	skills: many(skill),
	playerCharacterAbilityScores: many(playerCharacterAbilityScore),
}));

export const playerCharacterSkillRelations = relations(playerCharacterSkill, ({one}) => ({
	playerCharacter: one(playerCharacter, {
		fields: [playerCharacterSkill.playerCharacterId],
		references: [playerCharacter.id]
	}),
	skill: one(skill, {
		fields: [playerCharacterSkill.skillId],
		references: [skill.id]
	}),
}));

export const playerCharacterCurrencyRelations = relations(playerCharacterCurrency, ({one}) => ({
	playerCharacter: one(playerCharacter, {
		fields: [playerCharacterCurrency.playerCharacterId],
		references: [playerCharacter.id]
	}),
	currency: one(currency, {
		fields: [playerCharacterCurrency.currencyId],
		references: [currency.id]
	}),
}));

export const currencyRelations = relations(currency, ({many}) => ({
	playerCharacterCurrencies: many(playerCharacterCurrency),
}));

export const playerCharacterClassRelations = relations(playerCharacterClass, ({one}) => ({
	playerCharacter: one(playerCharacter, {
		fields: [playerCharacterClass.playerCharacterId],
		references: [playerCharacter.id]
	}),
	baseClass: one(baseClass, {
		fields: [playerCharacterClass.baseClassId],
		references: [baseClass.id]
	}),
	subClass: one(subClass, {
		fields: [playerCharacterClass.subClassUd],
		references: [subClass.id]
	}),
}));

export const backgroundFeatureRelations = relations(backgroundFeature, ({one}) => ({
	background: one(background, {
		fields: [backgroundFeature.backgroundId],
		references: [background.id]
	}),
}));

export const attunedItemsRelations = relations(attunedItems, ({one}) => ({
	playerCharacter: one(playerCharacter, {
		fields: [attunedItems.playerCharacterId],
		references: [playerCharacter.id]
	}),
}));

export const playerCharacterAbilityScoreRelations = relations(playerCharacterAbilityScore, ({one}) => ({
	ability: one(ability, {
		fields: [playerCharacterAbilityScore.abilityId],
		references: [ability.id]
	}),
	playerCharacter: one(playerCharacter, {
		fields: [playerCharacterAbilityScore.playerCharacterId],
		references: [playerCharacter.id]
	}),
}));