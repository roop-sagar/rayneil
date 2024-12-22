import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-match-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './match-detail.component.html',
  styleUrl: './match-detail.component.css',
})
export class MatchDetailComponent implements OnInit {
  @Input() matchDataSource: any;

  tableForm!: FormGroup;
  originalValue: string = '';
  title: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initiaForm();
  }

  initiaForm(): void {
    this.tableForm = this.fb.group({
      rows: this.fb.array([]),
    });
  }

  get rows() {
    return this.tableForm.get('rows') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.matchDataSource?.length > 0) {
      this.title = `${this.matchDataSource[0].team1} vs ${this.matchDataSource[0].team2}`;
      this.initiaForm();
      this.matchDataSource[0].data.forEach((data: any) => {
        const row = this.fb.group({
          option: [{ value: data?.option || '', disabled: true }],
          radar: [{ value: data?.radar || 0, disabled: true }],
          falcon: [
            { value: data?.falcon || 0, disabled: data.head ? true : false },
          ],
          sinLimit: [
            { value: data?.sinLimit || 0, disabled: data.head ? true : false },
          ],
          sinBet: [
            { value: data?.sinBet || 0, disabled: data.head ? true : false },
          ],
          stake: [
            { value: data?.stake || 0, disabled: data.head ? true : false },
          ],
          multiRisk: [
            { value: data?.multiRisk || 0, disabled: data.head ? true : false },
          ],
          pandl: [
            { value: data?.pandl || 0, disabled: data.head ? true : false },
          ],
          head: [data?.head || false],
          progress: [data?.progress || 0],
        });
        this.rows.push(row);
      });
    } else {
      this.title = '';
    }
  }

  onKeyDown(event: KeyboardEvent, rowIndex: number, controlName: string): void {
    const inputElement = event.target as HTMLInputElement;
    if (event.key === 'ArrowDown' || event.key === 'Enter') {
      event.preventDefault();
      const nextRow = this.rows.controls[rowIndex + 1];

      if (nextRow) {
        const nextInput = document.querySelector(
          `tr:nth-child(${
            nextRow.value.head ? rowIndex + 3 : rowIndex + 2
          }) input[formControlName="${controlName}"]`
        ) as HTMLElement;
        nextInput?.focus();
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevRow = this.rows.controls[rowIndex - 1];
      if (prevRow) {
        const prevInput = document.querySelector(
          `tr:nth-child(${
            prevRow.value.head ? rowIndex - 1 : rowIndex
          }) input[formControlName="${controlName}"]`
        ) as HTMLElement;
        prevInput?.focus();
      }
    }
  }

  onFocus(event: FocusEvent, rowIndex: number, controlName: string): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.style.background = ``;
    inputElement.style.backgroundColor = `#e3a404`;
    if (controlName == 'sinLimit') {
      this.originalValue = inputElement.value;
      inputElement.value = this.rows.controls[rowIndex].value['progress'];
    }
    inputElement.select();
  }

  onFocusOut(event: FocusEvent, rowIndex: number, controlName: string): void {
    const inputElement = event.target as HTMLInputElement;
    if (controlName == 'sinLimit') {
      this.rows.at(rowIndex).patchValue({ progress: inputElement.value });
      const percent = (+this.originalValue / +inputElement.value) * 100;
      if (percent < 30) {
        inputElement.style.background = `linear-gradient(to right, green 100%, red 100%)`;
      } else if (percent < 60) {
        inputElement.style.background = `linear-gradient(to right, yellow 100%, red 100%)`;
      } else {
        inputElement.style.background = `linear-gradient(to right, red 100%, red 100%)`;
      }
      inputElement.style.backgroundSize = `${percent}% 100%`;
      inputElement.style.backgroundRepeat = 'no-repeat';
      inputElement.value = this.originalValue;
    }
    if (controlName == 'falcon') {
      if (
        this.matchDataSource[0].data[rowIndex][controlName] !=
        inputElement.value
      ) {
        inputElement.style.backgroundColor = '#eda9a9';
      } else {
        inputElement.style.backgroundColor = '#e5f3e6';
      }
    }
  }
}
