import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSnippetSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all snippets
  app.get("/api/snippets", async (req, res) => {
    try {
      const { search, language } = req.query;
      
      let snippets;
      if (search) {
        snippets = await storage.searchSnippets(search as string);
      } else if (language) {
        snippets = await storage.getSnippetsByLanguage(language as string);
      } else {
        snippets = await storage.getSnippets();
      }
      
      res.json(snippets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch snippets" });
    }
  });

  // Get snippet by ID
  app.get("/api/snippets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const snippet = await storage.getSnippet(id);
      
      if (!snippet) {
        return res.status(404).json({ message: "Snippet not found" });
      }
      
      res.json(snippet);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch snippet" });
    }
  });

  // Create new snippet
  app.post("/api/snippets", async (req, res) => {
    try {
      const validatedData = insertSnippetSchema.parse(req.body);
      const snippet = await storage.createSnippet(validatedData);
      res.status(201).json(snippet);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid snippet data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create snippet" });
    }
  });

  // Update snippet
  app.patch("/api/snippets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      const snippet = await storage.updateSnippet(id, updateData);
      
      if (!snippet) {
        return res.status(404).json({ message: "Snippet not found" });
      }
      
      res.json(snippet);
    } catch (error) {
      res.status(500).json({ message: "Failed to update snippet" });
    }
  });

  // Delete snippet
  app.delete("/api/snippets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteSnippet(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Snippet not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete snippet" });
    }
  });

  // Toggle favorite
  app.post("/api/snippets/:id/favorite", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const snippet = await storage.toggleFavorite(id);
      
      if (!snippet) {
        return res.status(404).json({ message: "Snippet not found" });
      }
      
      res.json(snippet);
    } catch (error) {
      res.status(500).json({ message: "Failed to toggle favorite" });
    }
  });

  // Get language statistics
  app.get("/api/languages/stats", async (req, res) => {
    try {
      const snippets = await storage.getSnippets();
      const stats = snippets.reduce((acc, snippet) => {
        acc[snippet.language] = (acc[snippet.language] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch language stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
