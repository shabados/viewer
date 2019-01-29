// API Server
const { NODE_ENV } = process.env
const { location: { hostname, port } } = window
export const API_HOST = hostname
export const API_PORT = NODE_ENV === 'production' ? port : 52525
export const API_URL = `http://${API_HOST}:${API_PORT}`

// API Routes
export const API_ROOT = `${API_URL}/api`
export const SOURCES_API = `${API_ROOT}/sources`
export const PAGE_API = `${API_ROOT}/source`
