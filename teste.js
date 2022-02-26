function func1(x, y) {
    if (y == 0) {return 0}
    else if (y == 1) {return x}
    else {
      return x + func1(x, y-1)
    }
  }
  
console.log(func1(14, 60))