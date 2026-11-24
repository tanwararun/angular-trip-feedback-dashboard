import { Component, input, output, signal } from '@angular/core';
import { Submission, Trip } from '../../models';

@Component({
  imports: [],
  selector: 'app-feedback',
  styleUrl: './feedback.scss',
  templateUrl: './feedback.html',
})
export class Feedback {
  
  // Parent inputs
  trips = input.required<Trip[]>();
  submissions = input.required<Submission[]>();

  // Parent output
  submitted = output<Submission>();

  // Local form state
  selectedTripId = signal('');
  rating = signal(0);
  hoveredRating = signal(0);
  onTime = signal<boolean | null>(null);
  cabClean = signal<boolean | null>(null);
  comment = signal('');

  readonly maxCommentLength = 200;

  get isAlreadyRated(): boolean {
    return this.submissions().some(
      item => item.tripId === this.selectedTripId()
    );
  }

  get isCommentInvalid(): boolean {
    return this.comment().length > this.maxCommentLength;
  }

  get isFormInvalid(): boolean {
    return (
      !this.selectedTripId() ||
      this.rating() === 0 ||
      this.onTime() === null ||
      this.cabClean() === null ||
      this.isCommentInvalid ||
      this.isAlreadyRated
    );
  }

  selectRating(value: number) {
    this.rating.set(value);
  }

  submitFeedback() {
    if (this.isFormInvalid) {
      return;
    }

    const submission: Submission = {
      tripId: this.selectedTripId(),
      rating: this.rating(),
      onTime: this.onTime()!,
      cabClean: this.cabClean()!,
      comment: this.comment().trim() || undefined
    };

    this.submitted.emit(submission);

    this.resetForm();
  }

  resetForm() {
    this.selectedTripId.set('');
    this.rating.set(0);
    this.hoveredRating.set(0);
    this.onTime.set(null);
    this.cabClean.set(null);
    this.comment.set('');
  }
  
}
