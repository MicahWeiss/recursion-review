// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  var type = function() {
    if (json[0] === '[') return 'array';
    if (json[0] === '{') return 'object';
    if (json[0] === '"') return 'string';
    else return 'defualt';
  };

  var splitter = function(inner) {
    var chars = inner.split('');
    var inQuotes = false;
    var inArary = false;
    var inObject = false;
    var elements = [];
    var holder = '';

    for (var i = 0; i < chars.length; i++) {
      if (chars[i] === '[') {
        inArray = true;
      } else if (chars[i] === ']') {
        inArray = false;
      } else if (chars[i] === '{') {
        inObject = true;
      } else if (chars[i] === '}') {
        inObject = false;
      } else if (chars[i] === '"') {
        inQuotes = !inQuotes;
      } else if (chars[i] === ',') {
        elements.push(holder);
        holder = '';
      } else {
        holder += chars[i];
      }
    }
    return elements;
  }

  var result;

  if (type() === 'array') {
    var inner = json.slice(1, json.length -1);
    console.log(inner);
    result = [];
    
    if (inner.length > 0) {
      splitter(inner).forEach(x => result.push(parseJSON(x)));
    }
    
    return result;
  } else if (type === 'string') {
    var inner = json.slice(1, json.length -1);
    return parseJSON(inner);
  } else if (type === 'default') {
    if (json === 'null') {
      return null;
    } else if (json === 'true') {
      return true;
    } else if (json === 'false') {
      return false;
    }
  }

  
};
