
# Angular Trip Feedback Dashboard
A single-page Angular application for collecting
employee feedback on cab drivers and displaying
real-time driver performance analytics.

## Features

### Traveler Feedback
- Trip selection
- Interactive 5-star rating
- Driver punctuality feedback
- Cab cleanliness feedback
- Optional comments (maximum 200 characters)
- Duplicate submission prevention
- Form validation and reset

### Transport Manager Dashboard
- Driver-wise performance statistics
- Average rating calculations
- Overall rating aggregation
- Low-rating identification (below 3.5)
- All drivers / Below 3.5 filter
- Expandable driver rows
- Individual trip feedback and comments
- Dynamic rating visualization

## Tech Stack
- Angular 22
- TypeScript
- HTML
- CSS
- Angular Signals

## Architecture
- Standalone components
- Parent-child component communication
- Signals for state management
- Computed signals for derived statistics
- In-memory data storage

## Run Locally

```bash
npm install
ng serve
```

Open http://localhost:4200

## Data Persistence
All submissions are maintained in component state.
Data resets when the application is refreshed.

## Author
Arun Tanwar
