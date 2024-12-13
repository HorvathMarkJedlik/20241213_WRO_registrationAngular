import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RegistrationModel } from '../models/registration.model';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  @Input() teamData: RegistrationModel | undefined = undefined;
  @Output() saved = new EventEmitter<RegistrationModel>();

  save(){
    this.saved.emit(this.teamData);
  }

  cancel(){
    this.teamData = undefined;
  }

  getData(event: any){
    return event.target.value; 
  }
}
