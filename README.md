# Sequence

[Sequence](https://github.com/decimals/sequence) implementation using JavaScript

## How to run

```
yarn start
```

## Tips

### Start local Dynamodb
```jsx
docker run -p 8888:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -inMemory -sharedDb
```

it needs to use `-sharedDb` to work properly

### Start repl
```jsx
lein repl
(start-dev) # start server
(stop-dev) # stop server
(use 'decimals.transport :reload) # reload code
(require '[taoensso.faraday :as far]) # require package
```

Inspect local Dynamodb
```jsx
DYNAMO_ENDPOINT=http://localhost:8888 dynamodb-admin
```

Learn about:

- [ ] partition key - hash key
- [ ] sort key - range key
- [ ] index local and global
