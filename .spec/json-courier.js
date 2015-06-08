//var nock = require('nock');
var expect = require('chai').expect;
var courier = require('../index');

describe ('json-courier', function () {

	courier.domainPrefix('http://localhost:8000');

	describe ('#constructor', function () {

		it ('should return same Object for same channel', function () {
			expect(courier('/api/1.0')).equals(courier('/api/1.0'));
		});

		it ('should return different Object for different channel', function () {
			expect(courier('/api/1.0')).not.equals(courier('/api/1.1'));
		});

	});

	describe ('#auth', function () {

		it ('should be set via #authWith', function () {
			var api = courier('/api/1.0');
			api.authWith('xxx.yyy.zzz');
			expect(api.auth()).equals('xxx.yyy.zzz');
		})

	});

	describe ('#urldomain', function () {

		it ('should equal domain', function () {
			var api = courier('/api/1.0');
			expect(api.urldomain()).equals('http://localhost:8000');
		});

	});

	describe ('#urlprefix', function () {

		it ('should equal prefix only', function () {
			var api = courier('/api/1.0');
			expect(api.urlprefix()).equals('/api/1.0');
		})

	});

	describe ('#urlroot', function () {

		it ('should equal full url', function () {
			var api = courier('/api/1.0');
			expect(api.urlroot()).equals('http://localhost:8000/api/1.0');
		})

	});

	describe ('#prefixpath', function () {

		it ('should equal full prefix + path', function () {
			var api = courier('/api/1.0');
			expect(api.prefixpath('/test/add')).equals('/api/1.0/test/add');
		})

	});

	describe ('#req', function () {

		var expectedList = [
			{
				_id: 1,
				title: 'Item 1'
			},
			{
				_id: 2,
				title: 'Item 2'
			},
			{
				_id: 3,
				title: 'Item 3'
			}
		];

		var request = { limit: 10, offset: 20 };

		var api = courier('/api/1.0');

		it ('should be able to send request', function (done) {

			// mock network call
//			nock(api.urldomain())
//				.post(api.prefixpath('item/list'), {
//					auth: api.auth(),
//					data: request
//				})
//				.reply(200, JSON.stringify({
//					status: 'success',
//					data: expectedList
//				}));

			var resolvableStatus = [ 'success' ];
			api.req('item/list', request, resolvableStatus)
				.then(function (res) {
					done();
				}, function (reason) {
					console.log('err', reason);
					done();
				});
		})

	})

});