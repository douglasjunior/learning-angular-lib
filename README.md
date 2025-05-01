# Learning Angular Libraries

## Development server

To install dependencies, run:

```bash
yarn install
```

To build the library on watch mode, run:

```bash
yarn build design-system-lib --watch
```

To run the Storybook server, on the **workspace root** run:

```bash
yarn start
```

Then open your browser and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Replicating this example

To replicate this example, first you will need to create a new Angular workspace. You can do this by running:

```bash
ng new <workspace-name> --no-create-application
```

Then, navigate to the workspace directory and create a new library:

```bash
cd <workspace-name>
ng generate library design-system-lib
```

Create a new application to test the library manually or with the help of Storybook:

```bash
ng generate application design-system-preview
```

Add the library as a dependency to the application, on **root `package.json`**:

```json
{
  "dependencies": {
    ...
    "design-system-lib": "file:dist/design-system-lib",
  }
}
```

Add some components to the library. You can do this by running:

```bash
cd projects/design-system-lib
ng generate component src/lib/components/<component-name>
```

Expose the components in the library `projects/design-system-lib/src/public-api.ts` file:

```typescript
export * from './lib/components/<component-name>/<component-name>.component';
```

To add Storybook, run on the **workspace root**:

```bash
npx storybook@latest init
```

If ask to select the project, select the `design-system-preview` application.

In the `projects/design-system-preview/.storybook/tsconfig.doc.json`, exclude the `design-system-preview` components from the TS scope and add the library components:

```json
{
  "include": [
    "...",
    "../src/app/**/*" // <-- Add this
  ],
  "exclude": [
    "...",
    "../../design-system-lib/src/lib/**/*.component.ts" // <-- Add this
  ]
}
```

Remove any extra files from `projects/design-system-preview/src/stories` folder.

Add `projects/design-system-preview/documentation.json` to the `.gitignore` file.

Replace `start` script in the root `package.json` with:

```json
  "start": "ng run design-system-preview:storybook",
```

Then, to run the all parts together, follow the [Development server](#development-server) instruction above.

## Adding global styles

To add global styles to the library, create a `projects/design-system-lib/src/lib/styles/theme.css` file and add your styles there.

Then, declare the styles as an asset in the `projects/design-system-lib/ng-package.json` file:

```json
{
  ...,
  "assets": [
    "./src/lib/styles/theme.css" // <-- Add this
  ]
}
```

Then, import the styles in the `angular.json` file:

```json
{
  "projects": {
    "design-system-preview": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "projects/design-system-preview/src/styles.css",
              "dist/design-system-lib/src/lib/styles/theme.css" // <-- Add this
            ],
          }
        }
      }
    }
  }
}
```
