import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
 
@Component({
  selector: 'app-commonpopup',
  templateUrl: './commonpopup.component.html',
  styleUrls: ['./commonpopup.component.css']
})
export class CommonpopupComponent {
  @Input() className: any = "modal-dialog modal-md";
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() Esignature: boolean;
  @Output() esignData: EventEmitter<boolean> = new EventEmitter<boolean>();
  Esign: FormGroup;
  PasswordFlag: boolean;
  emppId: string;
  constructor(private formBuilder: FormBuilder) { }
  @Input() isOpen = false;
  @Input() title = "Title";
  @Output() onClose = new EventEmitter<string>();
  ngOnInit(): void {
    this.emppId = localStorage.getItem('EmployeeId');
  }
  closePopup() {
    this.isOpen = false;
    this.onClose.emit('Pop-up window closed');
  }
  close() {
    this.Esignature = false;
    this.esignData.emit(this.Esignature);
  }
}