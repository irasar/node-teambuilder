const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function mainMenu() {
    function createManager() {
        console.log("Please build your team")
        inquirer.prompt([{
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name"
            }
        },
        {
            type: "number",
            name: "managerId",
            message: "What is your manager's id?",
            validate: answer => {
                if (parseInt(answer) >= 0) {
                    return true;
                }
                return "Please enter a positive number greater than zero";
            },
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a valid email address"
            }
        },
        {
            type: "input",
            name: "managerNumber",
            message: "What is your manager's office number?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a phone number"
            }
        }

        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerNumber)
            teamMembers.push(manager)
            idArray.push(answers.managerId)
            console.log(teamMembers)

            createMember();
        })
    }
    createManager();

    function createEngineer() {
        inquirer.prompt([{
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name"
            }
        },
        {
            type: "number",
            name: "engineerID",
            message: "What is the engineer's ID?",
            validate: answer => {
                if (parseInt(answer) >= 0) {
                    return true;
                }
                return "Please enter a positive number greater than zero";
            },
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a valid email address"
            }
        },
        {
            type: "input",
            name: "engineerNumber",
            message: "What is the engineer's Github?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a username"
            }
        }

        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerNumber)
            teamMembers.push(engineer)
            idArray.push(answers.engineerID)
            console.log(teamMembers)

            createMember();
        })
    }
    function createIntern() {
        inquirer.prompt([{
            type: "input",
            name: "internName",
            message: "What is the intern's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name"
            }
        },
        {
            type: "number",
            name: "internID",
            message: "What is the intern's id?",
            validate: answer => {
                if (parseInt(answer) >= 0) {
                    return true;
                }
                return "Please enter a positive number greater than zero";
            },
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's email?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a valid email address"
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the intern's school?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter your intern's school"
            }
        }

        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool)
            teamMembers.push(intern)
            idArray.push(answers.internID)
            console.log(teamMembers)

            createMember();
        })
    }

    function createMember() {
        inquirer.prompt([{
            type: "list",
            name: "memberChoice",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer",
                "Intern",
                "I don't want to add anymore team members"]
        }
        ]).then(answers => {

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

            fs.writeFile(outputPath, render(teamMembers), (err) => {
                if (err) throw err;

            })
        })
    }
};
mainMenu()


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


