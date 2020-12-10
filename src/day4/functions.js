const fs = require('fs');
const fieldKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split(/\n{2}/)
      .map(input => {
        const fields = input.split(/[\s]/);
        let passport = {};
        fields.forEach(field => {
          const temp = field.split(":");
          passport[temp[0]] = temp[1].trim();
        })
        return passport;
      });
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

const validFieldsRequired = (passport) => {
  let isValid = true
  fieldKeys.forEach(key => {
    if (!passport.hasOwnProperty(key)) {
      isValid =  false;
    }
  })
  return isValid;
}

const part1 = (inputs) => {
  let count = 0;
  inputs.forEach(passport => {
    if(validFieldsRequired(passport)) count++
  })
  return count;
}

//Birthday validation
const validByr = (byr) => {
  const birthday = parseInt(byr);
  return (birthday >= 1920 && birthday <= 2002)
}

//Issue year validation
const validIyr = (iyr) => {
  const issueYear = parseInt(iyr);
  return (issueYear >= 2010 && issueYear <= 2020)
}

//Expiration year validation
const validEyr = (eyr) => {
  const expirationYear = parseInt(eyr);
  return (expirationYear >= 2020 && expirationYear <= 2030)
}

//Height validation
const validHgt = (hgt) => {
  const unit = hgt.substring(hgt.length -2, hgt.length);
  const height = parseInt(hgt);
  if( unit === "in" )
    return (height >= 59 && height <= 76);
  else if( unit === "cm")
    return (height >= 150 && height <= 193);
}

//Hair color validation
const validHcl = (hcl) => {
  return (hcl.length === 7 && hcl.match(/#[0-9a-f]{6}/))? true: false;
}

//Eye color validation
const validEcl = (ecl) => {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl);
}

//Passport ID validation
const validPid = (pid) => {
  return (pid.length === 9 && pid.match(/[0-9]{9}/))? true:false;
}

const part2 = (inputs) => {
  let count = 0;
  inputs.forEach(passport => {
    if (validFieldsRequired(passport)) {
      let isValid = true;
      for(const [key, value] of Object.entries(passport)) {
        switch (key) {
          case  "byr":{
            if(!validByr(value))
              isValid = false;
            break;
          }
          case  "iyr":{
            if (!validIyr(value))
              isValid = false;
            break;
          }
          case  "eyr":{
            if (!validEyr(value))
              isValid = false;
            break;
          }
          case  "hgt":{
            if (!validHgt(value))
              isValid = false;
            break;
          }
          case  "hcl":{
            if (!validHcl(value))
              isValid = false;
            break;
          }
          case  "ecl":{
            if (!validEcl(value))
              isValid = false;
            break;
          }
          case  "pid":{
            if (!validPid(value))
              isValid = false;
            break;
          }
        }
      }
      if(isValid) count++;
    } 
  })
  return count;
} 


module.exports = {
  readInput, 
  validByr,
  validIyr,
  validEyr,
  validHgt,
  validHcl,
  validEcl,
  validPid,
  part1, 
  part2 }