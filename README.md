# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

### Permissions table

|                        | Admin              | Member             | Billing            | Anonymous |
| ---------------------- | ------------------ | ------------------ | ------------------ | --------- |
| Update organization    | :white_check_mark: | :x:                | :x:                | :x:       |
| Delete organization    | :white_check_mark: | :x:                | :x:                | :x:       |
| Invite a member        | :white_check_mark: | :x:                | :x:                | :x:       |
| Revoke an invite       | :white_check_mark: | :x:                | :x:                | :x:       |
| List member            | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:       |
| Transfer ownership     | :warning:          | :x:                | :x:                | :x:       |
| Update member role     | :white_check_mark: | :x:                | :x:                | :x:       |
| Delete member          | :white_check_mark: | :warning:          | :x:                | :x:       |
| List projects          | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:       |
| Create a new project   | :white_check_mark: | :white_check_mark: | :x:                | :x:       |
| Update a project       | :white_check_mark: | :warning:          | :x:                | :x:       |
| Delete a project       | :white_check_mark: | :warning:          | :x:                | :x:       |
| Get billing details    | :white_check_mark: | :x:                | :white_check_mark: | :x:       |
| Export billing details | :white_check_mark: | :x:                | :white_check_mark: | :x:       |

> :white_check_mark: = allowed
> :x: = not allowed
> :warning: = allowed w/ confitions
