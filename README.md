# Teachers

The chosen teacher video platform aka B2T.

## Development

To run a local instance of B2T against `staging`, run `npm run dev`.
The environment can be changed in `.env.dev`. Using the `ENVIRONMENT_DOMAIN` environment variable.

Other handy commands:

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

```
npm run lint:analyse
```

### ant-d Icons

To minimize the bundle size, we explicitly include ant-d icons.
Icons we wish to include in our bundle must be listed in `resources/icons.ts`.

The list of icons contain the icons we actually use, as well as default icons used by ant-d components.
Should default icons not render, then they need to be activated in `icons.ts`.