'use strict';

const fs = require('fs');
const less = require('less');
const glob = require('glob').sync;

function buildLessFromConfig(obj) {
  let list = [];  
  for (let key in obj) {
    let val = obj[key];
    if (typeof val !== 'object') {
      list.push([key, val]);
    } else {
      for (let k2 in val) {
        list.push([`${key}-${k2}`, val[k2]]);
      }
    }
  }
  return list.map(function(item) {
    return `@${item[0]}: ${item[1]};`;
  }).join('\n');
}

function buildNewStyle(config, callback) {
  config = buildLessFromConfig(config);
  const contents = glob('src/**/*.less').map(
    function (pathname) {
      return fs.readFileSync(pathname, 'utf8');
    }
  ).join('\n');
  const source = [
    config,
    contents
  ].join('\n');
  return less.render(source, {compress: true}, callback);
}

buildNewStyle(require('./src/config.js'), function(err, output) {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log(output.css);
});