// Packages for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");

// Array of questions 
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the name of your project?",
    validate: (titleInput) => {
      if (titleInput) {
        return true;
      } else {
        console.log("Please enter the project Name!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "description",
    message: "Please provide a description of your project.",
    validate: (descriptionInput) => {
      if (descriptionInput) {
        return true;
      } else {
        console.log("Please enter a project description!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "installation",
    message: "What are the steps required to install your project?",
    validate: (installationInput) => {
      if (installationInput) {
        return true;
      } else {
        console.log("Please enter installation instructions!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "usage",
    message: "Provide instructions for use.",
    validate: (usageInput) => {
      if (usageInput) {
        return true;
      } else {
        console.log("Please enter usage information!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "contribution",
    message: "Guidelines for how to contribute to the project.",
    validate: (contributionInput) => {
      if (contributionInput) {
        return true;
      } else {
        console.log("Please enter guidelines for contributing!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "tests",
    message: "Instructions on how to test this project.",
    validate: (testsInput) => {
      if (testsInput) {
        return true;
      } else {
        console.log("Please enter test instructions!");
        return false;
      }
    },
  },
  {
    type: "list",
    name: "license",
    message: "Select the license for your project.",
    choices: [
      "GNU GPLv3",
      "MIT",
      "Apache 2.0",
      "BSD 3",
      "No license",
    ],
  },
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub Username.",
    validate: (githubInput) => {
      if (githubInput) {
        return true;
      } else {
        console.log("Please enter your GitHub username!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "Enter your email address.",
    validate: (emailInput) => {
      if (emailInput) {
        return true;
      } else {
        console.log("Please enter your email address!");
        return false;
      }
    },
  },
];

// Function to write README file
const writeToFile = (fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/README.md", fileContent, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: "README.md created!",
      });
    });
  });
};

// Function to Initialize app
const init = () => {
  return inquirer.prompt(questions).then((readmeData) => {
    return readmeData;
  });
};

// Function call to initialize app
init()
  .then((readmeData) => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
  })
  .then((pageMD) => {
    return writeToFile(pageMD);
  })
  .then((writeToFileResponse) => {
    console.log(writeToFileResponse);
  })
  .catch((err) => {
    console.log(err);
  });

