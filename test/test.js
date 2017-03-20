(() => {
  'use strict';

  const fs    = require('fs-promise');
  const path  = require('path');

  const response2json = require('../index');

  const url = 'https://example.com';

  describe(`Request ${url} and save the response as response.json`, () => {

    afterAll(() => {
      let response_path = path.resolve(__dirname, '../response.json'),
        test_path       = path.resolve(__dirname, '../temp_dir'),
        pretty_path     = path.resolve(__dirname, '../pretty.json');

      return Promise.all([
        fs.remove(response_path),
        fs.remove(test_path),
        fs.remove(pretty_path)
      ]);
    });

    test('without options', () => {
      return response2json(url)
        .then(fs.readFile)
        .then(content => {
          expect(JSON.parse(content)).not.toThrow(SyntaxError);
        })
        .catch(err => {
          expect(err).toBeNull();
        });
    });

    test('with {output_file: "temp_dir/test.json"}', () => {
      return response2json(url, {output_file: 'temp_dir/test.json'})
        .then(fs.readFile)
        .then(content => {
          expect(JSON.parse(content)).not.toThrow(SyntaxError);
        })
        .catch(err => {
          expect(err).toBeNull();
        });
    });

    test('with {output_file: "pretty.json", pretty_print: true}', () => {
      return response2json(url, {output_file: 'pretty.json', pretty_print: true})
        .then(fs.readFile)
        .then(content => {
          expect(JSON.parse(content)).not.toThrow(SyntaxError);
        })
        .catch(err => {
          expect(err).toBeNull();
        });
    });

  });

})();
