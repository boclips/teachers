[![concourse](https://concourse.devboclips.net/api/v1/pipelines/boclips/jobs/build-teachers/badge)]()

# Teachers

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