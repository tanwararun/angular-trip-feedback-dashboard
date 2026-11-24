import { Component, input, computed, signal } from '@angular/core';
import { Trip, Submission, DriverStats } from '../../models';
type DriverFilter = 'all' | 'below';

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  // Parent inputs
  trips = input.required<Trip[]>();
  submissions = input.required<Submission[]>();

  // Filter state
  selectedFilter = signal<DriverFilter>('all');

  // Currently expanded driver
  expandedDriverId = signal<string | null>(null);

  // Calculate driver statistics
  driverStats = computed<DriverStats[]>(() => {

    const trips = this.trips();
    const submissions = this.submissions();

    const drivers = new Map(
      trips.map(trip => [
        trip.driverId,
        trip.driverName
      ])
    );

    return Array.from(drivers.entries()).map(
      ([driverId, driverName]) => {

        const driverTrips = trips.filter(
          trip => trip.driverId === driverId
        );

        const tripIds = driverTrips.map(
          trip => trip.tripId
        );

        const ratings = submissions.filter(
          submission => tripIds.includes(submission.tripId)
        );

        const ratingCount = ratings.length;

        const averageRating = ratingCount > 0
          ? ratings.reduce(
              (sum, item) => sum + item.rating,0) / ratingCount
          : null;

        return {
          driverId,
          driverName,
          tripCount: driverTrips.length,
          ratingCount,
          averageRating
        };

      }
    );

  });

  // Apply selected filter
  filteredDriverStats = computed(() => {

    const drivers = this.driverStats();

    if (this.selectedFilter() === 'below') {
      return drivers.filter(
        driver =>
          driver.averageRating !== null &&
          driver.averageRating < 3.5
      );
    }

    return drivers;

  });

  // Summary statistics
  totalTrips = computed(
    () => this.trips().length
  );

  totalDrivers = computed(
    () => this.driverStats().length
  );

  totalRatings = computed(
    () => this.submissions().length
  );

  overallRating = computed(() => {

    const submissions = this.submissions();

    if (!submissions.length) {
      return null;
    }

    const total = submissions.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    return total / submissions.length;
  });

  // Expand/collapse driver
  toggleDriver(driverId: string) {

    this.expandedDriverId.update(current =>
      current === driverId ? null : driverId
    );

  }

  // Get individual submissions for a driver
  getDriverSubmissions(driverId: string): Submission[] {

    const driverTripIds = new Set(
      this.trips()
        .filter(trip => trip.driverId === driverId)
        .map(trip => trip.tripId)
    );

    return this.submissions().filter(
      submission => driverTripIds.has(submission.tripId)
    );

  }

  // Chart bar height
  getBarHeight(average: number | null): number {
    return average === null ? 0 : (average / 5) * 100;
  }

}
