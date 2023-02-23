import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
form!: FormGroup;
todoList: any = [];
constructor(private fb: FormBuilder, private api: ServiceService){}

ngOnInit() {
  this.todosData();
  this.form = this.fb.group({
    newTodo: ['', Validators.required],
  });
}

todosData(){
  this.api.getTodo().subscribe((response: any)=>{
    this.todoList = response;
  })
}

addNewTodo(){
  console.log(this.form.value.newTodo);
  if(this.form.valid){
  this.api.addTodo(this.form.value.newTodo).subscribe(data =>{
    this.form.reset();
    this.todosData();
  })
}
}

deleteTodo(id: any){
  this.api.deleteTodo(id).subscribe(data =>{
    this.todosData();
  })
}

}