(function(){
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

module.exports = function(father, son){
    var fatherCopy = Object.create(father.prototype);
    son.prototype = fatherCopy;  
    son.prototype.constructor = son;
}
}())