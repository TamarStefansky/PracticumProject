Employee Management System
Project Description:
The "Employee Management System" project allows users to manage and operate the list of employees in an organization. The system provides a user-friendly interface that enables users to add, edit, and delete employees, as well as manage their roles efficiently and easily.

Installation and Usage:
Dependencies Installation: Use the command npm install to install all the dependencies required for the project.
Running the Application: Run the command npm start to start the application in the development environment.
Access Address: Navigate to http://localhost:3000 in your browser to access the user interface.
Technologies Used:
Client-Side: Developed using React.
Server-Side: Developed using ASP.NET Core (Net 6).
Database: Utilized SQL for data storage and management.
Features and Functionality:
Employee Details: The system contains the following details for an employee: first name, last name, ID number, worker password, start work date, birth date, gender, and a list of roles assigned to the employee. Each role in the employee's roles contains the fields: role name, a boolean field indicating whether the role is managerial, and a date field indicating the day the employee received the current role.
Employees List View: Displays a table with employee details including first name, last name, ID number, and start work date.
Add, Edit, and Delete: The table provides options for updating and deleting each employee. The update form view includes the rest of the employee details not displayed in the table, as well as a button to open the roles table. Changing/ selecting a name for a new role is possible to name roles that do not yet exist for the current employee. Selecting a date for the day of role acceptance is possible for dates equal to or later than the start work date. Additionally, there is an option to add a new employee to the system. All fields in the form must receive values.
Search: Allows filtering of the employees list by text appearing in the various fields of the table.
Export to Excel: Allows the user to export the list of employees to an Excel file for further use or archiving, as well as the option to export details of a single employee to an Excel file.
Printing: Allows printing of the employees table.
Technical Requirements:
Client-Side: Implementation in React.
Server-Side: Utilization of Net 6 for server-side development.
Database: Usage of SQL for data storage.
Additional Notes:
Remarks:
All fields in the form are mandatory and require appropriate validation.
The system treats employee deletion as a logical deletion, without physically removing them from the database.
Utilization of the layer model for server development.
Emphasis on pleasant visual design and user-friendly user experience.
