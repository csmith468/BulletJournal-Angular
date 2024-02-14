# Bullet Journal Web Application

## Overview
Welcome to the Bullet Journal web application! This project aims to provide users with a comprehensive and customizable platform for habit tracking, utilizing Angular for the front end and .NET Core for the back end. The application allows users to seamlessly input data through reusable forms, view, edit, and delete entries in tables, and visualize trends with customizable charts. See below for screenshots of the app and for more details.

## Visualize

**Trends:**
![](https://github.com/csmith468/BulletJournal/blob/master/GIFs/Trends.gif)

**Home &rarr; Add/Edit Form &rarr; Table View:**
![](https://github.com/csmith468/BulletJournal/blob/master/GIFs/Form.gif)

## Key Features

- **Reusable Forms**
  - Create and edit entries effortlessly for multiple checklist types (e.g., daily, morning, night).
  - _Note: "Checklist Type" refers to the category of a checklist that a user would enter, such as morning- or night-related. Each checklist has some similar columns (such as UserID, Date, and {ChecklistType}ID) so that they can all use the same interface and share an abstract class as the generic type T when creating generic methods._

- **Tables**
  - View, edit, or delete specific entries.
  - Pagination to limit the amount of data seen at a time.
  - Date range selector to show data only within a range, where the selectors only go to the min/max date available for the data.

- **Charts**
  - Visualize trends per week, month, or year.
  - Dynamically customize the displayed fields for each checklist type.
  - Minimize, close, and open charts based on user preference.

- **Customization**
  - Personalize the application by selecting relevant checklist types and questions within checklists.
  - Adapt the side navigation menu, checklist entries, tables, and charts to display only the information that is most useful to you.
 
- **Code Architecture**
  - Codebase follows the Don't Repeat Yourself (DRY) principles for clean and maintainable code.
  - Implements inheritance and dependency injection to enhance code reuse.

## Technologies Used

### Front End (Angular)

- **Overview**
  - **Components**
    - TypeScript, HTML, and CSS.
    - Custom reactive forms for easy scalability and data input.
    - Utilizes ApexCharts for graphical representation and client-side processing for adjusting time periods.
    - Styling using Bootstrap CSS.
    - Adaptive layout using Breakpoint Observer for compatibility across various devices.
  - **Services**: Implements HTTP requests and observables using RxJS for effective communication between components.
  - **Routing and Resolvers**: Utilizes Angular routing with resolvers for seamless navigation and data passing.
  - **Interceptors**: Handle authentication of HTTP requests with tokens, as well as loading and error handling.
  - **Guards**: Prevent users from losing unsaved changes when navigating away from a page, both within and outside the app.
  - Aiming to be as independent of "checklist types" as possible so that all related data is pulled from the API and not hard-coded anywhere.

### Back End

- **Technologies:**
  - **C#**: Primary programming language for backend development, also written with LINQ.
  - **ASP.NET Core WebAPI**: Utilized for building robust and scalable REST APIs.
  - **Entity Framework Core**: Manages CRUD operations efficiently.
  - **Dapper ORM**: Handles some complex "GET" endpoints by writing direct SQL queries, mindful of preventing SQL injection hacks.
  - **T-SQL**: Database

- **Overview**
  - Adopts the Unit of Work Pattern for efficient data management.
  - Implements specific API endpoints for each "checklist type", all directed to a generic controller.
  - Utilizes a generic interface/repository structure, facilitating straightforward addition of new "checklist types".
  - Uses JWT tokens for authorization and authentication of users on login/registration.

- **Database:**
  - Hosted through a Docker container.
  - Views: For consolidating and retrieving read-only data efficiently.
  - Functions: For adjusting timezones, ensuring accurate and consistent timestamp handling per user.

- **Exploring Alternatives:**
  - Currently exploring Spring Boot Java APIs to evaluate their suitability compared to .NET Core.


This is a work in progress and I'm actively making updates, so stay tuned! 


