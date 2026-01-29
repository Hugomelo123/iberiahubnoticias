const API_BASE = "/api";

function getToken(): string | null {
  return sessionStorage.getItem("authToken");
}

// Decodificar JWT para verificar expiração (sem validar assinatura)
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // exp é em segundos, Date.now() é em milissegundos
    return payload.exp * 1000 < Date.now();
  } catch {
    return true; // Se não conseguir decodificar, considera expirado
  }
}

// Verificar se token é válido (existe e não expirou)
export function isTokenValid(): boolean {
  const token = getToken();
  if (!token) return false;
  return !isTokenExpired(token);
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = getToken();

  // Verificar se token expirou antes de fazer request
  if (token && isTokenExpired(token)) {
    // Limpar sessão e redirecionar para login
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("isEditor");
    sessionStorage.removeItem("username");
    window.location.href = "/login";
    throw new Error("Sessão expirada. Por favor faz login novamente.");
  }

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

  // Se receber 401, token inválido/expirado no servidor
  if (res.status === 401) {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("isEditor");
    sessionStorage.removeItem("username");
    window.location.href = "/login";
    throw new Error("Sessão inválida. Por favor faz login novamente.");
  }

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

// Informação dos utilizadores da equipa
const userProfiles: Record<string, { fullName: string; role: string; team: string }> = {
  hugo: { fullName: "Hugo Melo", role: "Fundador", team: "Fundadores" },
  eric: { fullName: "Eric", role: "Fundador", team: "Fundadores" },
  tiago: { fullName: "Tiago", role: "Diretor Editorial", team: "Direção Editorial" },
  ricardo: { fullName: "Ricardo", role: "Diretor Editorial", team: "Direção Editorial" },
  paloma: { fullName: "Paloma", role: "Marketing & Design", team: "Marketing & Design" },
  guilherme: { fullName: "Guilherme", role: "Marketing & Design", team: "Marketing & Design" },
};

export function getUserProfile(): { fullName: string; role: string; team: string } {
  const username = getUsername().toLowerCase();
  return userProfiles[username] || { fullName: username, role: "Editor", team: "Equipa" };
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
