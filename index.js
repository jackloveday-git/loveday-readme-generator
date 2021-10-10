// README Generator by Jack Loveday

// Require packages/files
const inquirer = require("inquirer");
const fs = require("fs");
const generateReadme = require("./utils/generateMarkdown");

// Run Inquirer Prompts for User Input
const userInput = () => {
    return inquirer.prompt([
        {
            // User's Name
            type: "input",
            message: "Enter your Full Name (First, and Last):",
            name: "userName",
            validate: (name) => {
                let check = name.match(/^[a-zA-Z]+ [a-zA-Z]+$/g);
                if (check) return true;
                return "Please enter a valid Full Name.";
            }
        },
        {
            // User's Email
            type: "input",
            message: "Enter your Email Address:",
            name: "email",
            validate: (email) => {
                let check = email.match(/\S+@\S+\.\S+/g);
                if (check) return true;
                return "Please enter a valid Email Address.";
            }
        },
        {
            // User's Github Username
            type: "input",
            message: "Enter your Github Username:",
            name: "gitHubName",
            validate: (gitHubName) => {
                if (gitHubName) return true;
                return "Github Username cannot be blank.";
            }
        },
        {
            // Project Repository Name
            type: "input",
            message: "Enter your Project Repository Name:",
            name: "repoName",
            validate: (repo) => {
                if (repo) return true;
                return "Project Repository Name cannot be blank.";
            }
        },
        {
            // Project Title
            type: "input",
            message: "Enter the Project Title:",
            name: "title",
            validate: (title) => {
                if (title) return true;
                return "Project Title cannot be blank.";
            }
        },
        {
            // Project Description
            type: "input",
            message: "Enter the Project Description:",
            name: "description",
            validate: (description) => {
                if (description) return true;
                return "Project Description cannot be blank.";
            }
        },
        {
            // Installation Guide
            type: "input",
            message: "Enter the Installation Guide:",
            name: "installation",
            validate: (install) => {
                if (install) return true;
                return "A professional README.md requires installation steps.";
            }
        },
        {
            // Usage Instructions
            type: "input",
            message: "Enter the Usage Instructions:",
            name: "usage",
            validate: (use) => {
                if (use) return true;
                return "A professional README.md requires usage steps.";
            }
        },
        {
            // Hyperlink Confirmation
            type: "confirm",
            name: "links",
            message: "Will there be hyperlinks for the Usage section?",
            default: false
        },
        {
            // Link Message
            type: "input",
            name: "message",
            message: "Enter the Hyperlinks Message:",
            when: (answers) => { return answers.links !== false },
            validate: (message) => {
                if (message) return true;
                return "Hyperlinks must have a message.";
            }
        },
        {
            // Link URL
            type: "input",
            name: "linksUrl",
            message: 'Provide the URL(s), seperated by a Comma (,):',
            when: (answers) => { return answers.links !== false },
            validate: (linkURL) => {
                if (linkURL) return true;
                return "Hyperlinks must have a URL.";
            }
        },
        {
            // Screenshot Confirmation
            type: "confirm",
            name: "screenshots",
            message: "Will there be screenshots for the Usage section?",
            default: false
        },
        {
            // Image URL
            type: "input",
            name: "image",
            message: 'Provide the URL(s), seperated by a Comma (,):',
            when: (answers) => { return answers.screenshots !== false },
            validate: (image) => {
                if (image) return true;
                return "Screenshots must have a URL.";
            }
        },
        {
            // Contribution Credits
            type: "input",
            message: "Provide Contributing members:",
            name: "credits",
            validate: (credits) => {
                if (credits) return true;
                return "Team cannot be empty.";
            }
        },
        {
            // Tests
            type: "input",
            message: "Enter the Testing Guide:",
            name: "test",
        },
        {
            // License
            type: "list",
            message: "Please select a license for your project.",
            name: "license",
            choices: [
                {
                    name: "MIT",
                    value: "mit"
                },
                {
                    name: "APACHE 2.0",
                    value: "apache-2.0"
                },
                {
                    name: "Boost Software 1.0 ",
                    value: "bsl-1.0"
                },
                {
                    name: "GNU AGPLv3",
                    value: "agpl-3.0"
                },
                {
                    name: "GNU GPLv3",
                    value: "gpl-3.0"
                },
                {
                    name: "Mozilla Public 2.0",
                    value: "mpl-2.0"
                }
            ]
        }
    ]);
};

// Function to Write our README.md
const writeFile = (answers) => {
    const readme = generateReadme(answers);

    fs.writeFile("README.md", readme, (err) => {
        if (err) {
            reject(err);
            return;
        } else {
            console.log(
                "README.md generated. See your current directory for the result."
            );
        }
    });
};

// Function to initialize the app
function init() {
    userInput()
        .then((answers) => {
            writeFile(answers);
        });
}

// Function call to initialize app
init();