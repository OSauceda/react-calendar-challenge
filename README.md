## react-calendar-challenge

Calendar application that allows you to create reminders.

### Created using the following Components/Libraries
* Project bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* [React](https://github.com/facebook/react) to build the entire UI.
* [React Router](https://github.com/ReactTraining/react-router) for simple app routing.
* State management implementation was done with [Redux](https://github.com/reduxjs/redux) and [React Redux](https://github.com/reduxjs/react-redux).
* Calendar logic was implemented with a custom react component.
* Component styling and structuring was done with the help of [react-bulma-components](https://github.com/couds/react-bulma-components#readme).
* Unit Testing is being done with [Jest](https://github.com/facebook/jest) and [Enzyme](https://github.com/airbnb/enzyme).
* [rc-color-picker](https://github.com/react-component/color-picker#readme) for the color picker.
* [react-day-picker](https://github.com/gpbl/react-day-picker) for the datepicker.
* [React-Time-Picker](https://github.com/wojtekmaj/react-time-picker#readme) for the  time picker.
* [react-select-virtualized](https://github.com/guiyep/react-select-virtualized#readme) for the city autosuggest.

# Run the application in your browser.

### Prerequisites
Before proceding to run the app on your computer please make sure you have the following:
- Node.js - [Downloadn Node.js](https://nodejs.org/en/download/).
- Yarn - [Download Yarn](https://yarnpkg.com/en/docs/install#windows-stable).

### `yarn start`
This command should open [http://localhost:3000](http://localhost:3000) in a new browser tab.

### `yarn test`
Runs all tests.<br />

### App Layout

The following image shows the app main view, the Calendar Panel, in this view the user can add new reminders, the user can see a quick preview of the reminders created for each day.

<br />

<img src="https://i.ibb.co/6w2f6pB/react-calendar-challenge-calendar-panel-v2.png" alt="Calendar Panel">

The following image shows the reminder form modal, this component is used to either create or edit a reminder, the image shows the component in its creation mode. <br />
The user has the option to input a title, pick a date, time, city and a color for the reminder. Title and City are required fields, all other fields are not required since default values are provided.

<br />

<img src="https://i.ibb.co/YppzwqK/react-calendar-challenge-reminder-form-creation.png" alt="Reminder Form creation mode">

Next is the Day Overview Panel. Reminders are shown alongside a quick overview of weather forecast for the set day.<br />
<br />
Reminders can be added, editted and deleted. User also has the option to clear all reminders for the current viewed day.

<br />

<img src="https://i.ibb.co/x1sWBhs/react-calendar-challenge-day-overview-panel-v2.png" alt="Day Overview Panel">

<br />

The image below shows the Reminder form modal in its editable reminder mode, validations for this mode are the same as the creation mode.

<br />

<img src="https://i.ibb.co/HthRk7b/react-calendar-challenge-reminder-form-edit.png" alt="Reminder Form edit mode">

<br />