#!/usr/bin/env bash

set -x -e

export SENTRY_RELEASE="teachers-$(cat ../version/version)"

npm -v
npm ci
npm run audit
npm run lint
npm run compile
npm run test
npm run build

cp -R dist/ Dockerfile ../dist/
