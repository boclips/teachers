#!/usr/bin/env bash

set -x -e

export SENTRY_RELEASE="teachers-$(cat ../version/version)"

npm -v
npm ci
npm run build:ci

cp -R dist/ Dockerfile ../dist/
