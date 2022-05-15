import { Component, OnInit } from '@angular/core';
import { SohoModalDialogService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  title="Addd new day legend"
  constructor(private modalService:SohoModalDialogService) { }

  ngOnInit(): void {
  }
  confirm(){
    return true;
  }
  cancel(){
    return false;
  }
  
}
