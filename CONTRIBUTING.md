# Contributing Guidelines

## Setup

Requires `node >= 12`.

You will need to create a Google Cloud Project with the Translate API enabled to try out translation translating.

Translations will be enabled if the `GOOGLE_APPLICATION_CREDENTIALS` environment variable is set to a path that contains the credentials for a Google Cloud Project's service account, which you must create. See the [following steps](https://www.npmjs.com/package/@google-cloud/translate#quickstart) for further guidance on setting up the Google Cloud Project.

## Commit Message Format

We follow [Angular's Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples:

```docs(changelog): update changelog to beta.5```

```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Revert
If the commit reverts a previous commit, it should begin with revert: , followed by the header of the reverted commit. In the body it should say: This reverts commit <hash>., where the hash is the SHA of the commit being reverted.


### Type
Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

### Scope

The scope should be one of the following, but may also be empty for repository-wide changes:

- **frontend**
- **backend**


### Subject
The subject contains a succinct description of the change:

use the imperative, present tense: "change" not "changed" nor "changes"
don't capitalize the first letter
no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.
