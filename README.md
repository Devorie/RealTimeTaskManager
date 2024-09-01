# Candidate Tracker
An application that enables multiple users to add and complete tasks. This application has the standard login/signup and the home page can only be accessible to logged in users.

If a given task has not been started by anyone yet, there is a button next to the task (on the table) that says "I'm doing this one". When clicked, the button should change to "I'm done", however, only for THAT user. All other users see a disabled button that says "{name of user} is doing this".

When the user that chose a task clicks on the "I'm done" button, that task disappears from the table, for ALL users.

This project focused on using React, Entity Framework and SignalR.

# To Run this Project:
Clone the github repository and save it to your local device Use the command line to navigate to the file location Run the following prompts on the command line to set up the database

_dotnet ef migrations add initial
dotnet ef database update_

Run the following prompts on the command line to build and run the project

_dotnet watch run_
