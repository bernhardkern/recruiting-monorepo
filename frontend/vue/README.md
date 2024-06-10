# Recruiting Frontend: Vue

## Project Setup
Create a `.envrc` file by copying the `.envrc.template` file first.

If you have `direnv` you may want to do
```sh
direnv allow .
```

Then install the packages:
```sh
npm install
```

### Start the mock server
In the folder "api-mock/mock-server" you'll find an API mock server configuration.
You can start it using the provided `docker-compose.yml`
```sh
docker compose up
```

or you use the node version in that directory
```sh
npm install
npm run start
```

### Compile and Hot-Reload for Development

```sh
npm run dev:mock
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Linter, Style Checks and Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run qa
```
