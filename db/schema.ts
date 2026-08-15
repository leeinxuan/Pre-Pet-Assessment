import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sharedAssessmentResults = sqliteTable("shared_assessment_results", {
  id: text("id").primaryKey(),
  payload: text("payload").notNull(),
  createdAt: integer("created_at").notNull(),
});
