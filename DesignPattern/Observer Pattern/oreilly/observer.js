function ObserverList() {
  this.Update = function(context){
    console.log(context + "업데이트 되었다.")
  }
  this.ObserverList = []
}

ObserverList.prototype.Add = function (obj) {
  return this.ObserverList.push(obj)
}

ObserverList.prototype.Empty = function () {
  this.ObserverList = []
}

ObserverList.prototype.Count = function () {
  return this.ObserverList.length
}

ObserverList.prototype.Get = function (index) {
  if (index > -1 && index < this.ObserverList.length) {
    return this.observerList[index]
  }
}

ObserverList.prototype.Insert = function (obj, index) {
  let pointer = -1

  if (index === 0) {
    this.observerList.unshift(obj)
    pointer = index
  } else if (index === this.observerList.length) {
    this.observerList.push(obj)
    pointer = index
  }

  return pointer
}

ObserverList.prototype.IndexOf = function( obj, startIndex ){
    var i = startIndex, pointer = -1;
  
    while( i < this.observerList.length ){
      if( this.observerList[i] === obj ){
        pointer = i;
      }
    }
  i++;

    while( i < this.observerList.length ){
      if( this.observerList[i] === obj ){
        pointer = i;
      }
      i++;
    }
  
    return pointer;
  };

ObserverList.prototype.RemoveIndexAt() = function( index ){
    if( index === 0 ){
      this.observerList.shift();
    }else if( index === this.observerList.length -1 ){
      this.observerList.pop();
    }
  };
  