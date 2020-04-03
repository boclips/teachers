#!/usr/bin/env bash

set -x -e

SENTRY_RELEASE="teachers-$(cat ../version/tag)"
export SENTRY_RELEASE

npm -v
npm ci
npm run build:ci

cp -R dist/ Dockerfile ../dist/
