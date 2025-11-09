import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from '../module/todos';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {


  todosArr : Array<Itodo> = [
    {
      todoitem: "javascript",
      todoid:"nwini12222"
    },
    {
      todoitem: "css",
      todoid:"nwini12222"
    },
    {
      todoitem: "angular",
      todoid:"nwini12222"
    }
  ]

  @ViewChild("todoitem") todoItemRef !: ElementRef  ;

  IsInEditMode: boolean = false

  constructor() { }

  ngOnInit(): void {
  }


  OntodoAdd(todoitemcontrol:HTMLInputElement){
      let TodoObj : Itodo = {
          todoitem : todoitemcontrol.value,
          todoid : this.uuid()
      }
      todoitemcontrol.value = ""
      this.todosArr.unshift(TodoObj)
  }

  OnTodoEdit(todoObj : Itodo){
    this.IsInEditMode= true
    let Edit_id = todoObj.todoid
    localStorage.setItem("Edit_id",Edit_id)
      this.todoItemRef.nativeElement.value = todoObj.todoitem
    
  }

  OnUpdateTodo(todoitem:HTMLInputElement){
      let Update_id = localStorage.getItem("Edit_id")

        let UpatedObj : Itodo = {
          todoitem : this.todoItemRef.nativeElement.value,
          todoid : this.uuid()
      }

      todoitem.value = ""
      let GetIndex = this.todosArr.findIndex(todo=>todo.todoid === Update_id)
      this.todosArr[GetIndex] = UpatedObj
      this.IsInEditMode = false
  }
  
  OnTodoRemove(RemoveId:string){
    let GetIndex = this.todosArr.findIndex(todo=>todo.todoid===RemoveId)
      this.todosArr.splice(GetIndex,1)

  }

   uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
}
