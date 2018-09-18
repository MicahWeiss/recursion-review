
// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  var type = function(str) {
    if (str[0] === '[') return 'array';
    if (str[0] === '{') return 'object';
    if (str[0] === '"') return 'string';
    else return 'defualt';
  };

  var splitter = function(inner) { //returns element array
    var chars = inner.split('');
    var inQuotes;
    var depth = 0;
    var endChars = [];
    var elements = [];
    var holder = '';

    for (var i = 0; i < chars.length; i++) {
      if (chars[i] === '"') { //string
        holder += chars[i];
        inQuotes = !inQuotes;
      } else if (inQuotes){ //add to holder if still in quotes
        holder += chars[i];
      } else if(chars[i] === ' '){
        // do nothing
      } else if(chars[i] === '['){ // testing for nested array/object
        elements.push(holder);
        endChars.push(']');     
      } else if(chars[i] === '{'){
        elements.push(holder);
        endChars.push('}');
      }
      else if(chars[i] === endChars[endChars.length - 1]){ // encountered correct ] or }
        endChars.pop();
      }
  
      else if (chars[i] === ',' && endChars.length === 0) {// comma needs to push
        elements.push(holder);
        holder = '';
      } else {
        holder += chars[i]
      }
    }
    
    if(holder != ''){
      elements.push(holder); //end of inner needs a push
    }
    return elements;
  }

  var recursivePJ = function(input){
    console.log(input);
    if(type(input) === 'default'){
      if (input === 'null') {
        return null;
      } else if (input === 'true') {
        return true;
      } else if (input === 'false') {
        return false;
      } else {
        return str;
      }
    }
    if (type(input) === 'array') {
      console.log('^^ this is an array');
      var result = [];
      if (input.length > 2){ 
        var inner = input.slice(1, input.length -1);
        var componentArray = splitter(inner); 
        console.log('inner: ', inner);
        console.log('componentArray: ', componentArray)     
        if (componentArray.length > 0) {
          componentArray.forEach(x => result.push(recursivePJ(x)));
        }
      }
      return result; 
    }
  
    if (input.charAt(0) === '"'){
      return input.slice(1, input.length -1);
    }

    if (type(input) === 'object'){
      console.log('^^This is an object');
      var result = {};
      if(input.length > 2){
        var inner = input.slice(1, input.length -1);
        var componentKeys = splitter(inner);
        console.log('compnentKeys: ', componentKeys);
        for(var i =0; i < componentKeys.length; i++){
          var parts = componentKeys[i].split(':');
          result[parts[0]] = parts[1];
        }        
      }
      return result;
    }
  }

  return recursivePJ(json);

  
  /*if (type() === 'array') {
    var inner = json.slice(1, json.length -1);
    //console.log(inner);

    var elements = splitter(inner);
    //console.log('el:', elements);
    result = [];
    
    if (inner.length > 0) {
      elements.forEach(x => result.push(parseJSON(x)));
    }
    
    return result;
  } else if (type() === 'string') {
    return json.slice(1, json.length -1);
  } else if (type() === 'default') {
    if (json === 'null') {
      return null;
    } else if (json === 'true') {
      return true;
    } else if (json === 'false') {
      return false;
    } else {
      return json;
    }
  }*/

  
};
