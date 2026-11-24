import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Feedback } from './components/feedback/feedback';
import { Dashboard } from './components/dashboard/dashboard';
import { Trip, Submission } from './models';

@Component({
  imports: [RouterOutlet, Feedback, Dashboard],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('trip_feedback');
  trips = signal<Trip[]>([
    {
      tripId: 'TRIP-2041',
      driverId: 'DRV-88',
      driverName: 'Ramesh K'
    },
    {
      tripId: 'TRIP-2042',
      driverId: 'DRV-88',
      driverName: 'Ramesh K'
    },
    {
      tripId: 'TRIP-2043',
      driverId: 'DRV-12',
      driverName: 'Suresh P'
    }
  ]);
  submissions = signal<Submission[]>([]);

  addSubmission(submission : Submission){
    this.submissions.update(current => [
      ...current,
      submission
    ])
  }




}
