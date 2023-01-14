const obj = null
function ObserverList() {
  this.Update = function (context) {
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

ObserverList.prototype.IndexOf = function (obj, startIndex) {
  var i = startIndex,
    pointer = -1

  while (i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      pointer = i
    }
  }
  i++

  while (i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      pointer = i
    }
    i++
  }

  return pointer
}

ObserverList.prototype.RemoveIndexAt = function (index) {
  if (index === 0) {
    this.observerList.shift()
  } else if (index === this.observerList.length - 1) {
    this.observerList.pop()
  }
}

// Extend an object with an extension
function extend(extension, obj) {
  console.log(extension)
  for (var key in extension) {
    console.log(extension[key])
    obj[key] = extension[key]
  }
}

function Subject() {
  this.observers = new ObserverList()
}

Subject.prototype.AddObserver = function (observer) {
  this.observers.Add(observer)
}

Subject.prototype.RemoveObserver = function (observer) {
  this.observers.RemoveAt(this.observers.IndexOf(observer, 0))
}

Subject.prototype.Notify = function (context) {
  let observerCount = this.observers.Count()
  for (let i = 0; i < observerCount; i++) {
    this.observers.Get(i).Update(context)
  }
}

let controlCheckbox = document.getElementById("mainCheckbox")
let addBtn = document.getElementById("addNewObserver")
let container = document.getElementById("observersContainer")

extend(new Subject().observers, controlCheckbox)

controlCheckbox["onclick"] = new Function(
  "controlChekbox.Notify(controlCheckbox.checked)"
)

addBtn["onclick"] = AddNewObserver

function AddNewObserver() {
  let check = document.createElement("input")
  check.type = "checkbox"

  extend(new Observer(), check)

  check.Update = function (value) {
    this.checked = value
  }

  controlCheckbox.AddObserver(check)
  container.appendChild(check)
}
