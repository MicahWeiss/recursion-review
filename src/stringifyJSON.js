// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if (Array.isArray(obj)) {
    //console.log('array', obj);
    var output = '['  ;
    for(var i =0; i < obj.length ; i++){
      output+= stringifyJSON(obj[i]);
      if(i < obj.length - 1){
        output += ','
      }
    }
    output += ']'
    return output;
  } else if ([NaN, null, Infinity].includes(obj)) {
    return 'null';

  } else if (typeof obj === 'object') {
    var output = '{';
    var keyArray = Object.keys(obj);
    for(var i =0; i < keyArray.length ; i++){
      if(keyArray[i] === 'undefined' || keyArray[i] === 'functions' ){
        output += '';
      }
      else {
        output+= '"' + keyArray[i] + '":' + stringifyJSON(obj[keyArray[i]]);
        if(i < keyArray.length - 1){ //method does not support multile undefined
          output += ',';
        }
      }
    }
    output += '}';
    return output;

  }else if (typeof obj === 'string') {
    //console.log('string', obj);
    return '"' + obj + '"';
  } else if(typeof obj === 'function' || typeof obj === 'undefined'){
    //console.log('skip', obj);
    return '';
  } else {//primitive
    //console.log('primitive', obj)
    return String(obj);
  }
};
