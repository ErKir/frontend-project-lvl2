install:
	npm ci

publish:
	npm publish --dry-run

link:
	npm link

gendiff:
	node gendiff.js

lint:
	npx eslint .

test:
	npm run test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
