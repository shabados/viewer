import { createContext } from 'react'

import { TranslationSourcesResponse } from '../types/api'

export const TranslationSourcesContext = createContext<TranslationSourcesResponse>( [] )
