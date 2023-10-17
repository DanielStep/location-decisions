### Usage

Requirements

- Node.js (written in 18)
- npm (written in 9.8)
- Angular (written in 16)

Install Angular CLI if not already installed

`npm install -g @angular/cli`

In repository root directory, run

`npm install`

To run the application, run

`ng serve`

View in browser on

`http://localhost:4200/`

### Architecture

Standard Angular template was used and due to simple nature of the application logic was simple split into two components, one for the map and a child component for the polygon overlay. Data fetching was offloaded onto a service.

### Limitations

Due to time constraints some compromises included:

- No test were implemented.
- Error handling is minimal, only logging to console.
- Strong typing was limited to main data structure Shape, not others like API responses.