import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl , Validator , FormsModule} from '@angular/forms';
import { Observable, Subject , Subscription, BehaviorSubject } from 'rxjs';
import { CheckRequiredField } from '../../_shared/helpers/form.helper';

import { ItemsService } from '../_services/items.service';
import { ItemModel } from '../_models/item.model';

@Component({
  selector: 'app-item-add-edit',
  templateUrl: './item-add-edit.component.html',
  styleUrls: ['./item-add-edit.component.css']
})
export class ItemAddEditComponent implements OnInit {

  @Input() item: ItemModel;
  @Output() formSubmitEvent = new EventEmitter<string>();

  itemForm: FormGroup;

  isProcessing: Boolean = false;

  checkField  = CheckRequiredField;

  // Variables for add img
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null;

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  onChange(event) {
    this.file = event.target.files[0];
  }

  onSubmit($event) {
    this.isProcessing  = true;
    console.log("File Details" + this.file);
    // let bodyParameter:any = JSON.stringify(this.itemForm.value)
    let currentUserId = localStorage.getItem('userId').toString()
    this.itemForm.value['user']=currentUserId
    // console.log(Object.keys(bodyParameter));
        if (this.itemForm.valid) {
        if (!this.item) {
          this.doAddItem(this.file);
          this.itemForm.value.img = null;
          this.file = null;
        } else {
          this.doUpdateItem();
        }
    }
  }

  getButtonText(): string {
    return this.item ? 'Update' : 'Add';
  }

  private doAddItem(file : any) {
    this.itemsService.add(this.itemForm.value,this.file).subscribe(
      (result) => {
        this.formSubmitEvent.next('add');
        this.itemsService.addItem(this.itemForm.value)
        this.itemForm.reset();
        this.itemsService.fetch().subscribe((response)=>{
          this.itemsService.items$.next(response)
        });
        this.isProcessing  = false;
      }
    );
  }

  private doUpdateItem() {
    this.itemsService.update(this.itemForm.value.id , this.itemForm.value,this.file).subscribe(
      (result) => {
        if (result) {
          this.formSubmitEvent.next('update');
          this.reset();
        }
        this.isProcessing  = false;
      }
    );
  }

  private reset() {
    this.item  = null;
    this.itemForm.reset();
    this.initForm();
  }

  private initForm() {
    this.itemForm = new FormGroup({
      title: new FormControl(this.item ? this.item.title : '', Validators.required),
      description: new FormControl(this.item ? this.item.description : ''),
      id: new FormControl(this.item ? this.item.id : null),
    });
  }

}
