#!/usr/bin/env bash

set -x -e

npm -v
npm audit --audit-level moderate
npm ci
npm run lint
npm run compile
npm run test
npm run build

cp -R dist/ Dockerfile ../dist/
