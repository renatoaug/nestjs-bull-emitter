## Description

Emit events to other projects using bull and filtering by decorators.

## Installation

```bash
$ nvm use
$ npm install
```

## Running the app

Clone the [Receiver project](https://github.com/renatoaug/nestjs-bull-receiver).

```bash
$ docker-compose up -d
$ npm run start
```

## Using

In your receiver project add the decorator like [this example](https://github.com/renatoaug/nestjs-bull-receiver/blob/master/src/processor/content.processor.ts).

## Calling

```bash
curl --request PUT 'http://localhost:3000/contents/123'
```
