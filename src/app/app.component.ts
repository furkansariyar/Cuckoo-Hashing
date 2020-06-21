import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cuckoo-Hashing';

  nTable = 2;
  nCells = 10;
  
  dataRaw: any;
  data: any;
  allData = [];
  rehashFlag = 1;
  searchValue: any;
  deleteValue: any;
  deleteFlag = false;
  collisionFlag = false;
  collision = 0;

  constructor() { }

  ngOnInit(): void {
    this.dataRaw = this.generateArray(this.nTable, this.nCells);
    this.data = JSON.stringify(this.dataRaw);
  }

  // update number of tables and number of cells in each table
  updateTable() {
    var newNTable = parseFloat(document.getElementsByTagName("input")[0].value);
    var newNCells = parseFloat(document.getElementsByTagName("input")[1].value);
    if(newNTable >= 2 && newNTable <= 5) {
      this.nTable = newNTable;
    }
    else if (newNTable < 2 || newNTable > 5) {
      alert("The number of tables can be min 2 and max 5")
    }
    if(newNCells >= 10 && newNCells <= 30) {
      this.nCells = newNCells;
    }
    else if(newNCells < 10 || newNCells > 30) {
      alert("The number of rows in a table can be min 10 and max 30")
    }
    this.dataRaw = this.generateArray(this.nTable, this.nCells);
    this.data = JSON.stringify(this.dataRaw);
    this.allData = [];
    this.collisionFlag = false;
  }

  insertNewData() {
    var value = document.getElementsByTagName("input")[2].value;
    console.log(value);
    if (value.length <= 0) {
      alert("The value cannot be empty!");
    }
    else {
      var hasTheValue = false; 
      this.allData.forEach(element => {
        if (element == value) {
          hasTheValue = true;
        }
      });
      if (!hasTheValue) {
        this.insert(value);
      } else {
        alert("The value is already inserted!");
      }
    }
  }

  insert(value) {
    var tableIndex = 0;
    var returnHashing;
    this.collision = 0;
    this.allData.push(value);

    while(true) {
      // different hashing method is used for each hash table
      switch(tableIndex) { 
        case 0: { 
          if (this.rehashFlag == 1) {
            returnHashing = this.linearHashing(value, this.dataRaw[tableIndex], this.collision); 
          } 
          else if (this.rehashFlag == 2) {
            returnHashing = this.doubleHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else if (this.rehashFlag == 3) {
            returnHashing = this.quadraticHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else if (this.rehashFlag == 4) {
            returnHashing = this.digitFoldingHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else {
            returnHashing = this.midSquareHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          break; 
        } 
        case 1: { 
          if (this.rehashFlag == 1) {
            returnHashing = this.doubleHashing(value, this.dataRaw[tableIndex], this.collision);
          } 
          else if (this.rehashFlag == 2) {
            returnHashing = this.quadraticHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else if (this.rehashFlag == 3) {
            returnHashing = this.digitFoldingHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else if (this.rehashFlag == 4) {
            returnHashing = this.midSquareHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else {
            returnHashing = this.linearHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          break; 
        }
        case 2: { 
          if (this.rehashFlag == 1) {
            returnHashing = this.quadraticHashing(value, this.dataRaw[tableIndex], this.collision); 
          } 
          else if (this.rehashFlag == 2) {
            returnHashing = this.digitFoldingHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else if (this.rehashFlag == 3) {
            returnHashing = this.midSquareHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else if (this.rehashFlag == 4) {
            returnHashing = this.linearHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else {
            returnHashing = this.doubleHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          break; 
        } 
        case 3: { 
          if (this.rehashFlag == 1) {
            returnHashing = this.digitFoldingHashing(value, this.dataRaw[tableIndex], this.collision);
          } 
          else if (this.rehashFlag == 2) {
            returnHashing = this.midSquareHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else if (this.rehashFlag == 3) {
            returnHashing = this.linearHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else if (this.rehashFlag == 4) {
            returnHashing = this.doubleHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else {
            returnHashing = this.quadraticHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          break; 
        }
        case 4: { 
          if (this.rehashFlag == 1) {
            returnHashing = this.midSquareHashing(value, this.dataRaw[tableIndex], this.collision);
          } 
          else if (this.rehashFlag == 2) {
            returnHashing = this.linearHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else if (this.rehashFlag == 3) {
            returnHashing = this.doubleHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else if (this.rehashFlag == 4) {
            returnHashing = this.quadraticHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          else {
            returnHashing = this.digitFoldingHashing(value, this.dataRaw[tableIndex], this.collision);
          }
          break; 
        }
     }

      if (!returnHashing.flag) {
        this.dataRaw[tableIndex] = returnHashing.table;
        this.data = JSON.stringify(this.dataRaw);   
        break;
      }
      else {
        this.collision = this.collision + 1;
        this.collisionFlag = true;
        console.log("COLLISION ", this.collision);
        this.dataRaw[tableIndex] = returnHashing.table;
        this.data = JSON.stringify(this.dataRaw);
        value = returnHashing.allocatedData;
        console.log(value);
      }

      tableIndex = tableIndex + 1;
      if (tableIndex >= this.nTable) {
        tableIndex = 0;
      }

      if (this.collision >= (this.nTable*this.nTable + this.nTable)) {
        this.rehash();
        break;
      }
    }
    
  }

  rehash() {
    setTimeout(() => {
      this.updateTable();
      alert("Rehash detected!");
    }, 1000);
  }

  // Rehashing
  /* rehash() {
    console.log("REHASH"); 
    var allData = this.allData;
    this.allData = [];
    this.updateTable();
    this.rehashFlag = this.rehashFlag + 1;
    console.log(allData);
    allData.forEach(element => {
      this.insert(element);
      console.log(element);
    });
  } */

  search() {
    this.searchValue = document.getElementsByTagName("input")[3].value;
    if (this.searchValue.length <= 0) {
      alert("The value cannot be empty!");
    }
    else {
      this.deleteFlag = false;
      this.searchAndDelete(this.searchValue);
    }
  }

  delete() {
    this.deleteValue = document.getElementsByTagName("input")[4].value;
    if (this.searchValue.length <= 0) {
      alert("The value cannot be empty!");
    }
    else {
      this.deleteFlag = true;
      this.searchAndDelete(this.deleteValue);
    }
  }

  searchAndDelete(value) {
    console.log(this.dataRaw);
    console.log(this.rehashFlag);
    console.log(value);
    var tableIndex = 0;
    var returnHashing; 
    var collision = 0;

    while(true) {
      // different hashing method is used for each hash table
      switch(tableIndex) { 
        case 0: { 
          if (this.rehashFlag == 1) {
            returnHashing = this.searchLinearHashing(value, this.dataRaw[tableIndex], collision); 
          } 
          else if (this.rehashFlag == 2) {
            returnHashing = this.searchDoubleHashing(value, this.dataRaw[tableIndex], collision);
          }
          else if (this.rehashFlag == 3) {
            returnHashing = this.searchQuadraticHashing(value, this.dataRaw[tableIndex], collision);
          }
          else if(this.rehashFlag == 4) {
            returnHashing = this.searchDigitalFoldingHashing(value, this.dataRaw[tableIndex], collision);
          }
          else {
            returnHashing = this.searchMidSquareHashing(value, this.dataRaw[tableIndex], collision);
          }
          break; 
        } 
        case 1: { 
          if (this.rehashFlag == 1) {
            returnHashing = this.searchDoubleHashing(value, this.dataRaw[tableIndex], collision);
          } 
          else if (this.rehashFlag == 2) {
            returnHashing = this.searchQuadraticHashing(value, this.dataRaw[tableIndex], collision);
          }
          else if (this.rehashFlag == 3) {
            returnHashing = this.searchDigitalFoldingHashing(value, this.dataRaw[tableIndex], collision);
          }
          else if(this.rehashFlag == 4) {
            returnHashing = this.searchMidSquareHashing(value, this.dataRaw[tableIndex], collision);
          }
          else {
            returnHashing = this.searchLinearHashing(value, this.dataRaw[tableIndex], collision);
          }
          break; 
        }
        case 2: { 
          if (this.rehashFlag == 1) {
            returnHashing = this.searchQuadraticHashing(value, this.dataRaw[tableIndex], collision); 
          } 
          else if (this.rehashFlag == 2) {
            returnHashing = this.searchDigitalFoldingHashing(value, this.dataRaw[tableIndex], collision);
          }
          else if (this.rehashFlag == 3) {
            returnHashing = this.searchMidSquareHashing(value, this.dataRaw[tableIndex], collision);
          }
          else if(this.rehashFlag == 4) {
            returnHashing = this.searchLinearHashing(value, this.dataRaw[tableIndex], collision);
          }
          else {
            returnHashing = this.searchDoubleHashing(value, this.dataRaw[tableIndex], collision);
          }
          break; 
        } 
        case 3: { 
          if (this.rehashFlag == 1) {
            returnHashing = this.searchDigitalFoldingHashing(value, this.dataRaw[tableIndex], collision);
          } 
          else if (this.rehashFlag == 2) {
            returnHashing = this.searchMidSquareHashing(value, this.dataRaw[tableIndex], collision);
          }
          else if (this.rehashFlag == 3) {
            returnHashing = this.searchLinearHashing(value, this.dataRaw[tableIndex], collision);
          }
          else if(this.rehashFlag == 4) {
            returnHashing = this.searchDoubleHashing(value, this.dataRaw[tableIndex], collision);
          }
          else {
            returnHashing = this.searchQuadraticHashing(value, this.dataRaw[tableIndex], collision);
          }
          break; 
        }
        case 4: { 
          if (this.rehashFlag == 1) {
            returnHashing = this.searchMidSquareHashing(value, this.dataRaw[tableIndex], collision);
          } 
          else if (this.rehashFlag == 2) {
            returnHashing = this.searchLinearHashing(value, this.dataRaw[tableIndex], collision);
          }
          else if (this.rehashFlag == 3) {
            returnHashing = this.searchDoubleHashing(value, this.dataRaw[tableIndex], collision);
          }
          else if(this.rehashFlag == 4) {
            returnHashing = this.searchQuadraticHashing(value, this.dataRaw[tableIndex], collision);
          }
          else {
            returnHashing = this.searchDigitalFoldingHashing(value, this.dataRaw[tableIndex], collision);
          }
          break; 
        }
      }

      if (this.deleteFlag) {  // this part is for delete
        if (returnHashing.isFound) {
          var table = tableIndex+1;
          var cell = returnHashing.dataCell+1
          this.dataRaw[tableIndex] = returnHashing.table;
          this.data = JSON.stringify(this.dataRaw);
          console.log(this.data);
          const index: number = this.allData.indexOf(value);
          if (index !== -1) {
              this.allData.splice(index, 1);
          } 
          console.log(this.data);
          alert(value + " is found in T" + table + " cell: " + cell + "\nIt is deleted!");
          break;
        }
        else if (returnHashing.noDataFlag) {
          alert(value + " is not found!");
          break;
        }
        else {
          tableIndex = tableIndex + 1;
          collision = collision + 1;
          if (tableIndex >= this.nTable) {
            alert(value + " is not found!");
            break;
          }
        }
      } 
      else { // this part is for search
        if (returnHashing.isFound) {
          var table = tableIndex+1;
          var cell = returnHashing.dataCell+1
          alert(value + " is found in T" + table + " cell: " + cell);
          break;
        }
        else if (returnHashing.noDataFlag) {
          alert(value + " is not found!");
          break;
        }
        else {
          tableIndex = tableIndex + 1;
          collision = collision + 1;
          if (tableIndex >= this.nTable) {
            alert(value + " is not found!");
            break;
          }
        }
      }
      
    }
  }

  // Generate empty array
  generateArray(nTable:number, nCells:number) {
    var arr = [];
    for (var i = 1; i <= nTable; i++) {
      var innerArr = [];
      for (var j = 1; j <= nCells; j++) {
        innerArr.push("_");
      }
      arr.push(innerArr);
    }
    return arr;
  }

  // Get ASCII value for each character in the input and sum them all
  sumUpString(value) {
    var sum = 0;
    for (var i = 0; i < value.length; i++) {
      console.log(value.charCodeAt(i));
      sum = sum + value.charCodeAt(i);
    }
    return sum;
  }

  // linear hashing function
  linearHashing(newData, hashTable, collision) {
    var sum = this.sumUpString(newData);
    var modulus = sum%this.nCells;
    var isAllocated;
    var allocatedData;
    if(hashTable[modulus] == "_" || hashTable[modulus] == "_ ") {
      isAllocated = false;
      hashTable[modulus] = newData;
    }
    else {
      isAllocated = true;
      allocatedData = hashTable[modulus];
      hashTable[modulus] = newData;
    }
    return {table: hashTable, flag: isAllocated, allocatedData: allocatedData};
  }

  searchLinearHashing(value, hashTable, collision) {
    var sum = this.sumUpString(value);
    var modulus = sum%this.nCells;
    var isAllocated;
    var allocatedData;
    var isFound = false;
    var noDataFlag = false;
    var cell;
    if(hashTable[modulus] == "_") {
      noDataFlag = true;
    }
    else if (hashTable[modulus] != value || hashTable[modulus] == "_ ") {
      isAllocated = true;
      allocatedData = hashTable[modulus];
      if (hashTable[modulus] == "_ ") {
        allocatedData = value;
      }
    }
    else {
      isFound = true;
      cell = modulus;
      if (this.deleteFlag) {
        hashTable[modulus] = "_ ";
      }
    }
    return {table: hashTable, isFound: isFound, noDataFlag: noDataFlag, dataCell: cell};
  }

  // Quadratic Hashing
  quadraticHashing(newData, hashTable, collision) {
    var c1 = 0;
    var c2 = 1;
    var sum = this.sumUpString(newData);
    var modulus = (sum + c1*collision + c2*Math.pow(collision,2)) % this.nCells;
    var isAllocated;
    var allocatedData;
    if(hashTable[modulus] == "_" || hashTable[modulus] == "_ ") {
      isAllocated = false;
      hashTable[modulus] = newData;
    }
    else {
      isAllocated = true;
      allocatedData = hashTable[modulus];
      hashTable[modulus] = newData;
    }
    return {table: hashTable, flag: isAllocated, allocatedData: allocatedData};
  }

  searchQuadraticHashing(value, hashTable, collision) {
    var c1 = 0;
    var c2 = 1;
    var sum = this.sumUpString(value);
    var modulus = (sum + c1*collision + c2*Math.pow(collision,2)) % this.nCells;
    var isAllocated;
    var allocatedData;
    var isFound = false;
    var noDataFlag = false;
    var cell;
    if(hashTable[modulus] == "_") {
      noDataFlag = true;
    }
    else if (hashTable[modulus] != value || hashTable[modulus] == "_ ") {
      isAllocated = true;
      allocatedData = hashTable[modulus];
      if (hashTable[modulus] == "_ ") {
        allocatedData = value;
      }
    }
    else {
      isFound = true;
      cell = modulus;
      if (this.deleteFlag) {
        hashTable[modulus] = "_ ";
      }
    }
    return {table: hashTable, isFound: isFound, noDataFlag: noDataFlag, dataCell: cell};
  }

  // double hashing function
  doubleHashing(newData, hashTable, collision) {
    var sum = this.sumUpString(newData);
    var isAllocated;
    var allocatedData;
    var modulus = sum%this.nCells;
    var R = this.getPrime(hashTable.length);
    var modulusH2 = sum%R;
    modulus = (modulus + collision*(R - modulusH2))%this.nCells;
    if(hashTable[modulus] == "_" || hashTable[modulus] == "_ ") {
      hashTable[modulus] = newData;
      isAllocated = false;
    }
    else {
      isAllocated = true;
      allocatedData = hashTable[modulus];
      hashTable[modulus] = newData;
    }
    return {table: hashTable, flag: isAllocated, allocatedData: allocatedData};
  }

  searchDoubleHashing(value, hashTable, collision) {
    var sum = this.sumUpString(value);
    var modulus = sum%this.nCells;
    var R = this.getPrime(hashTable.length);
    var modulusH2 = sum%R;
    modulus = (modulus + collision*(R - modulusH2))%this.nCells;
    var isAllocated;
    var allocatedData;
    var isFound = false;
    var noDataFlag = false;
    var cell;
    if(hashTable[modulus] == "_") {
      noDataFlag = true;
    }
    else if (hashTable[modulus] != value || hashTable[modulus] == "_ ") {
      isAllocated = true;
      allocatedData = hashTable[modulus];
      if (hashTable[modulus] == "_ ") {
        allocatedData = value;
      }
    }
    else {
      isFound = true;
      cell = modulus;
      if (this.deleteFlag) {
        hashTable[modulus] = "_ ";
      }
    }
    return {table: hashTable, isFound: isFound, noDataFlag: noDataFlag, dataCell: cell};
  }

  // this method adds the digit of the newData and takes its mod. The result is the index that will be used to insertion.
  digitFoldingHashing(newData, hashTable, collision){
    var sumStr = this.sumUpString(newData);
    var isAllocated;
    var allocatedData;
    var sum = 0;
    var num = sumStr;
    while(num != 0) {
      sum = sum + (num%10);
      num = Math.floor(num/10);
    }
    num = sum%this.nCells;
    if(hashTable[num] == "_" || hashTable[num] == "_ ") {
      hashTable[num] = newData;
      isAllocated = false;
    }
    else {
      isAllocated = true;
      allocatedData = hashTable[num];
      hashTable[num] = newData;
    }
    return {table: hashTable, flag: isAllocated, allocatedData: allocatedData};
  }

  searchDigitalFoldingHashing(value, hashTable, collision) {
    var sumStr = this.sumUpString(value);
    var isAllocated;
    var allocatedData;
    var isFound = false;
    var sum = 0;
    var num = sumStr;
    var noDataFlag = false;
    var cell;
    while(num != 0) {
      sum = sum + (num%10);
      num = Math.floor(num/10);
    }
    num = sum%this.nCells;

    if(hashTable[num] == "_") {
      noDataFlag = true;
    }
    else if (hashTable[num] != value || hashTable[num] == "_ ") {
      isAllocated = true;
      allocatedData = hashTable[num];
      if (hashTable[num] == "_ ") {
        allocatedData = value;
      }
    }
    else {
      isFound = true;
      cell = num;
      if (this.deleteFlag) {
        hashTable[num] = "_ ";
      }
    }
    return {table: hashTable, isFound: isFound, noDataFlag: noDataFlag, dataCell: cell};
  }

  midSquareHashing(value, hashTable, collision) {
    var sumStr = this.sumUpString(value);
    var isAllocated;
    var allocatedData;
    var num = sumStr*sumStr;
    var digits = [];
    var mid = 0;
    while(num != 0) {
      digits.push(num%10);
      num = Math.floor(num/10);
    }
    // There are even number of digits
    if (digits.length%2 == 0) {
      mid = digits[digits.length/2 - 1];
      mid = 10*mid + digits[digits.length/2]
      mid = mid%this.nCells;
    }
    // There are odd number of digits
    else {
      mid = digits[Math.floor(digits.length/2)];
    }
    // Insertion
    if(hashTable[mid] == "_" || hashTable[mid] == "_ ") {
      isAllocated = false;
      hashTable[mid] = value;
    }
    else {
      isAllocated = true;
      allocatedData = hashTable[mid];
      hashTable[mid] = value;
    }
    return {table: hashTable, flag: isAllocated, allocatedData: allocatedData};
  }

  searchMidSquareHashing(value, hashTable, collision) {
    var sumStr = this.sumUpString(value);
    var isAllocated;
    var allocatedData;
    var num = sumStr*sumStr;
    var digits = [];
    var mid = 0;
    var isFound = false;
    var noDataFlag = false;
    var cell;
    while(num != 0) {
      digits.push(num%10);
      num = Math.floor(num/10);
    }
    // There are even number of digits
    if (digits.length%2 == 0) {
      mid = digits[digits.length/2 - 1];
      mid = 10*mid + digits[digits.length/2]
      mid = mid%this.nCells;
    }
    // There are odd number of digits
    else {
      mid = digits[Math.floor(digits.length/2)];
    }

    if(hashTable[mid] == "_") {
      noDataFlag = true;
    }
    else if (hashTable[mid] != value || hashTable[mid] == "_ ") {
      isAllocated = true;
      allocatedData = hashTable[mid];
      if (hashTable[mid] == "_ ") {
        allocatedData = value;
      }
    }
    else {
      isFound = true;
      cell = mid;
      if (this.deleteFlag) {
        hashTable[mid] = "_ ";
      }
    }
    return {table: hashTable, isFound: isFound, noDataFlag: noDataFlag, dataCell: cell};
  }

  getPrime(limit) {
    var R:any;
    for (let index = limit-1; index >= 2; index--) {
      R = this.isPrime(index);
      if(R != false) {
        return R;
      }
    }
  }

  isPrime(num) {
    for(var i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num;
  }

}
