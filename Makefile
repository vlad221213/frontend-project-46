install:
	npm ci;
	npm link;
gendiff:
	node gendiff.js -h;
publish:
	npm publish --dry-run;
lint:
	npx eslint;
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest;
testCoverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage;
