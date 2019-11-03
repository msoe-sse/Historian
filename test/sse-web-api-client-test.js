const chai = require('chai');
const chaiFetchMock = require('chai-fetch-mock');
const chaiAsPromised = require('chai-as-promised');
const fetchMock = require('fetch-mock');
const sseWebApiClient = require('../src/sse-web-api-client.js');

chai.use(chaiFetchMock);
chai.use(chaiAsPromised);

describe('SSE Web API Client', function() {
    describe('Creating a SSE Resource', function() {

        it('should return a success message when a resource was saved successfully', async function() {
            fetchMock.post('http://localhost:5000/resources/', {'author': 'Andy', 'contents': 'contents'});

            const message = await sseWebApiClient.createSSEResource('Andy', 'contents', 'id');
            chai.expect(message).to.equal('Resource Successfully Saved.')
        });

        it('should return an error message if the author is not included in the response', function() {
            fetchMock.post('http://localhost:5000/resources/', {'contents': 'contents'});

            chai.expect(sseWebApiClient.createSSEResource('Andy', 'contents', 'id')).to.be
                .rejectedWith('Error: Unexpected Response from the SSE Web API');
        });

        it('should return an error message if the contents is not included in the response', function() {
            fetchMock.post('http://localhost:5000/resources/', {'contents': 'contents'});

            chai.expect(sseWebApiClient.createSSEResource('Andy', 'contents', 'id')).to.be
                .rejectedWith('Error: Unexpected Response from the SSE Web API');
        });

        it('should return the error message if the response is not OK', function() {
            fetchMock.post('http://localhost:5000/resources/', { throws: new Error('My Error')});

            chai.expect(sseWebApiClient.createSSEResource('Andy', 'contents', 'id')).to.be.rejectedWith('Error: My Error');
        });

        afterEach(() => fetchMock.restore());
    });
});