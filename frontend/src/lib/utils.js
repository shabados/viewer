import newGithubIssueUrl from 'new-github-issue-url'

export const issueUrl = ( {
  id,
  gurmukhi,
  source,
  page,
  nameEnglish,
  line,
} ) => newGithubIssueUrl( {
  user: 'ShabadOS',
  repo: 'Database',
  labels: [ 'correction', nameEnglish ],
  title: `${id}`,
  body: `
<!-- Instructions are hidden. Use the preview tab. Tutorial: https://database.shabados.com -->

| Key | Value |
| --- | ----- |
View | https://database.shabados.com/sources/${source}/page/${page}/line/${line}
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
 * Get data from using `fetch` and set it to state.
 * @param {string} source The source to fetch data.
 * @param {React.SetStateAction} setState
 * @param {React.SetStateAction} setErr
 */
export const getSetData = ( source, setState, setErr ) => fetch( source )
  .then( res => res.json() )
  .then( jsonRes => setState( jsonRes ) )
  .catch( err => setErr( err ) )
