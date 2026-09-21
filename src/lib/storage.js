// Thin localStorage wrappers with the same keys the prototype used.

export function loadUser() {
  try {
    return JSON.parse(localStorage.getItem('celpip_user') || 'null');
  } catch {
    return null;
  }
}

export function saveUser(user) {
  localStorage.setItem('celpip_user', JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem('celpip_user');
}

export function loadScores(email) {
  try {
    return JSON.parse(localStorage.getItem('celpip_scores_' + email) || '{}');
  } catch {
    return {};
  }
}

export function saveScores(email, scores) {
  if (email) localStorage.setItem('celpip_scores_' + email, JSON.stringify(scores));
}
