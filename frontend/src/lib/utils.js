import newGithubIssueUrl from 'new-github-issue-url'

export const issueUrl = ( { id, gurmukhi } ) => newGithubIssueUrl( {
  user: 'ShabadOS',
  repo: 'Database',
  assignee: 'Sarabveer',
  labels: [ 'correction' ],
  title: `${id} - Gurbani Dian Laga Matra Di Vilakhanta`,
  body: `
  > Use the preview tab to see the example given below. Edit the relevant information and preview the changes before submitting. You may delete these instructions.
  
  | Key              | Value |
  | ---------------- | -------- |
  | ID                 | ${id} |
  | Shabad OS  | \`${gurmukhi}\` |
  | Correction    | \`goibMd vwlu\` ≠ \`goibMdvwlu\`  |
  
  Gurbani Dian Laga Matra Di Vilakhanta (3rd Edition, November 2003)
  
  Page 366
  ![](https://i.imgur.com/GcVYt8h.jpg)
  
  Page 367   
  ![](https://i.imgur.com/0z7Q4gd.jpg)
  
  `,
} )
