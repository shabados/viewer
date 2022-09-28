import { stripEndings, stripVishraams, toUnicode } from 'gurmukhi-utils'
import newGithubIssueUrl from 'new-github-issue-url'

export type GetIssueUrlOptions = {
  id: string,
  shabadId: string,
  gurmukhi: string,
  sourcePage: number,
  nameEnglish: string,
}

export const getIssueUrl = ( {
  id,
  shabadId,
  gurmukhi,
  sourcePage: page,
  nameEnglish,
}: GetIssueUrlOptions ) => newGithubIssueUrl( {
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

export const getDictionaryLink = ( word: string ) => `http://www.srigranth.org/servlet/gurbani.dictionary?Param=${word}`

export const getPosition = () => localStorage.getItem( 'position' ) ?? '/sources/1/page/1/line/0'

export const getLastOpened = () => localStorage.getItem( 'lastOpened' ) ?? Date.now()

export const savePosition = ( source: number, page: number, line: number ) => {
  localStorage.setItem( 'position', `/sources/${source}/page/${page}/line/${line}` )
  localStorage.setItem( 'lastOpened', Date.now() )
}
