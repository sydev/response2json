# response2json

Save your HTTP responses in a json file.

## Install

```
npm install --save response2json
```

Or if you prefare yarn:

```
yarn add response2json
```

## Usage

```
const response2json = require('response2json');

const urls = ['https://example.com', 'https://google.com'];
const options = {output_file: 'my-awesome-responses.json'};

response2json(urls, options)
	.then(filepath => {
		console.log(`Your responses are saved at: ${filepath}`);
	});
```

## API

### response2json(urls [, options])

#### urls
Type: `String|Array`  
Required: `true`

The urls to fetch the responses.

#### options
Type: `Object`  
Required: `false`

##### output_file
Type: `String`  
Default: `response.json`

The filepath (relative to current working directory) where to store the responses.

##### format
Type: `String`
Default: `json`

The output format. Possible choices: `json`, `array`.

##### pretty_print
Type: `Boolean`  
Default: `false`

Save the response in a more humanreadable form (Add Whitespaces to json file).

## Development

Test:  
```
npm test
```


## License

MIT © [Dominik Winter](https://github.com/sydev)
