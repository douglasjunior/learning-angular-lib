# Learning Angular Libraries

## Development server

To install dependencies, run:

```bash
yarn install
```

To build the library on watch mode and run the Storybook server, on the **workspace root** run:

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
ng generate library @design-system/lib
```

Create a new application to test the library manually or with the help of Storybook:

```bash
ng generate application design-system-preview
```

Create a `projects/design-system-preview/package.json` and add the dependency for `@design-system/lib`:

```json
{
  "name": "design-system-preview",
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "@design-system/lib": "workspace:^"
  }
}
```

Add some components to the library. You can do this by running:

```bash
cd projects/@design-system/lib
ng generate component src/lib/components/<component-name>
```

Expose the components in the library `projects/@design-system/lib/src/public-api.ts` file:

```typescript
export * from './lib/components/<component-name>/<component-name>.component';
```

Update the `workspaces` field in the `package.json` file to include the library:

```json
{
  ...
  "workspaces": {
    "packages": [
      "projects/design-system/lib",
      "projects/design-system-preview"
    ]
  },
}
```

## Adding Storybook

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
    "../../@design-system/lib/src/lib/**/*.component.ts" // <-- Add this
  ],
  "exclude": [
    "...",
    "../src/app/**/*" // <-- Add this
  ]
}
```

Remove any extra files from `projects/design-system-preview/src/stories` folder.

Add `projects/design-system-preview/documentation.json` to the `.gitignore` file.

Add the following args to the Compodoc cli in `angular.json` to exclude private and internal members from the documentation:

```json
        "storybook": {
          ...
          "options": {
            ...
            "compodocArgs": [
              "-e",
              "json",
              "--disablePrivate", // <-- Add this
              "--disableInternal", // <-- Add this
              "-d",
              "projects/design-system-preview"
            ],
          }
        },
        "build-storybook": {
          ...
          "options": {
            ...
            "compodocArgs": [
              "-e",
              "json",
              "--disablePrivate", // <-- Add this
              "--disableInternal", // <-- Add this
              "-d",
              "projects/design-system-preview"
            ],
          }
        }
```

Install the `npm-run-all` to run multiple scripts in parallel:

```bash
yarn add -D npm-run-all
```

Then, change the `watch`, and `start` scripts in the `package.json` file:

```json
  "scripts": {
    ...
    "start": "run-p watch start:storybook",
    "start:storybook": "ng run design-system-preview:storybook",
    "watch": "ng build @design-system/lib --watch",
  },
```

## Adding global styles

To add global styles to the library, create a `projects/@design-system/lib/src/lib/styles/theme.css` file and add your styles there.

Then, declare the styles as an asset in the `projects/@design-system/lib/ng-package.json` file:

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
  ...
  "projects": {
    "design-system-preview": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "projects/design-system-preview/src/styles.css",
              "node_modules/@design-system/lib/src/lib/styles/theme.css" // <-- Add this
            ],
          }
        }
      }
    }
  }
}
```

## Adding Angular schematics

When you create a new library, Angular CLI does not create the schematics folder for you. You will need to create it manually.

This is necessary to Angular CLI to automate the installation of the library in the project when you run `ng add @design-system/lib`.

To add Angular schematics to the library, create this folder structure in `projects/design-system/lib`:

```
projects
└── design-system
    └── lib
        ├── schematics
        │   ├── collection.json
        │   ├── ng-add
        │   │   └── index.ts
        ├── tsconfig.schematics.json
```

### collection.json

```json
{
  "$schema": "../../../../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "ng-add": {
      "description": "Adds Design System styles to the project.",
      "factory": "./ng-add/index#ngAdd"
    }
  }
}
```

### ng-add/index.ts

In the (index.ts)[projects/design-system/lib/schematics/ng-add/index.ts] file, write the code to parse the `angular.json` file and add the library styles to the project.

### tsconfig.schematics.json

Angular does not compile the schematics code by default. You will need to create a new (`tsconfig.schematics.json` like this)[projects/design-system/lib/tsconfig.schematics.json].

### package.json

In the `projects/@design-system/lib/package.json` file, add the `schematics` field and the `build` script:

```json
{
  ...
  "scripts": {
    "build": "npx run-s build:tsc build:copy",
    "build:tsc": "npx tsc -p tsconfig.schematics.json",
    "build:copy": "npx copyfiles schematics/*/schema.json schematics/*/files/** schematics/collection.json ../../../dist/design-system/lib"
  },
  "schematics": "./schematics/collection.json",
  "ng-add": {
    "save": "dependencies"
  }
}
```

In the `package.json` in the workspace root, update the `build` scripts to build the schematics too:

```json
{
  ...
  "scripts": {
    ...
    "build": "run-s build:lib build:schematics",
    "build:lib": "ng build @design-system/lib",
    "build:schematics": "cd projects/design-system/lib && yarn build"
  }
}
```

## Publishing the library to private NPM registry

To publish the library to a private NPM registry, you can use the [verdaccio](https://verdaccio.org/) registry server. 

To run it, just run:

```bash
# start the registry server
docker-compose up -d
# create a new user
npm adduser --registry http://localhost:4873
# login to the registry
npm login --registry http://localhost:4873
```

> Open the **verdaccio** web interface at http://localhost:4873 .

Then, build the library:

```bash
ng build @design-system/lib
```

Then, publish the library to the registry:

```bash
cd dist/design-system/lib
npm publish --registry http://localhost:4873
```

> Remember to update the version in the `projects/@design-system/lib/package.json` file before publishing again. You can use `npm version <newversion>` to do this.

## Installing the library in another project

To install the library in another project, first you need to add the private registry to `@design-system` scope.

For Yarn, create a `.yarnrc` file in the root of the project and add the following line:

```yml
npmScopes:
  design-system:
    npmRegistryServer: "http://localhost:4873/"
    npmAlwaysAuth: false
    npmAuthToken: ""

unsafeHttpWhitelist:
  - "localhost"
```

For NPM, create a `.npmrc` file in the root of the project and add the following line:

```properties
@design-system:registry=http://localhost:4873/
registry=https://registry.npmjs.org/
```

Then, install the library:

```bash
ng add @design-system/lib
```
