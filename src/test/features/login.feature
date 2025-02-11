Feature: Employee Management in OrangeHRM
   
  Background: User login
   Given User navigates on the application
   And User click on the login link
#    Given User is on the OrangeHRM login page
   Scenario: Login with valid credentials
   When User enters valid username "Admin" and password "admin123"
   And User clickS on the login button
   Then User should be redirected to the dashboard
