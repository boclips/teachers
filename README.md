# Teachers

[![concourse](https://concourse.devboclips.net/api/v1/pipelines/boclips/jobs/build-teachers/badge)]()

This is the user-facing teacher application running on [teachers.boclips.com](teachers.boclips.com).

The application allows teacher to use videos in the classroom in a safe way.
Our videos do not contain adverts and are appropriate for children.

## Development

It is written in TypeScript, based on react/redux and has way too any npm dependencies (like any other web app these days).

### Running locally

To run a local instance of B2T against `staging`, run `npm run dev`.

The environment can be changed in `.env.dev`. Using the `ENVIRONMENT_DOMAIN` environment variable.

### Developing locally

```
npm run test
```

```
npm run test:watch
```

```
npm run compile
```

```
npm run lint:fix
```

### Dependency analysis

To analyse the depencencies that end up in the bundle, run:

```
npm run lint:analyse
```

### ant-d Icons

To minimize the bundle size, we explicitly include ant-d icons.
Icons we wish to include in our bundle must be listed in `resources/icons.ts`.

The list of icons contain the icons we actually use, as well as default icons used by ant-d components.
Should default icons not render, then they need to be activated in `icons.ts`.

### Imports

As the project grows, so do the inter-dependencies between files. Relative paths used in import statements
are OK on a small scale, but this project is past that point now.

There are three aliases that have been configured for this project:
- `src` which is an alias to `./src`
- `resources` which is an alias to `./resources` 
- `test-support` which is an alias to `./test-support`

These can be referenced in a TypeScript file using the following syntax:
```typescript
import { MyComponent } from 'src/components/MyComponent';
```

Or in a LESS file using the following syntax:
```less
@import "~resources/less/app.less";
```

IntelliJ **should** automatically use these aliases when you import new components, and should not show
any errors for these paths. However, if it does you should ensure that the webpack plugin is pointing to the common webpack configuration file.
