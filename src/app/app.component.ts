import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, ReactiveFormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'reactive';
  totalQuantity: number = 0;
  totalMoney: number = 0;
  isEmpty: boolean = true;

  constructor(public fb: FormBuilder) {}

  poGrp: FormGroup | undefined;

  ngOnInit(): void {
    this.poGrp = this.fb.group({
      row: this.fb.array([]),
    });
  }

  private getArrayGrp() {
    return this.fb.group({
      quantity: 0,
      unitRate: 0,
      total: 0,
    });
  }

  public getRows(): FormArray {
    return (<FormArray>this.poGrp?.get('row')) as FormArray;
  }

  handleAddRow() {
    this.poGrp?.get('row')?.value.push(this.getArrayGrp());
    this.isEmpty = false;
  }

  handleQty(change: string, index: number) {
    let toNum = parseInt(change);
    if (Number.isNaN(toNum)) {
      toNum = 0;
    }

    //updating quantity of index i
    if (this.poGrp && this.poGrp.get('row')) {
      const rowValue = this.poGrp.get('row')?.value[index];
      if (rowValue) {
        rowValue.value.quantity = toNum;
        rowValue.value.total =
          rowValue.value.quantity * rowValue.value.unitRate;
      }
    }

    //update the total quantity
    this.totalQuantity = 0;
    this.poGrp?.get('row')?.value.map((row: any) => {
      this.totalQuantity += row.value.quantity;
    });

    //update the total totalMoney
    this.totalMoney = 0;
    this.poGrp?.get('row')?.value.map((row: any) => {
      this.totalMoney += row.value.total;
    });
    
  }

  handleRate(change: string, index: number) {
    let toNum = parseInt(change);
    if (Number.isNaN(toNum)) {
      toNum = 0;
    }

    //updating quantity of index i
    if (this.poGrp && this.poGrp.get('row')) {
      const rowValue = this.poGrp.get('row')?.value[index];
      if (rowValue) {
        rowValue.value.unitRate = toNum;
        rowValue.value.total =
          rowValue.value.quantity * rowValue.value.unitRate;
      }
    }

    //update the total totalMoney
    this.totalMoney = 0;
    this.poGrp?.get('row')?.value.map((row: any) => {
      this.totalMoney += row.value.total;
    });
  }

  handleDelete(index: number) {
    this.poGrp?.get('row')?.value.splice(index, 1);

    //update totalMoney
    this.totalMoney = 0;
    this.poGrp?.get('row')?.value.map((row: any) => {
      this.totalMoney += row.value.total;
    });

    //update total Quantity
    this.totalQuantity = 0;
    this.poGrp?.get('row')?.value.map((row: any) => {
      this.totalQuantity += row.value.quantity;
    });

    if (this.poGrp?.get('row')?.value.length === 0) {
      this.isEmpty = true;
    }
  }
}
