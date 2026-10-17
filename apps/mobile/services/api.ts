import { ContentBundle, SearchResult, ChatMessage } from '@campus-assistant/shared-types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchCampusContent(): Promise<ContentBundle> {
  const response = await fetch(`${API_BASE_URL}/content`);
  if (!response.ok) {
    throw new Error('Failed to load campus content');
  }
  return response.json();
}

export async function askAssistant(
  question: string,
  history: Array<{ role: string; content: string }> = []
): Promise<{ answer: string; sources: Array<{ title: string; url: string }> }> {
  const response = await fetch(`${API_BASE_URL}/assistant/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, history }),
  });
  if (!response.ok) {
    throw new Error('Failed to query assistant');
  }
  return response.json();
}

export async function searchCampus(query: string, category?: string): Promise<SearchResult> {
  const params = new URLSearchParams({ q: query });
  if (category && category !== 'all') params.append('category', category);
  const response = await fetch(`${API_BASE_URL}/search?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to perform search');
  }
  return response.json();
}
