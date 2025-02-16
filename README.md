# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

#### Frontweb
1. clone repo
2. delete the file `package-lock.json`
3. install the dependencies `npm install`
4. run `npm run serve` for a dev server
5. navigate to `http://localhost:8080/`

#### Fake API
1. install JSON Server `npm install -g json-server`
2. start JSON Server `json-server --watch db.json`
3. navigate to resources `http://localhost:3000`

Resources
- http://localhost:3000/pokemons
