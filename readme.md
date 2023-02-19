# Real App

A simple real worlds app with
[preact-islands-diy](https://github.com/barelyhuman/preact-islands-diy)

This app is more than a rudimentary counter app that the above mentioned repo
provides, since the use case of the above repo was to make different bundlers
and build tools create island arch compatible setups.

This is not a full CRUD app but handles the basics which should help you
understand how to write apps using the above mentioned starter.

## Development

You can use this as a base since it does come with a few things already done for
you but I'd really recommend you use
[preact-islands-diy](https://github.com/barelyhuman/preact-islands-diy) instead
to build with things you are already comfortable with.

Let's go through a few things that you'd need to get this one up and running.

### Requirements

1. Node >= v14
2. Some knowledge of Nodejs and ExpressJS
3. Understanding of the concept of database migrations and a bit of SQL
   knowledge.

### Setup

The setup is pretty simple, just get `yarn` or `npm` to install the deps for
you.

#### `yarn`

```sh
$ yarn install
```

#### `npm`

```sh
rm yarn.lock # remove the lockfile first
npm i
```

### Migrations

To start using the actuall crud, you'll need a Database, this specific one uses
sqlite for the ease of things.

You can bootstrap the initial database by running the below commands.

Post runnning the commands, you will see a `dev.sqlite3` file at the root of the
project.

```sh
$ yarn db:migrate
# or
$ npm run db:migrate
```

### Run the Server

Now, we just need to run the server.

In case of production, you'll need to **build** first

**For Development**

```sh
$ yarn dev
# or
$ npm run dev
```

**For Production**

```sh
$ yarn build
$ yarn start

# or

$ npm run build
$ npm run start
```

## License

[MIT](/license)

## Goals

- [x] Simple Opaque Token Auth
- [x] Auth Pages
- [x] Show how an island would be used
- [x] Toast Notifications
- [x] Create Posts
- [ ] CSRF and Security
- [x] Explain the codebase
