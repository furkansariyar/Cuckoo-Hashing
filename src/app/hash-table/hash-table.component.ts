import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hash-table',
  templateUrl: './hash-table.component.html',
  styleUrls: ['./hash-table.component.scss']
})
export class HashTableComponent implements OnInit {
  //@Input() nCells: number;
  @Input() inpData: any;
  data: any;
  furkan = 1;
  obj: any;
  arr = [];
  loadFactors = [];

  constructor() { }

  ngOnChanges() {
    this.data = JSON.parse(this.inpData);
    console.log(this.data);
    this.genArray(this.data.length);
    this.updateLoadFactors();
  }

  ngOnInit(): void {
    //console.log(this.nCells);
    this.data = JSON.parse(this.inpData);
    console.log(this.data);
    this.genArray(this.data.length);
    this.updateLoadFactors();
  }

  genArray(size: number) {
    this.arr = [];
    for (let index = 0; index < size; index++) {
      this.arr.push(index);
    }
  }

  updateLoadFactors() {
    this.loadFactors = [];
    var numberOfFullCell = 0;
    for (let i = 0; i < this.data.length; i++) {
      numberOfFullCell = 0;
      for (let j = 0; j < this.data[i].length; j++) {
        if (this.data[i][j] != "_" && this.data[i][j] != "_ ") {
          numberOfFullCell = numberOfFullCell + 1;
        }
      }
      this.loadFactors.push(numberOfFullCell)
    }
  }


}
