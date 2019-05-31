workflow "Build and lint" {
  on = "push"
  resolves = [
    "Build project",
    "Lint project"
  ]
}

action "Don't skip CI" {
  uses = "ffflorian/actions/skip-ci-check@master"
}

action "Install dependencies" {
  uses = "ffflorian/actions/git-node@master"
  needs = "Don't skip CI"
  runs = "yarn"
}

action "Lint project" {
  uses = "ffflorian/actions/git-node@master"
  needs = "Install dependencies"
  runs = "yarn"
  args = "lint"
}

action "Build project" {
  uses = "ffflorian/actions/git-node@master"
  needs = "Install dependencies"
  runs = "yarn"
  args = "dist"
}
