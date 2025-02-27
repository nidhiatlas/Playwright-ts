

Feature: Employee Management in OrangeHRM
 
  Background: User login
   Given User navigates on the application
   #And User click on the login link
   #Given User is on the OrangeHRM login page
@OrangeHRM
   Scenario: Login with valid credentials
   When User enters valid username "Admin" and password "admin123"
   And User clicks on the login button
   Then User should be redirected to the dashboard
@OrangeHRM
Scenario Outline: Add New Employee
    Given I enter valid credentials
    When I click on PIM and then Add option
    And I enter valid details of the new employee with first name "<firstName>" and last name "<lastName>" 
    Then a new employee should be added with first name "<firstName>" and last name "<lastName>"

    Examples:
      | firstName | lastName | 
      | test1     | user1    |
      | test2     | user2    |
      | test3     | user3    |
   
   


