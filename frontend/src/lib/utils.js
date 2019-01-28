import newGithubIssueUrl from 'new-github-issue-url'

export const issueUrl = ( { id, gurmukhi, page, nameEnglish } ) => newGithubIssueUrl( {
  user: 'ShabadOS',
  repo: 'Database',
  assignee: 'Sarabveer',
  labels: [ 'correction', nameEnglish ],
  title: `${id}`,
  body: `
> Use the preview tab to see the example given below. Edit the relevant information and preview the changes before submitting. You may delete these instructions.

| Key | Value |
| --- | --- |
| ID | ${id} |
| Source | ${nameEnglish} |
| Page | ${page} |
| Line | \`\`\`${gurmukhi}\`\`\` |
| Correction | \`\`\`THIS\`\`\` ≠ \`\`\`THAT\`\`\`  |

PROOF (EDITION)

Image:
`,
} )
