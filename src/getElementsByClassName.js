// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  var output = [];
  node = document.body;

  var recursiveGEBCN = function(node, className){
    //check the node
    if(node.classList !== undefined){
      if(node.classList.contains(className)){
   //add node to output if tag is present
        //console.log('match',node);
        output.push(node);
      }
    }
    //call function on all children
    for(var i=0; i < node.childNodes.length; i++){
      recursiveGEBCN(node.childNodes[i], className);
    }     
  }

  recursiveGEBCN (node, className);

  return output;
};
