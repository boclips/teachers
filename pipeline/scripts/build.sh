#!/usr/bin/env bash

set -e

if [ -e ../version/tag ]
then
  TAG=$(cat ../version/tag)
else
  TAG="dependabot"
fi

SENTRY_RELEASE="teachers-${TAG}"
export SENTRY_RELEASE

npm -v
npm ci
npm run build:ci

cp -R application.conf dist/ Dockerfile ../dist/
