import * as p from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Table principale des plantes (fusion plantsDatabase + plantsWiki)
export const plants = p.pgTable("plants", {
  id: p.varchar("id", { length: 100 }).primaryKey(),
  slug: p.varchar("slug", { length: 100 }).unique().notNull(),
  name: p.varchar("name", { length: 200 }).notNull(),
  scientificName: p.varchar("scientific_name", { length: 200 }),
  icon: p.varchar("icon", { length: 500 }),
  images: p.jsonb("images").$type<string[]>().default([]),
  
  // Classification
  type: p.varchar("type", { length: 50 }).notNull(), // 'légume-fruit' | 'légume-feuille' | 'légume-racine' | 'aromate'
  category: p.varchar("category", { length: 100 }),
  family: p.varchar("family", { length: 100 }),
  difficulty: p.varchar("difficulty", { length: 20 }).notNull(), // 'facile' | 'moyen' | 'difficile'
  origin: p.varchar("origin", { length: 200 }),
  
  // Données de culture (pour l'assistant)
  soilTypes: p.jsonb("soil_types").$type<string[]>().default([]),
  sunExposure: p.jsonb("sun_exposure").$type<string[]>().default([]),
  seasons: p.jsonb("seasons").$type<string[]>().default([]),
  spacing: p.varchar("spacing", { length: 100 }),
  depth: p.varchar("depth", { length: 100 }),
  seedingPeriod: p.jsonb("seeding_period").$type<string[]>().default([]),
  transplantPeriod: p.jsonb("transplant_period").$type<string[]>().default([]),
  harvestPeriod: p.jsonb("harvest_period").$type<string[]>().default([]),
  growthDuration: p.varchar("growth_duration", { length: 100 }),
  
  // Conditions de température
  tempMin: p.integer("temp_min"),
  tempMax: p.integer("temp_max"),
  tempOptimal: p.integer("temp_optimal"),
  
  // Arrosage et exposition
  watering: p.text("watering"),
  soil: p.text("soil"),
  exposure: p.varchar("exposure", { length: 200 }),
  
  // Contenu éducatif (pour le wiki)
  description: p.text("description"),
  characteristics: p.jsonb("characteristics").$type<string[]>().default([]),
  
  // Périodes wiki
  sowingPeriod: p.varchar("sowing_period", { length: 200 }),
  plantingPeriod: p.varchar("planting_period", { length: 200 }),
  
  // Métadonnées wiki
  tags: p.jsonb("tags").$type<string[]>().default([]),
  averageRating: p.decimal("average_rating", { precision: 3, scale: 2 }),
  ratingsCount: p.integer("ratings_count").default(0),
  popularity: p.integer("popularity").default(0),
  relatedItineraries: p.jsonb("related_itineraries").$type<string[]>().default([]),
  
  // Métadonnées
  createdAt: p.timestamp("created_at").defaultNow(),
  updatedAt: p.timestamp("updated_at").defaultNow(),
});

// Variétés de plantes
export const plantVarieties = p.pgTable("plant_varieties", {
  id: p.serial("id").primaryKey(),
  plantId: p.varchar("plant_id", { length: 100 }).references(() => plants.id, { onDelete: "cascade" }),
  name: p.varchar("name", { length: 200 }).notNull(),
  characteristics: p.text("characteristics"),
  difficulty: p.varchar("difficulty", { length: 20 }), // 'facile' | 'moyen' | 'difficile'
  harvestTime: p.varchar("harvest_time", { length: 100 }),
  specialFeatures: p.jsonb("special_features").$type<string[]>().default([]),
  description: p.text("description"),
});

// Plantes compagnes
export const plantCompanions = p.pgTable("plant_companions", {
  id: p.serial("id").primaryKey(),
  plantId: p.varchar("plant_id", { length: 100 }).references(() => plants.id, { onDelete: "cascade" }),
  companionPlantId: p.varchar("companion_plant_id", { length: 100 }),
  companionPlantName: p.varchar("companion_plant_name", { length: 200 }).notNull(),
  companionPlantIcon: p.varchar("companion_plant_icon", { length: 500 }),
  benefit: p.text("benefit").notNull(),
  distance: p.varchar("distance", { length: 100 }),
  type: p.varchar("type", { length: 20 }).default("beneficial"), // 'beneficial' | 'neutral' | 'avoid'
});

// Templates d'étapes (pour l'assistant)
export const stepTemplates = p.pgTable("step_templates", {
  id: p.serial("id").primaryKey(),
  plantId: p.varchar("plant_id", { length: 100 }).references(() => plants.id, { onDelete: "cascade" }),
  title: p.varchar("title", { length: 200 }).notNull(),
  description: p.text("description"),
  duration: p.varchar("duration", { length: 100 }),
  relativeWeek: p.integer("relative_week"),
  icon: p.varchar("icon", { length: 500 }),
  tools: p.jsonb("tools").$type<string[]>().default([]),
  tips: p.jsonb("tips").$type<string[]>().default([]),
  detailedInstructions: p.text("detailed_instructions"),
  images: p.jsonb("images").$type<string[]>().default([]),
  video: p.varchar("video", { length: 500 }),
  commonMistakes: p.jsonb("common_mistakes").$type<string[]>().default([]),
  scientificExplanation: p.text("scientific_explanation"),
  stepDifficulty: p.varchar("step_difficulty", { length: 20 }),
  weatherRecommendations: p.jsonb("weather_recommendations").$type<{
    ideal: string;
    avoid: string;
  }>(),
  soilRequirements: p.jsonb("soil_requirements").$type<{
    type: string;
    ph: string;
    nutrients: string[];
  }>(),
});

// Ravageurs
export const plantPests = p.pgTable("plant_pests", {
  id: p.serial("id").primaryKey(),
  plantId: p.varchar("plant_id", { length: 100 }).references(() => plants.id, { onDelete: "cascade" }),
  pestId: p.varchar("pest_id", { length: 100 }),
  name: p.varchar("name", { length: 200 }).notNull(),
  description: p.text("description"),
  symptoms: p.jsonb("symptoms").$type<string[]>().default([]),
  prevention: p.jsonb("prevention").$type<string[]>().default([]),
  treatment: p.jsonb("treatment").$type<string[]>().default([]),
  severity: p.varchar("severity", { length: 20 }), // 'low' | 'medium' | 'high'
  season: p.jsonb("season").$type<string[]>().default([]),
});

// Maladies
export const plantDiseases = p.pgTable("plant_diseases", {
  id: p.serial("id").primaryKey(),
  plantId: p.varchar("plant_id", { length: 100 }).references(() => plants.id, { onDelete: "cascade" }),
  diseaseId: p.varchar("disease_id", { length: 100 }),
  name: p.varchar("name", { length: 200 }).notNull(),
  description: p.text("description"),
  symptoms: p.jsonb("symptoms").$type<string[]>().default([]),
  causes: p.jsonb("causes").$type<string[]>().default([]),
  prevention: p.jsonb("prevention").$type<string[]>().default([]),
  treatment: p.jsonb("treatment").$type<string[]>().default([]),
  severity: p.varchar("severity", { length: 20 }), // 'low' | 'medium' | 'high'
});

// Valeurs nutritionnelles
export const nutritionalValues = p.pgTable("nutritional_values", {
  id: p.serial("id").primaryKey(),
  plantId: p.varchar("plant_id", { length: 100 }).references(() => plants.id, { onDelete: "cascade" }),
  nutrient: p.varchar("nutrient", { length: 100 }).notNull(),
  amount: p.varchar("amount", { length: 50 }),
  unit: p.varchar("unit", { length: 20 }),
  description: p.text("description"),
  healthBenefit: p.text("health_benefit"),
});

// Conseils culturaux
export const culturalTips = p.pgTable("cultural_tips", {
  id: p.serial("id").primaryKey(),
  plantId: p.varchar("plant_id", { length: 100 }).references(() => plants.id, { onDelete: "cascade" }),
  title: p.varchar("title", { length: 200 }).notNull(),
  description: p.text("description"),
  season: p.jsonb("season").$type<string[]>().default([]),
  difficulty: p.varchar("difficulty", { length: 20 }),
  category: p.varchar("category", { length: 100 }), // 'plantation' | 'entretien' | 'récolte'
});

// Ressources
export const plantResources = p.pgTable("plant_resources", {
  id: p.serial("id").primaryKey(),
  plantId: p.varchar("plant_id", { length: 100 }).references(() => plants.id, { onDelete: "cascade" }),
  title: p.varchar("title", { length: 300 }).notNull(),
  url: p.varchar("url", { length: 1000 }),
  type: p.varchar("type", { length: 50 }), // 'article' | 'video' | 'guide' | 'forum'
});

// Relations Drizzle
export const plantsRelations = relations(plants, ({ many }) => ({
  varieties: many(plantVarieties),
  companions: many(plantCompanions),
  stepTemplates: many(stepTemplates),
  pests: many(plantPests),
  diseases: many(plantDiseases),
  nutritionalValues: many(nutritionalValues),
  culturalTips: many(culturalTips),
  resources: many(plantResources),
}));

export const plantVarietiesRelations = relations(plantVarieties, ({ one }) => ({
  plant: one(plants, {
    fields: [plantVarieties.plantId],
    references: [plants.id],
  }),
}));

export const plantCompanionsRelations = relations(plantCompanions, ({ one }) => ({
  plant: one(plants, {
    fields: [plantCompanions.plantId],
    references: [plants.id],
  }),
}));

export const stepTemplatesRelations = relations(stepTemplates, ({ one }) => ({
  plant: one(plants, {
    fields: [stepTemplates.plantId],
    references: [plants.id],
  }),
}));

export const plantPestsRelations = relations(plantPests, ({ one }) => ({
  plant: one(plants, {
    fields: [plantPests.plantId],
    references: [plants.id],
  }),
}));

export const plantDiseasesRelations = relations(plantDiseases, ({ one }) => ({
  plant: one(plants, {
    fields: [plantDiseases.plantId],
    references: [plants.id],
  }),
}));

export const nutritionalValuesRelations = relations(nutritionalValues, ({ one }) => ({
  plant: one(plants, {
    fields: [nutritionalValues.plantId],
    references: [plants.id],
  }),
}));

export const culturalTipsRelations = relations(culturalTips, ({ one }) => ({
  plant: one(plants, {
    fields: [culturalTips.plantId],
    references: [plants.id],
  }),
}));

export const plantResourcesRelations = relations(plantResources, ({ one }) => ({
  plant: one(plants, {
    fields: [plantResources.plantId],
    references: [plants.id],
  }),
})); 