require('../config/config.js');

function createSSEResource(author, contents) {
    return new Promise(function(resolve, reject) {
        fetch(`${global.gConfig.apiBaseUrl}/resources`, {
            method: 'post',
            body: JSON.stringify({
                author: author,
                contents: contents
            })
        })
        .then(res => res.json())
        .then(function(data) {
            let unexpectedResponse = false;

            if(data === undefined || data.author === undefined || data.author !== author)
                unexpectedResponse = true;

            if(data === undefined || data.contents === undefined || data.contents !== contents)
                unexpectedResponse = true;
            
            if(unexpectedResponse)
                reject('Error: Unexpected Response from the SSE Web API');
            else
                resolve('Resource Successfully Saved.');
        })
        .catch(function(err) {
            reject(`Error: ${err}`);
        });
    });
}

exports.createSSEResource = createSSEResource;