import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationModel } from './models/registration.model';
import { DataService } from './services/data.service';
import { UntypedFormArray } from '@angular/forms';
import { TeamComponent } from "./team/team.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TeamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = '20241213_WRO_registration';
  registrations: RegistrationModel[] = [];
  newRegistration: RegistrationModel | undefined = undefined;
  modifyRegistration: RegistrationModel | undefined = undefined;

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getRegistrations().subscribe({
      next: (response) => (this.registrations = response),
      error: (error) => console.log(error),
    });
  }

  new() {
    this.newRegistration = {
      id: undefined,
      category: '',
      memberCount: 0,
      teamLeader: '',
      teamLeaderBirthDate: '',
      teamLeaderEmail: '',
      teamName: '',
    };
  }

  modify(registration: RegistrationModel) {
    this.modifyRegistration = JSON.parse(JSON.stringify(registration));
  }

  saveNew(registration: RegistrationModel) {
    this.dataService.addRegistration(registration).subscribe({
      next: (response) => {
        this.registrations.push(response);
        this.newRegistration = undefined;
      },
      error: (error) => console.log(error),
    });
  }

  Modify(registration: RegistrationModel) {
    this.dataService.modifyRegistration(registration).subscribe({
      next: (response) => {
        const index = this.registrations.findIndex((r) => r.id === registration.id);
        this.registrations[index] = response;
        this.modifyRegistration = undefined;
      },
      error: (error) => console.log(error),
    });
  }

  delete(registration: RegistrationModel) {
    this.dataService.deleteRegistration(registration.id!).subscribe({
      next: (response) => {
         this.registrations = this.registrations.filter(r => r.id !== registration.id);
        this.modifyRegistration = undefined;
      },
      error: (error) => console.log(error),
    });
  }
}
