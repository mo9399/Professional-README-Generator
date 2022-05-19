// Packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");

// Array of questions for user input
const questions = [
  // Name
  {
    type: "input",
    name: "title",
    message: "What is the title of the project?",
    validate: (titleInput) => {
      if (titleInput) {
        return true;
      } else {
        console.log("Please enter the project title!");
        return false;
      }
    },
  },
  // Description
  {
    type: "input",
    name: "description",
    message: "Provide a description of the project.",
    validate: (descriptionInput) => {
      if (descriptionInput) {
        return true;
      } else {
        console.log("Please provide a project description!");
        return false;
      }
    },
  },
  // Installation
  {
    type: "input",
    name: "installation",
    message: "What are the steps required to install your project?",
    validate: (installationInput) => {
      if (installationInput) {
        return true;
      } else {
        console.log("Please provide installation instructions!");
        return false;
      }
    },
  },
  // Usage
  {
    type: "input",
    name: "usage",
    message: "Provide instructions and examples for use.",
    validate: (usageInput) => {
      if (usageInput) {
        return true;
      } else {
        console.log("Please provide usage information!");
        return false;
      }
    },
  },
  // How To Contribute
  {
    type: "input",
    name: "contribution",
    message: "Provide guidelines for how to contribute to the project.",
    validate: (contributionInput) => {
      if (contributionInput) {
        return true;
      } else {
        console.log("Please provide guidelines for contributing!");
        return false;
      }
    },
  },
  // Tests
  {
    type: "input",
    name: "tests",
    message: "Provide instructions on how to test this project.",
    validate: (testsInput) => {
      if (testsInput) {
        return true;
      } else {
        console.log("Please provide test instructions!");
        return false;
      }
    },
  },
  // License
  {
    type: "list",
    name: "license",
    message: "Select the license for your project.",
    choices: [
      "GNU AGPLv3",
      "GNU GPLv3",
      "GNU LGPLv3",
      "Mozilla",
      "MIT",
      "Apache",
      "Boost",
      "No license",
    ],
  },
  // Github Username
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
  // Email Address
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

// Function to initialize app
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