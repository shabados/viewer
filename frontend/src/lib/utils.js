import newGithubIssueUrl from 'new-github-issue-url'

export const issueUrl = ( { id, gurmukhi, source, page, nameEnglish } ) => newGithubIssueUrl( {
  user: 'ShabadOS',
  repo: 'Database',
  labels: [ 'correction', nameEnglish ],
  title: `${id}`,
  body: `
<!-- These instructions are hidden. Use the preview tab to visualize the code. Tutorial can be found at https://database.shabados.com. -->

| Key | Value |
| --- | ----- |
View | https://database.shabados.com/sources/${source}/page/${page}
Source | ${nameEnglish}
Page | ${page}
ID | ${id}
Line | ${gurmukhi}

<!-- Bold any differences in the line above. Provide the name, edition, and image of the physical proof below. Attached images should include context and an indication of where to look. -->

`,
} )

export const getPositions = () => JSON.parse( localStorage.getItem( 'positions' ) ) || {}

export const savePosition = ( source, page, line ) => localStorage.setItem(
  'positions',
  JSON.stringify( { ...getPositions(), [ source ]: { page, line } } ),
)
