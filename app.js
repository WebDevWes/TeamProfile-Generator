const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const outputPath = path.join(__dirname, "team.html");
const render = require("./lib/htmlRenderer");
const { create } = require("domain");
const team = []

const managerQuestions = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your name (manager)?",
                name: "name"
            },
            {
                type: "input",
                message: "Enter your id number?",
                name: "id"
            },
            {
                type: "input",
                message: "Enter your email?",
                name: "email"
            },
            {
                type: "input",
                message: "Enter your office number?",
                name: "officenumber"
            }
        ]).then(response => {
            const manager = new Manager(
                response.name,
                response.id,
                response.email,
                response.officenumber
            )
            team.push(manager)
            addteamMember()
        }).catch(err => {
            throw err
        })
}
const addteamMember = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which role would you like to add to your team?",
                name: "chooseteam",
                choices: [
                    "Engineer",
                    "Intern",
                    "I do not wish to add any more team members"
                ]
            }
        ]).then(response => {
            switch(response.chooseteam) {
                case "Engineer":
                    createEngineer()
                    break
                case "Intern":
                    createIntern()
                    break
                default:
                    fs.writeFileSync(outputPath, render(team), "utf8")
                    break
            }
        }).catch(err => {
            throw err
        })
}
const createEngineer = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the engineer's name?",
                name: "name"
            },
            {
                type: "input",
                message: "Enter their id number?",
                name: "id"
            },
            {
                type: "input",
                message: "Enter their email?",
                name: "email"
            },
            {
                type: "input",
                message: "Enter their GitHub userid?",
                name: "github"
            }
        ]).then(response => {
            const engineer = new Engineer(
                response.name,
                response.id,
                response.email,
                response.github
            )
            team.push(engineer)
            addteamMember()
        }).catch(err => {
            throw err
        })
}
const createIntern = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the intern's name?",
                name: "name"
            },
            {
                type: "input",
                message: "Enter their id number?",
                name: "id"
            },
            {
                type: "input",
                message: "Enter their email?",
                name: "email"
            },
            {
                type: "input",
                message: "What school do they attend?",
                name: "school"
            }
        ]).then(response => {
            const intern = new Intern(
                response.name,
                response.id,
                response.email,
                response.school
            )
            team.push(intern)
            addteamMember()
        }).catch(err => {
            throw err
        })
}
managerQuestions()