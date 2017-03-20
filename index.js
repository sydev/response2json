(() => {
  'use strict';

  const fs      = require('fs-promise');
  const path    = require('path');
  const request = require('request-promise');

  const default_options = {
    output_file: 'response.json',
    pretty_print: false
  };

  /**
   * Convert the responses of HTTP-Requests to a JSON-Object and save it as file.
   * @param  {Array|String}   urls    The Urls to fetch
   * @param  {Object}         options An options object
   * @return {Promise}                The path to the generated file containing the responses.
   *                                  If an error occurred, the Promise rejects it.
   */
  module.exports = (urls, options = {}) => {
    // Create an array if "urls" is eg. a string
    if (!Array.isArray(urls)) urls = [urls];

    // Assign the options
    options = Object.assign(default_options, options);

    return new Promise((resolve, reject) => {
      let reqs      = [],
        i           = 0,
        len         = urls.length,
        json_space  = (options.pretty_print) ? '\t' : 0;

      // Create an array containing the request promises
      for (; i < len; i++) {
        reqs.push(request({
          uri: urls[i],
          rejectUnauthorized: false,
          resolveWithFullResponse: true
        }));
      }

      // Execute all requests
      Promise.all(reqs)
        .then(responses => {
          let result = {},
            filepath = path.join(__dirname, options.output_file);

          i   = 0;
          len = responses.length;

          // Convert the responses to JSON Objects
          for (; i < len; i++) {
            result[urls[i]] = Object.assign({}, responses[i]);
          }

          // Stringify the Object. json_space is set by the prettyPrint option.
          result = JSON.stringify(result, null, json_space);

          // Write to output-file
          fs.outputFile(filepath, result)
            .then(err => {
              if (err) return reject(err);
              resolve(filepath);
            });
        });
    });
  };

})();
