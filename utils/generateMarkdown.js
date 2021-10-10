// generateMardown.js

// Render License Function
let licenseCopy, boilerPlate;
function renderLicense(data) {
  let year = new Date().getFullYear();
  licenseCopy = `This project is [${data.license.toUpperCase()}](https://choosealicense.com/licenses/${data.license
    }/) licensed.<br />
  Copyright © ${year} [${data.userName.toUpperCase()}](https://github.com/${data.gitHubName.toLowerCase()})
`;
  boilerPlate = "";
  switchOn = data.license;
  switch (switchOn) {
    case "agpl-3.0":
      boilerPlate = `
      This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
      This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
   `;
      break;

    case "gpl-3.0":
      boilerPlate = `
      This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
      This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 `;
      break;

    case "mpl-2.0":
      boilerPlate = `This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
  `;
      break;

    case "apache-2.0":
      boilerPlate = `
      Licensed under the Apache License, Version 2.0 (the "License");
      you may not use this file except in compliance with the License.
      You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0
 `;
      break;
    default:
      boilerPlate = "";
  }
}

// Generate Markdown Function
function generateMarkdown(data) {
  let links = "";
  if (data.linksUrl) {
    links = `${data.message}` + " " + data.linksUrl.split(",").join("<br>");
  }
  let screenshots = "";
  if (data.image) {
    for (let i = 0; i < data.image.split(",").length; i++) {
      screenshots += `![screenshot${i + 1}](${data.image
        .split(",")
      [i].trim()})`;
    }
  }
  renderLicense(data);
  return `
  # ${data.title}
  ![GitHub](https://img.shields.io/github/license/${data.gitHubName}/${data.repoName
    })
  ![GitHub language count](https://img.shields.io/github/languages/count/${data.gitHubName
    }/${data.repoName})
  ![GitHub top language](https://img.shields.io/github/languages/top/${data.gitHubName
    }/${data.repoName})
  
  ## Description
  ${data.description}
  
  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)
  ## Installation
  ${data.installation}
  
  ## Usage 
  ${data.usage}
  ${screenshots}
  ${links}
  ## Credits
  ${data.credits}
  ## License
  ${licenseCopy}
  ${boilerPlate}
  ## Tests
  ${data.test}
  ## Questions
  Contact ${data.userName} with any questions!<br>
  Github link: [${data.gitHubName
      .trim()
      .toLowerCase()}](https://github.com/${data.gitHubName
        .trim()
        .toLowerCase()})<br>
  Email: ${data.email}
`;
}

module.exports = generateMarkdown;