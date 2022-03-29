# 👤 jsonresume-theme-japanese-cv-style

The theme for [JSON Resume](https://jsonresume.org) specialized in the hire in Japanese IT fields.  
日本の IT 業界での就職活動に特化した、[JSON Resume](https://jsonresume.org) 専用職務経歴書テーマ。

## System requirement

- x86-64(**Strongly recommend**) or ARM64 CPU
  - The package uses Chromium internally but may not work correctly on ARM architecture CPUs such as the Apple M1.
- Linux / macOS / Windows
- Node.js >= 14

## Usage

```sh
mkdir my-cv
cd my-cv
npm init
npm install -D hackmyresume jsonresume-theme-japanese-cv-style
curl -O https://raw.githubusercontent.com/kurone-kito/jsonresume-theme-japanese-cv-style/master/resume.json
vim resume.json # Edit it!
node_modules/.bin/hackmyresume BUILD resume.json TO dist/resume.all -t node_modules/jsonresume-theme-japanese-cv-style
open dist/resume.pdf # Preview
```

## Example

- Input
  - [resume.json](https://github.com/kurone-kito/jsonresume-theme-japanese-cv-style/blob/master/resume.json)
- Output
  - [HTML](https://kurone-kito.github.io/jsonresume-theme-japanese-cv-style/)
  - [PDF](https://kurone-kito.github.io/jsonresume-theme-japanese-cv-style/index.pdf)

## License

MIT
