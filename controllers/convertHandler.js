function ConvertHandler() {
  
  this.fromUnit = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
  this.toUnit = ['l', 'gal', 'kg', 'lbs', 'km', 'mi'];
  this.spellingUnit = ['gallons', 'liters', 'pounds', 'kilograms', 'miles', 'kilometers'];
  this.multiplicatorUnit = [3.78541, 0,264172, 0.453592, 2,20462, 1.60934, 0,621371];
  
  /*
   * Return first letter of input
   */
  this.getFirstCharacter = function(input) {
    return input.match(/[a-z]/i);
  }
  
  /*
   * Return num of input, or 1 by default
   */
  this.getNum = function(input) {
    // get first character, if nothing is provided it will default to 1
    var firstCharacter = this.getFirstCharacter(input);
    if (!firstCharacter) {
      return 1;
    }
    // get num string
    var numString = input.substring(0, firstCharacter.index);
    // calculate num and return result
    return this.calculateNum(numString);
  };
  
  /*
   * Calculate num depending on num string
   */
  this.calculateNum = function(numString) {
    // if nothing is provided it will default to 1
    if (!numString.length)
    {
      return 1;
    }
    // authorize / character for division, but only once
    var slashes = numString.match(/[/]/g);
    if (slashes && slashes.length > 1) {
      return false;
    }
    return eval(numString);
  }
  
  /*
   * Return unit of input
   */
  this.getUnit = function(input) {
    // get first character, check if nothing is provided
    var firstCharacter = this.getFirstCharacter(input);
    if (!firstCharacter) {
      return false;
    }
    // get unit, check if unit is not in valid unit list
    var unit = input.substring(firstCharacter.index);
    if (!this.isValidUnit(unit)) {
      return false;
    }
    return input.substring(firstCharacter.index);
  };
  
  /*
   * Test if unit is valid
   */
  this.isValidUnit = function(unit) {
    // list of valid units
    return this.fromUnit.includes(unit);
  }
  
  /*
   * Get error message after initialization
   */
  this.getInitError = function(initNum, initUnit) {
    var initError;
    
    // get error message depending on false values foreach func param
    if (initNum === false && initUnit === false) {
      initError = 'invalid number and unit';
    } else if (initNum === false) {
      initError = 'invalid number';
    } else if (initUnit === false){
      initError = 'invalid unit';
    }
    
    return initError;
  }
  
  /*
   * Return return unit of input, by init unit
   */
  this.getReturnUnit = function(initUnit) {
    var returnUnit;
    
    var index = this.fromUnit.indexOf(initUnit);
    if (index > 0)
    {
        returnUnit = this.toUnit[index];
    }
    
    return returnUnit;
  };

  /*
   * Spell out unit, by unit
   */
  this.spellOutUnit = function(unit) {
    var spellOutUnit;
    
    var index = this.fromUnit.indexOf(unit);
    if (index > 0)
    {
        spellOutUnit = this.spellingUnit[index];
    }
    
    return spellOutUnit;
  };
  
  /*
   * Convert value by num and unit
   */
  this.convert = function(initNum, initUnit) {
    var result;
    var multiplicator;
    
    var index = this.fromUnit.indexOf(initUnit);
    if (index > 0)
    {
        result = (initNum * this.multiplicatorUnit[index]).toFixed(5);
    }
    
    return result;
  };
  
  /*
   * Get conversion string
   */
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    returnNum = returnNum;
    
    var spellOutInitUnit = this.spellOutUnit(initUnit);
    var spellOutReturnUnit = this.spellOutUnit(returnUnit);
    
    return initNum + ' ' + spellOutInitUnit + ' converts to ' + returnNum + ' ' + spellOutReturnUnit;
  };
}

module.exports = ConvertHandler;