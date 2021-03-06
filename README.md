`json-courier` is a utility library for creating handling on the client for 
simple APIs.

Only the `POST` method and `JSON` format are supported. This limitation is intentional; this small library is designed to help with the boring parts not do everything.

Basic Example:

```js
var courier = require('json-courier');
var api = courier('/api/1.0');

var ExampleRepo = function () {
	// the type's constructor
};

ExampleRepo.prototype = {

	// accepts is an array of status'es that should go though resolve,
	// everything thats not in accepts goes though reject path; errors also
	// go though reject path (you can check for "stack" prop to diferentiate)
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

If you recieve `null` for `auth` the request should be treated as coming from 
a user that's not authenticated.

## Authentication

You can set and retrieve `auth` via `api.authWith(authToken)` and `api.auth()`

See example above for how the request looks.

## Server Response

The server is expected to respond with at least `status` and `data`. 
The `data` field should be `null` in case of no response. 

Here is a the simplest success response:

```json
{
	"status" : "success",
	"data"   : null
}
```

An error should have `status` set to `error` and set the error message in 
the `data` field.

Example error:

```json
{
	"status" : "error",
	"data"   : "Example error"
}
```

You can have any `status` you wish. It's recomended you don't hardcode the 
`accepts` value when defining the API on the client side; it's better for
the calling code to specify what `status` it's capable of accepting.

## Domain

By default there is no domain, the path is assumed relative to the current root
of the current domain. To set a domain use `courier.domainPrefix`; this is a 
global setting however.

