const { location: { origin } } = window

// API Routes
export const API_ROOT = `${origin}/api`
export const SOURCES_API = `${API_ROOT}/sources`
export const TRANSLATION_SOURCES_API = `${API_ROOT}/translationSources`
export const PAGE_API = `${API_ROOT}/source`
export const LINE_API = `${API_ROOT}/line`
export const DB_VERSION_API = `${API_ROOT}/version`
export const MSFT_AUTH_API = `${API_ROOT}/auth/msft/speech2text`

export const {
  VITE_APP_VERSION: version,
} = import.meta.env
