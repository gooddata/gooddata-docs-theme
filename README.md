# gdc-docs-theme
GoodData Documentation Theme extends and overrides [Docsy](https://www.docsy.dev/) theme for [Hugo](https://gohugo.io/) static site generator. It provides ont only GoodData-branded styling but also some additional functionality, like support for custom versioning scheme, translated documentation and Redocly API refernces.

## Usage
In order to use this theme in an existing repository you should include contents of this repository as a git submodule alongside with the Docsy theme.

Git submodule definition:
```
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
