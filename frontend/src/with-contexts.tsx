import { ReactNode } from 'react'
import { SWRConfig } from 'swr'

const fetcher = (
  ...rest: Parameters<typeof fetch>
) => fetch( ...rest ).then( ( res ) => res.json() )

const contexts = [
  [ SWRConfig, { revalidateOnFocus: false, fetcher } ],
] as [( props: { value: any, children: ReactNode } ) => JSX.Element, unknown][]

const withContexts = contexts.reduce(
  ( withContexts, [ Provider, value ] ) => ( children: ReactNode ) => withContexts(
    <Provider value={value}>{children}</Provider>
  ),
  ( context: ReactNode ) => context
)

export default withContexts
