# TypeScript with node and react SSR

> The aim of this project is to have a single cli too for that gives a great development experience in complex environments.

## Tasks

- On TypeScript files changes perform:
  - Compile server code using `tsc`
  - Compile client code using `webpack`
- Serve only the server files with `nodemon`
- Serve a `livereload` server. Server will emit a reload after the following criteria meet:
  - After all compilations are done
  - After node server is up and running
