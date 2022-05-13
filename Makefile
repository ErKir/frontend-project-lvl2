install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node gendiff.js

lint:
	npx eslint .
