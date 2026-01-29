const API_BASE = "/api";

function getToken(): string | null {
  return sessionStorage.getItem("authToken");
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Erro desconhecido" }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }
  
  return res.json();
}

// Auth
export async function login(password: string) {
  const data = await fetchAPI("/auth/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
  sessionStorage.setItem("authToken", data.token);
  sessionStorage.setItem("isEditor", "true");
  sessionStorage.setItem("username", data.user.username);
  return data;
}

export function logout() {
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("isEditor");
  sessionStorage.removeItem("username");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function getUsername(): string {
  return sessionStorage.getItem("username") || "Editor";
}

// Stories
export const getStories = () => fetchAPI("/stories");
export const getStory = (slug: string) => fetchAPI(`/stories/${slug}`);
export const createStory = (data: any) => fetchAPI("/stories", { method: "POST", body: JSON.stringify(data) });
export const updateStory = (id: string, data: any) => fetchAPI(`/stories/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteStory = (id: string) => fetchAPI(`/stories/${id}`, { method: "DELETE" });

// Matches
export const getMatches = () => fetchAPI("/matches");
export const createMatch = (data: any) => fetchAPI("/matches", { method: "POST", body: JSON.stringify(data) });
export const updateMatch = (id: string, data: any) => fetchAPI(`/matches/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteMatch = (id: string) => fetchAPI(`/matches/${id}`, { method: "DELETE" });

// Briefings
export const getBriefings = () => fetchAPI("/briefings");
export const createBriefing = (data: any) => fetchAPI("/briefings", { method: "POST", body: JSON.stringify(data) });
export const deleteBriefing = (id: string) => fetchAPI(`/briefings/${id}`, { method: "DELETE" });

// Maintenance Mode
export const getMaintenanceMode = () => fetchAPI("/maintenance");
export const setMaintenanceMode = (enabled: boolean) => fetchAPI("/maintenance", { method: "POST", body: JSON.stringify({ enabled }) });
