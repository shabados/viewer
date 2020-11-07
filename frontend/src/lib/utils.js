import newGithubIssueUrl from 'new-github-issue-url'
import { toUnicode, stripVishraams, stripEndings } from 'gurmukhi-utils'

export const getIssueUrl = ( {
  id,
  shabadId,
  gurmukhi,
  sourcePage: page,
  nameEnglish,
} ) => newGithubIssueUrl( {
  user: 'ShabadOS',
  repo: 'Database',
  labels: [ 'correction', nameEnglish ],
  title: `${id}`,
  body: `<!-- Do not edit this section. Check out the preview tab. Learn more about proofreading: https://viewer.shabados.com -->
---
Database was \`${gurmukhi}\` on ${new Date().toISOString()}. See line in [Shabad OS Viewer](https://viewer.shabados.com/line/${id}) or [GurbaniNow](https://gurbaninow.com/shabad/${shabadId}/${id}).

> ${stripEndings( stripVishraams( toUnicode( gurmukhi ) ) )}
> ${nameEnglish}, ${page}
---
<!-- Add details & attach image(s) below. Provide context & indication. Example: https://github.com/ShabadOS/database/issues/812 -->

`,
} )

export const getDictionaryLink = word => `http://www.srigranth.org/servlet/gurbani.dictionary?Param=${word}`

export const getPositions = () => JSON.parse( localStorage.getItem( 'positions' ) ) || {}

export const savePosition = ( source, page, line ) => localStorage.setItem(
  'positions',
  JSON.stringify( { ...getPositions(), [ source ]: { page, line } } ),
)
