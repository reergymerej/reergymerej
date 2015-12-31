var unique = require('uniq');

var data = [1, 2, 2, 3, 4, 5, 5, 5, 6, 9999];

console.log(unique(data));
console.log(unique(data));
console.log(unique(data));

var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(React.createElement(
  'h1',
  null,
  'Hello, world!'
), document.getElementById('example'));