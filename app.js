const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

// Output team.html into output folder within directory - Fails if output folder is not created first
const output = path.join(__dirname + "/output/" , "team.html");
// Empty array to contain response from inquirer
const team = [];

// Gets response to create manager profile THEN pushes to empty array "team", THEN calls newTeamMember function
const newManager = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the Manager's name",
            name: "name"
        },
        {
            type: "input",
            message: "Please enter the ID number for the employee",
            name: "id"
        },
        {
            type: "input",
            message: "Please enter the email for the employee",
            name: "email"
        },
        {
            type: "input",
            message: "Please enter the phone number for the employee",
            name: "phoneNumber"
        }
    ]).then(response => {
        const manager = new Manager (
            response.name,
            response.id,
            response.email,
            response.phoneNumber
        );
        team.push(manager);
        newTeamMember();
    }).catch(err => {
        throw err
    })
};

// Function to select role of next team member to add, THEN calls the corresponding function
// If no more employee needs to be added, file is written to team.html in output folder
const newTeamMember = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What is the role for the employee",
            name:"role",
            choices: [
                "Engineer",
                "Intern",
                "No more employees to add"
            ]
        }
    ]).then(function (response) {
        if (response.role === "Engineer") {
            addEngineer();
        } else if (response.role === "Intern") {
            addIntern();
        } else {
            fs.writeFile(output, render(team), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }
    })
};

// Gets response to create engineer profile THEN pushes to empty array "team", THEN calls newTeamMember function
const addEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the Engineer's name",
            name: "name"
        },
        {
            type: "input",
            message: "Please enter the ID number for the employee",
            name: "id"
        },
        {
            type: "input",
            message: "Please enter the email for the employee",
            name: "email"
        },
        {
            type: "input",
            message: "Please enter the Github Username for the employee",
            name: "github"
        }
    ]).then(response => {
        const engineer = new Engineer (
            response.name,
            response.id,
            response.email,
            response.github
        );
        team.push(engineer);
        newTeamMember();
    }).catch(err => {
        throw err
    })
};

// Gets response to create intern profile THEN pushes to empty array "team", THEN calls newTeamMember function
const addIntern = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the Intern's name",
            name: "name"
        },
        {
            type: "input",
            message: "Please enter the ID number for the employee",
            name: "id"
        },
        {
            type: "input",
            message: "Please enter the email for the employee",
            name: "email"
        },
        {
            type: "input",
            message: "Please enter the school name for the employee",
            name: "school"
        }
    ]).then(response => {
        const intern = new Intern (
            response.name,
            response.id,
            response.email,
            response.school
        );
        team.push(intern);
        newTeamMember();
    }).catch(err => {
        throw err
    })
};

newManager();