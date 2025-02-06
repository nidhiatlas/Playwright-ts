Feature: Employee Management in OrangeHRM
   
  Background:
   Given User navigates on the application
   And User click on the login link


  Scenario: Login with valid credentials
    Given I am on the OrangeHRM login page
    When I enter valid username "Admin" and password "admin123"
    And I click on the login button
    Then I should be redirected to the dashboard

  Scenario Outline: Adding a new employee
    Given I am logged into the admin portal
    When I navigate to "PIM" and click on "Add Employee"
    And I enter "<first_name>" and "<last_name>" in the name fields
    And I select the job title "<job_title>"
    And I click on "Save"
    Then the new employee "<first_name> <last_name>" should be added successfully

    Examples:
      | first_name | last_name | job_title    |
      | Nidhi      | Jaiswal   | Software Eng |
      | Abc        | Xyz       | HR Manager   |

  Scenario: Search for an employee by name
    Given I am logged into the admin portal
    When I search for an employee with name "Nidhi Jaiswal"
    Then the employee "Nidhi Jaiswal" should appear in the results

  Scenario: Update employee details
    Given I am logged into the admin portal
    When I search for the employee "Nidhi Jaiswal"
    And I click on the "Edit" button
    And I update the job title to "Senior Software Engineer"
    And I click on "Save"
    Then the employee "Nidhi Jaiswal" should have the job title "Senior Software Engineer"

  Scenario: Delete an employee
    Given I am logged into the admin portal
    When I search for the employee "Abc"
    And I click on the "Delete" button
    Then the employee "Xyz" should be removed from the system
