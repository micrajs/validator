<p align="center">
  <img src="https://raw.githubusercontent.com/micrajs/micrajs/live/.assets/logo.png" width="25%">
</p>

<h1 align="center">@micra/validator</h1>

<p align="center">
  <img alt="version" src="https://img.shields.io/npm/v/@micra/validator.svg">
  <img alt="issues" src="https://img.shields.io/github/issues/micrajs/library-template.svg">
  <img alt="prs" src="https://img.shields.io/github/issues-pr/micrajs/library-template.svg">
</p>

<hr />

## About

This package is used to validate objects.

## Installation

```sh
yarn add @micra/validator
```

## Examples

> You can leverage the `@micra/validation-rules` package where we've created a bunch of useful rules.

```typescript
import { required, isString, optional } from '@micra/validation-rules';

interface User {
  id: string;
  name?: string;
}

// Case 1: Valid ID with name undefined (PASS)
const [data, errors] = validate<User>({ id: '123' }, {
  id: [required(), isString()],
  name: optional([isString()]),
});

if (errors.hasAny() /* false */) throw errors;

data.id // '123'
data.name // undefined

// Case 2: Valid ID with valid name (PASS)
const [data, errors] = validate<User>({ id: '123', name: 'John Doe' }, {
  id: [required(), isString()],
  name: optional([isString()]),
});

if (errors.hasAny() /* false */) throw errors;

data.id // '123'
data.name // 'John Doe'

// Case 3: Invalid ID with valid name (FAIL)
const [data, errors] = validate<User>({ id: 123, name: 'John Doe' }, {
  id: [required(), isString()],
  name: optional([isString()]),
});

if (errors.hasAny() /* true */) throw errors; // {"id":[{"message":"validation.isString"}]}

// Case 4: Valid ID with invalid name (FAIL)
const [data, errors] = validate<User>({ id: '123', name: 123 }, {
  id: [required(), isString()],
  name: optional([isString()]),
});

if (errors.hasAny() /* true */) throw errors; // {"name":[{"message":"validation.isString"}]}
```

## Author

- [Olavo Amorim Santos](https://github.com/olavoasantos)
