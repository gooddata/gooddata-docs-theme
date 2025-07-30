---
title: "GoodData Docs Theme"
linkTitle: "Home"
weight: 1
cascade:
- type: "docs"
  toc_root: true
  _target:
    path: "/*/**"
- type: "docs"
  toc_root: true
  _target:
    path: "/"

---
GoodData Documentation Theme extends and overrides [Docsy](https://www.docsy.dev/) theme for [Hugo](https://gohugo.io/) static site generator. It provides ont only GoodData-branded styling but also some additional functionality, like support for custom versioning scheme, translated documentation and Redocly API refernces.

## Usage as a Hugo module

To use a Docs project with Hugo modules configured, you don't need anything special. Hugo resolves dependencies upon running the base `hugo` command.

To update module to a newer version, run `hugo mod get -u github.com/gooddata/gooddata-docs-theme`.

To run a localhost or deploy preview with unmerged version from a branch, run `hugo mod get -u github.com/gooddata/gooddata-docs-theme@branch-name`.

## Configure Hugo module

This theme contains a config file enabling it to be used as a Hugo submodule resolving dependencies automatically. In order to start using this way of adding dependency, you first need to add following lines to your project `config.toml` file:

1.

```toml
[module]
  proxy = "direct"
  [module.hugoVersion]
    extended = true
    min = "0.81.0"
  [[module.imports]]
    path = "github.com/gooddata/gooddata-docs-theme"
    disable = false
```

2. Run `hugo mod init repository-path` where `repository-path` is your Github/Gitlab repository URL without protocol. This command will create a necessary `go.mod` file.
3. Run `hugo mod get -u github.com/gooddata/gooddata-docs-theme` which will add this theme as a dependency.
4. Change theme config to `theme = ["github.com/gooddata/gooddata-docs-theme"]`

After running steps above you should get `go.mod` file that looks something like this:

```bash
module github.com/gooddata/gooddata-python-sdk

go 1.20

require (
    github.com/FortAwesome/Font-Awesome v0.0.0-20230327165841-0698449d50f2 // indirect
    github.com/gooddata/gooddata-docs-theme v0.0.0-20230726124044-9bb5d5fc63ba // indirect
    github.com/google/docsy v0.7.1 // indirect
    github.com/google/docsy/dependencies v0.7.1 // indirect
    github.com/twbs/bootstrap v5.3.1+incompatible // indirect
)
```

In case you switch from Git submodules, you can now remove those using these commands:

```bash
git rm docs/themes/docsy
git rm docs/themes/docsy
```

## Usage as a Git submodule
In order to use this theme in an existing repository you should include contents of this repository as a git submodule alongside with the Docsy theme.

Git submodule definition:

```bash
[submodule "docs/themes/gdcDocsTheme"]
    path = docs/themes/gdcDocsTheme
    url = https://github.com/gooddata/gdc-docs-theme.git
    branch = basic-theme
```

Hugo configuration file (config.toml):

```toml
theme = ["GDCDocsTheme", "docsy"]
```

## License

(C) 2007-2023 GoodData Corporation

For more information, please see [LICENSE](LICENSE).
