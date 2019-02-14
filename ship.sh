#!/usr/bin/env bash

set -e

git pull -r

npm i
npm audit
npm run compile
npm run lint
npm run test
npm run build

git push
say 'shipity ship' -v "$(say -v '?' | shuf -n 1 | cut -d' ' -f1)"