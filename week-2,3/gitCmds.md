# Git and GitHub Commands

Git is a *version control system* used to track changes in source
code. GitHub is an online platform used to host Git repositories and
collaborate with others.

## 1. Git basics and configuration

### `git --version`

Checks whether Git is installed and displays its version.

``` bash
git --version
```

### `git help`

Displays general Git help.

``` bash
git help
git help commit
```

### `git config --list`

Displays Git configuration settings.

``` bash
git config --list
```

### `git config --global user.name "Your Name"`

Sets the name recorded in commits across repositories.

``` bash
git config --global user.name "Rahul"
```

### `git config --global user.email "you@example.com"`

Sets the email recorded in commits.

``` bash
git config --global user.email "you@example.com"
```

### `git config user.name` and `git config user.email`

Display the name and email configured for the current repository.

``` bash
git config user.name
git config user.email
```

**Note:** Your Git commit name is not necessarily your GitHub username.

## 2. Creating and downloading repositories

### `git init`

Initializes a new Git repository in the current folder.

``` bash
mkdir student-backend
cd student-backend
git init
```

Git creates a hidden `.git` directory to store repository history and
metadata.

### `git clone URL`

Downloads a remote repository, including its files and history.

``` bash
git clone https://github.com/USERNAME/student-backend.git
```

### `git status`

Shows the current branch and files that are untracked, modified, or
staged.

``` bash
git status
```


## 3. Tracking and saving changes

### `git add filename`

Stages a particular file for the next commit.

``` bash
git add server.js
```

### `git add .`

Stages new and modified files under the current directory.

``` bash
git add .
```

### `git diff`

Shows changes that have not yet been staged.

``` bash
git diff
```

### `git commit -m "message"`

Saves staged changes as a commit in local history.

``` bash
git add server.js
git commit -m "Add student APIs"
```

## 4. Viewing commit history

### `git log`

Displays detailed commit history.

``` bash
git log
```

### `git log --oneline`

Displays commits in a compact format.

``` bash
git log --oneline
```

### `git show`

Displays the latest commit's details and changes.

``` bash
git show
```

### `git show COMMIT_HASH`

Displays details for a particular commit.

``` bash
git show a1b2c3d
```

### `git diff HEAD`

Shows tracked changes relative to the latest commit, including staged
and unstaged changes.

``` bash
git diff HEAD
```

## 5. Branching and merging

A branch lets you work on a feature separately from the main branch.

### `git branch`

Lists local branches.

``` bash
git branch
```

### `git branch -a`

Lists local branches and remote-tracking branches.

``` bash
git branch -a
```

### `git branch feature`

Creates a branch without switching to it.

``` bash
git branch feature
```

### `git switch feature`

Switches to an existing branch.

``` bash
git switch feature
```

### `git switch -c feature`

Creates a branch and switches to it.

``` bash
git switch -c feature-update
```

### `git checkout feature`

Switches to an existing branch. `git switch` is the more focused modern
command for this operation.

``` bash
git checkout feature
```

### `git checkout -b feature`

Creates and switches to a branch.

``` bash
git checkout -b feature-update
```

### `git merge feature`

Merges the named branch into the current branch.

``` bash
git switch main
git merge feature-update
```

### `git branch -d feature`

Deletes a local branch that has been merged.

``` bash
git branch -d feature-update
```

### `git branch -D feature`

Force-deletes a local branch, even if it has unmerged work.

``` bash
git branch -D feature-update
```

## 6. Connecting Git to GitHub

### `git remote -v`

Displays configured remote URLs.

``` bash
git remote -v
```

### `git remote add origin URL`

Connects the local repository to a remote named `origin`.

``` bash
git remote add origin https://github.com/USERNAME/student-backend.git
```

### `git remote remove origin`

Removes the remote configuration locally. It does not delete the GitHub
repository.

``` bash
git remote remove origin
```

### `git push`

Uploads local commits to a remote branch.

``` bash
git push
```

### `git push -u origin main`

Pushes the `main` branch and sets its upstream, so future pushes can
usually use `git push`.

``` bash
git push -u origin main
```

### `git pull`

Fetches remote changes and integrates them into the current branch.

``` bash
git pull
```

### `git pull origin main`

Fetches and integrates changes from the remote `main` branch.

``` bash
git pull origin main
```

### `git fetch`

Downloads remote updates without merging them into the current branch.

``` bash
git fetch
```

### `git fetch --all`

Fetches updates from all configured remotes.

``` bash
git fetch --all
```

## 7. Undoing changes and commits

Choose commands carefully: some undo local edits, some create a new
commit, and others rewrite history.

### `git restore filename`

Discards unstaged edits to a file.

``` bash
git restore server.js
```

### `git reset HEAD~1`

Moves the current branch back by one commit and keeps the changes in the
working directory, usually unstaged.

``` bash
git reset HEAD~1
```

### `git revert COMMIT_HASH`

Creates a new commit that reverses the changes introduced by a specified
commit. It preserves existing history and is usually safer for shared
branches.

``` bash
git revert a1b2c3d
git push
```

## 8. Stashing temporary changes

Stashing saves unfinished work temporarily without making a commit.

### `git stash`

Stashes tracked working-tree changes.

``` bash
git stash
```

## 9. `.gitignore`

A `.gitignore` file tells Git which untracked files or directories to
ignore. For a Node.js project, a simple example is:

``` gitignore
node_modules/
.env
.DS_Store
```

Never commit passwords, API keys, or database credentials.

## 10. GitHub collaboration concepts and commands

### Fork

A **fork** is a GitHub-side copy of another user's repository under your
account. It is commonly used when you do not have permission to push
directly to the original repository.

### Pull request

A **pull request (PR)** proposes merging changes from one branch or
repository into another. It is usually created on the GitHub website
after pushing a branch.

### `git clone URL`

Clone your fork or another repository locally.

``` bash
git clone https://github.com/USERNAME/project.git
```

GitHub also supports issues, pull requests, code reviews, branch
protection, and GitHub Actions for collaboration and automation.
