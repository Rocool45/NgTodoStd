import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istd } from '../module/student';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  StudentArr :Array<Istd> = [
    {
      fname:"Rohan",
      lname: "Kulkarni",
      email : "Rohan32@gmail.com",
      contact : 9322670690,
      stdid:"228727duwwd"
      },
      {
      fname:"ram",
      lname: "patel",
      email : "patel@gmail.com",
      contact : 244214214,
       stdid:"wewe222"
      },
      {
      fname:"jivan",
      lname: "dase",
      email : "jivdas@gmail.com",
      contact : 325346467,
       stdid:"www22222"
      }
  ]
 IsInEditMode: boolean = false
  @ViewChild("fname") fnameRef !:ElementRef
  @ViewChild("lname") lnameRef !:ElementRef
  @ViewChild("Email") EmailRef !:ElementRef
  @ViewChild("Contact") contactref !:ElementRef

  constructor( private _MatSnackBar :MatSnackBar ) { 

  }

  ngOnInit(): void {
  }

  OnStudentAdd(){
    let Stdibj : Istd =  {
      fname : this.fnameRef.nativeElement.value,
        lname  : this.lnameRef.nativeElement.value,
        email: this.EmailRef.nativeElement.value,
        contact : this.contactref.nativeElement.value,
        stdid : this.uuid()   
    }

     this.fnameRef.nativeElement.value = "";
       this.lnameRef.nativeElement.value = "";
         this.EmailRef.nativeElement.value = "";
         this.contactref.nativeElement.value ="";
    
    this.StudentArr.unshift(Stdibj)

  }

  OnEditStd(stdObj:Istd){
    this.IsInEditMode = true
    let Edit_id = stdObj.stdid
    localStorage.setItem("Edit_id",Edit_id)
    console.log(Edit_id)
     this.fnameRef.nativeElement.value =stdObj.fname
       this.lnameRef.nativeElement.value = stdObj.lname
         this.EmailRef.nativeElement.value = stdObj.email
         this.contactref.nativeElement.value =stdObj.contact
  }

  OnStudentUpdate(){
    let Update_id = localStorage.getItem("Edit_id")
      
    if(Update_id){
      let UpdateObj : Istd ={
        fname : this.fnameRef.nativeElement.value,
        lname  : this.lnameRef.nativeElement.value,
        email: this.EmailRef.nativeElement.value,
        contact : this.contactref.nativeElement.value,
        stdid : Update_id
      } 

      this.fnameRef.nativeElement.value = "";
       this.lnameRef.nativeElement.value = "";
         this.EmailRef.nativeElement.value = "";
         this.contactref.nativeElement.value ="";
      let getIndex= this.StudentArr.findIndex(std=>std.stdid===Update_id)
      this.StudentArr[getIndex] = UpdateObj

      this.IsInEditMode = false
    }
  }

  OnRemoveStd(RemoveId : string){

    let getIndex = this.StudentArr.findIndex(std=>std.stdid===RemoveId)
    this.StudentArr.splice(getIndex,1)

  }
    uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}



}
