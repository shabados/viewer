import newGithubIssueUrl from 'new-github-issue-url'
import { isEmpty } from 'lodash'

export const issueUrl = ( {
  id,
  gurmukhi,
  page,
  nameEnglish,
} ) => newGithubIssueUrl( {
  user: 'ShabadOS',
  repo: 'Database',
  labels: [ 'correction', nameEnglish ],
  title: `${id}`,
  body: `
<!-- Instructions are hidden. Use the preview tab. Tutorial: https://database.shabados.com -->

| Key | Value |
| --- | ----- |
View | https://database.shabados.com/line/${id}
Source | ${nameEnglish}
Page | ${page}
ID | ${id}
Line | ${gurmukhi}

<!-- Add details & attach image(s) below. Provide context & indication. Example: https://github.com/ShabadOS/database/issues/812 -->

`,
} )

export const getPositions = () => JSON.parse( localStorage.getItem( 'positions' ) ) || {}

export const savePosition = ( source, page, line ) => localStorage.setItem(
  'positions',
  JSON.stringify( { ...getPositions(), [ source ]: { page, line } } ),
)

/**
 *
 * @param {object} info Objects that needs to be deserialized.
 * @returns {object} Deserialized object.
 */
export const desierialzeObject = obj => {
  if ( isEmpty( obj ) ) return {}
  return ( JSON.parse( obj ) )
}
