import newGithubIssueUrl from 'new-github-issue-url'

export const issueUrl = ( { id, gurmukhi, source, page, nameEnglish } ) => newGithubIssueUrl( {
  user: 'ShabadOS',
  repo: 'Database',
  labels: [ 'correction', nameEnglish ],
  title: `${id}`,
  body: `
> Use the preview tab to see the example given below. Edit the relevant information and preview the changes before submitting. You may delete these instructions.

| Key | Value |
| --- | --- |
| View | https://database.shabados.com/sources/${source}/page/${page} |
| Source | ${nameEnglish} |
| Page | ${page} |
| ID | ${id} |
| Line | ${gurmukhi} |
| Correction | THIS ≠ THAT  |

PROOF (EDITION)

Image:
`,
} )
