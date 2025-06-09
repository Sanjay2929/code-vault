import { snippets, type Snippet, type InsertSnippet } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private snippets: Map<number, Snippet>;
  private currentId: number;

  constructor() {
    this.snippets = new Map();
    this.currentId = 1;
    this.seedData();
  }

  private seedData() {
    const sampleSnippets: InsertSnippet[] = [
      {
        title: "Debounce Function",
        description: "Utility function for debouncing API calls",
        code: `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`,
        language: "javascript",
        isPublic: true,
      },
      {
        title: "Custom Hook - useLocalStorage",
        description: "React hook for localStorage management",
        code: `import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}`,
        language: "react",
        isPublic: true,
      },
      {
        title: "CSS Grid Layout",
        description: "Responsive card grid with auto-fit",
        code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.grid-item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}`,
        language: "css",
        isPublic: false,
      },
      {
        title: "API Error Handler",
        description: "Centralized error handling for API requests",
        code: `import requests
from typing import Optional, Dict, Any

class APIErrorHandler:
    def handle_response(self, response: requests.Response) -> Optional[Dict[str, Any]]:
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 404:
            print("Resource not found")
        else:
            print(f"Error: {response.status_code}")
            return None`,
        language: "python",
        isPublic: true,
      }
    ];

    sampleSnippets.forEach(snippet => {
      this.createSnippet(snippet);
    });
  }

  async getSnippets(): Promise<Snippet[]> {
    return Array.from(this.snippets.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getSnippet(id: number): Promise<Snippet | undefined> {
    return this.snippets.get(id);
  }

  async createSnippet(insertSnippet: InsertSnippet): Promise<Snippet> {
    const id = this.currentId++;
    const snippet: Snippet = {
      ...insertSnippet,
      id,
      favorites: 0,
      createdAt: new Date(),
    };
    this.snippets.set(id, snippet);
    return snippet;
  }

  async updateSnippet(id: number, updateData: Partial<InsertSnippet>): Promise<Snippet | undefined> {
    const snippet = this.snippets.get(id);
    if (!snippet) return undefined;

    const updatedSnippet = { ...snippet, ...updateData };
    this.snippets.set(id, updatedSnippet);
    return updatedSnippet;
  }

  async deleteSnippet(id: number): Promise<boolean> {
    return this.snippets.delete(id);
  }

  async searchSnippets(query: string): Promise<Snippet[]> {
    const allSnippets = await this.getSnippets();
    const lowerQuery = query.toLowerCase();
    
    return allSnippets.filter(snippet =>
      snippet.title.toLowerCase().includes(lowerQuery) ||
      snippet.description?.toLowerCase().includes(lowerQuery) ||
      snippet.code.toLowerCase().includes(lowerQuery)
    );
  }

  async getSnippetsByLanguage(language: string): Promise<Snippet[]> {
    const allSnippets = await this.getSnippets();
    return allSnippets.filter(snippet => snippet.language === language);
  }

  async toggleFavorite(id: number): Promise<Snippet | undefined> {
    const snippet = this.snippets.get(id);
    if (!snippet) return undefined;

    snippet.favorites = (snippet.favorites || 0) + 1;
    this.snippets.set(id, snippet);
    return snippet;
  }
}

export const storage = new MemStorage();
