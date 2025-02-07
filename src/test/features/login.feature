Feature: Employee Management in OrangeHRM
   
  Background:
   Given User navigates on the application
   And User click on the login link


  Scenario: Login with valid credentials
    Given User is on the OrangeHRM login page
    When User enters valid username "Admin" and password "admin123"
    And User clickS on the login button
    Then User should be redirected to the dashboard

  Scenario Outline: Adding a new employee
    Given User is logged into the admin portal
    When User navigates to "PIM" and click on "Add Employee"
    And User enters "<first_name>" and "<last_name>" in the name fields
    And User selects the job title "<job_title>"
    And User clicks on "Save"
    Then the new employee "<first_name> <last_name>" should be added successfully

    Examples:
      | first_name | last_name | job_title    |
      | Nidhi      | Jaiswal   | Software Eng |
      | Abc        | Xyz       | HR Manager   |

  Scenario: Search for an employee by name
    Given User is logged into the admin portal
    When User searches for an employee with name "Nidhi Jaiswal"
    Then the employee "Nidhi Jaiswal" should appear in the results

  Scenario: Update employee details
    Given User is logged into the admin portal
    When User searches for the employee "Nidhi Jaiswal"
    And User clicks on the "Edit" button
    And User updates the job title to "Senior Software Engineer"
    And User clicks on "Save"
    Then the employee "Nidhi Jaiswal" should have the job title "Senior Software Engineer"

  Scenario: Delete an employee
    Given User is logged into the admin portal
    When User searches for the employee "Abc"
    And User clicks on the "Delete" button
    Then the employee "Xyz" should be removed from the system
