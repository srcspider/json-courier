`json-courier` is a utility library for creating simple APIs.

Only the `POST` method and `JSON` format are supported. This limitation is intentional; this small library is designed to help with the boring parts not do everything.

Basic Example:

```js
var courier = require('json-courier');
var api = courier('/api/1.0');

var ExampleRepo = function () {
	// empty
};

ExampleRepo.prototype = {

	// accepts is an array of status'es that should go though resolve,
	// everything thats not in status goes though reject path
	list: function (payload, accepts) {
		// a promise will be returned; the lie library is used under the hood
		return api.req('example/list', payload, accepts);
	},

	// same as above; shorthand syntax
	add: api.f('example/add')

};

module.exports = ExampleRepo;
```

On the server, all api requests come in the form of,

```json
{
	"auth" : "[ value of api.auth() ]", 
	"data" : "[ the payload ]"
}
```

You can set and retrieve `auth` via `api.authWith(authToken)` and `api.auth()`

The server is expected to respond with at least `status` and `data`, null in
case of no response. Here is a the simplest success response:

```json
{
	"status" : "success",
	"data"   : null
}
```

An error should return status `error` and use the error message in `data`.

Example error:

```json
{
	"status" : "error",
	"data"   : "Example error"
}
```

To set a domain use `courier.domainPrefix`; this is a global setting.
