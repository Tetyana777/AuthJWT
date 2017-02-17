AuthJWT has been developed as a module for authenticating users with <a href="https://jwt.io/"> JSON Web Tokens</a> and is part of the "Doom Metal" app development project.

Source codes include both server-side (JWT, PassportJS token bearer strategy) and client-side (AngularJS) JSON web tokens authentication. Web developers can integrate them in their web apps as the LOGIN part applying user authentication with JSON Web Tokens.

AuthJWT is developed using NodeJS Express framework, PassportJS authentication middleware, JSON Web Tokens authentication/validation tools (<a href="https://www.npmjs.com/package/express-jwt-token">"express-jwt-token"</a> authentication package, <a href="https://github.com/auth0/express-jwt">"express-jwt"</a> middleware),
Mongoose MongoDB, Winston logging library, Bower/NPM package managers, GulpJS (for automated development workflow), Jasmine/Karma (front-end tests), Sinon/Supertest/Mocha/Chai (back-end tests).

The general overview of the contents of the project files folders:
- "app-server/": server-side authentication (models, controllers and PassportJS configuration file (local/bearer strategies applied));
- "bower-components":  angular, angular-mocks, angular-ui-router, bootstrap, jquery, ngstorage (.gitignore);
- "db": database files (empty by default);
- "libs/log.js": Winston log file configuration;  
- "public": client-side codes for JSON Web Tokens authentication (AngularJS):
   - "public/": controllers, services;
   - "public/index.html": the main project HTML file;
   - "public/main.js": the main project client-side running Javascript file (including the request/response interceptor configuration);
- "tests":
  - "tests/app_client/": testing the client-side code (interceptor, services) with Jasmine/Karma ($httpBackend);
  - "tests/app_server/": testing the server-side code (express server/routes/controllers, JWT Authentication controllers, passport bearer strategy) with Mocha/Chai/Sinon/Supertest;
- "bower.json": bower configuration file;
- "debug.log": log file (Winston-configured);
- "gulpfile.js": running the tasks ('usemin', 'server'(express), 'users'(MongoDB), 'karma', 'mocha');
- "karma.conf.js": karma runner configuration file;
- "package.json": list of packages installed/needed for the project.;
- "server.js": the main project server-side running Javascript file.


Testing tools: POSTMAN.
