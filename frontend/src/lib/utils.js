import newGithubIssueUrl from 'new-github-issue-url'

export const getIssueUrl = ( {
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

export const getDictionaryLink = word => `http://www.srigranth.org/servlet/gurbani.dictionary?Param=${word}`

export const getPositions = () => JSON.parse( localStorage.getItem( 'positions' ) ) || {}

export const savePosition = ( source, page, line ) => localStorage.setItem(
  'positions',
  JSON.stringify( { ...getPositions(), [ source ]: { page, line } } ),
)
