**Playwright Automation Project**

This project contains end-to-end test automation using Playwright. Follow the steps below to set up and run the tests on your local system.
----------------------------------------------------------------------------------------------------------------------------------------------
🔧 Prerequisites
Node.js (v16 or above)
Git
------------------------------------------------------------------------------------------------------------------------------
📥 Clone the Repository
git clone https://github.com/mithuntc/Playwright_Automation_in_React_App.git
cd Playwright_Automation_in_React_App (move to cloned folder)
-----------------------------------------------------------------------------------------------------------------------------
📦 Install Dependencies:
**npm install**
-----------------------------------------------------------------------------------------------------------------------------
▶️ Run Tests (Headless):
**npx playwright test**
------------------------------------------------------------------------------------------------------------------------------
🧪 Run Tests (Headed mode with browser UI):
**npx playwright test --headed**, 
This will open the browser during test execution(Right now Chromium is enabled for Testing).
-------------------------------------------------------------------------------------------------------------------------------
📊 View HTML Test Report:
**npx playwright show-report**

-------------------------------------------------------------------------------------------------------------------------------
✅ Features Covered in This Repository
This automation test suite using Playwright includes the following features:

🔐 Login Functionality
Valid Login scenario

Invalid Login scenario (with proper assertions)

👥 User CRUD Operations
Add a new user

Highlight newly created user

Update user information (highlight the updated row)

Delete a user

🖼️ Visual Testing
Visual testing integrated using Playwright’s screenshot comparison

Screenshots saved for:

UI state after user creation

UI state after user update

Errors (if any)

---------------------------------------------------------------------------------
**Sample Screenshots**

<img width="1280" height="720" alt="image" src="https://github.com/user-attachments/assets/1f0bd818-4264-46b7-9d0a-8b1d331ecced" />

<img width="1265" height="1134" alt="image" src="https://github.com/user-attachments/assets/94e4ed20-66e2-43ee-94b6-6ef1cf7f5e59" />

<img width="1265" height="1134" alt="image" src="https://github.com/user-attachments/assets/12e98c83-d20c-4847-b885-574ccd44611a" />

---------------------------------------------------------------------------------

All tests are implemented in Playwright with JavaScript and run on localhost.
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**Important for Next Task For API Test Automation (Node.js Backend)**
Please use this repository: https://github.com/mithuntc/NodeJS_Login_CRUD_APIs — clone it, run it locally, and ensure the server is up before executing the API automation test suites. All cloning and setup instructions are provided in the repository as well as in the test documentation file.






