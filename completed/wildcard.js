const wildcard = (str) => {
  //get pattern & password
  let [pattern, password] = str.split(" "); 
  
  let i_pass = 0;
  let i_pattern = 0;

  //loop until the end of password
  while(i_pass < password.length) {
    let char_pattern = pattern[i_pattern];
    let char_pass = password[i_pass];
    
    switch (char_pattern) {
      case "+":
        if(!char_pass.match(/[a-zA-Z]/)) return false;
        i_pass++;
        i_pattern++;
        break;

      case "$":
        if(!Number(char_pass)) return false;
        i_pass++;
        i_pattern++;
        break;

      case "*": //for *
        let numOfRepeat = 3;
        if(pattern[i_pattern + 1] === "{") { //if repeated num provided
          numOfRepeat = Number(pattern[i_pattern + 2]);
          i_pattern += 4;
        } else { //if repeated num not provided === 3
          i_pattern += 1;
        }
        
        //check if there is given number of repeated character
        let repeatedChar = password.slice(i_pass, i_pass + numOfRepeat);
        let firstChar = repeatedChar[0];
        if(repeatedChar !== firstChar.repeat(numOfRepeat)) return false;
        i_pass += numOfRepeat;
        break;

      default:
        return false;
    }
  }

  return true;
}

console.log(wildcard("$**+*{2} 9mmmrrrkbb"))