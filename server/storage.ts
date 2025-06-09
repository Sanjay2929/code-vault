import { snippets, type Snippet, type InsertSnippet } from "@shared/schema";
import { db } from "./db";
import { eq, desc, or, like, sql } from "drizzle-orm";

export interface IStorage {
  getSnippets(): Promise<Snippet[]>;
  getSnippet(id: number): Promise<Snippet | undefined>;
  createSnippet(snippet: InsertSnippet): Promise<Snippet>;
  updateSnippet(id: number, snippet: Partial<InsertSnippet>): Promise<Snippet | undefined>;
  deleteSnippet(id: number): Promise<boolean>;
  searchSnippets(query: string): Promise<Snippet[]>;
  getSnippetsByLanguage(language: string): Promise<Snippet[]>;
  toggleFavorite(id: number): Promise<Snippet | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getSnippets(): Promise<Snippet[]> {
    return await db.select().from(snippets).orderBy(desc(snippets.createdAt));
  }

  async getSnippet(id: number): Promise<Snippet | undefined> {
    const [snippet] = await db.select().from(snippets).where(eq(snippets.id, id));
    return snippet || undefined;
  }

  async createSnippet(insertSnippet: InsertSnippet): Promise<Snippet> {
    const [snippet] = await db
      .insert(snippets)
      .values(insertSnippet)
      .returning();
    return snippet;
  }

  async updateSnippet(id: number, updateData: Partial<InsertSnippet>): Promise<Snippet | undefined> {
    const [snippet] = await db
      .update(snippets)
      .set(updateData)
      .where(eq(snippets.id, id))
      .returning();
    return snippet || undefined;
  }

  async deleteSnippet(id: number): Promise<boolean> {
    const result = await db.delete(snippets).where(eq(snippets.id, id));
    return result.rowCount! > 0;
  }

  async searchSnippets(query: string): Promise<Snippet[]> {
    return await db
      .select()
      .from(snippets)
      .where(
        or(
          like(snippets.title, `%${query}%`),
          like(snippets.description, `%${query}%`),
          like(snippets.code, `%${query}%`)
        )
      )
      .orderBy(desc(snippets.createdAt));
  }

  async getSnippetsByLanguage(language: string): Promise<Snippet[]> {
    return await db
      .select()
      .from(snippets)
      .where(eq(snippets.language, language))
      .orderBy(desc(snippets.createdAt));
  }

  async toggleFavorite(id: number): Promise<Snippet | undefined> {
    const [snippet] = await db
      .update(snippets)
      .set({
        favorites: sql`${snippets.favorites} + 1`
      })
      .where(eq(snippets.id, id))
      .returning();
    return snippet || undefined;
  }
}

export const storage = new DatabaseStorage();
