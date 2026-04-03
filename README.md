# ProjectViewIQ
Automation projection for Insights module of the ViewIQ platform.

# please add config.env.json file in you project and add server id's to fetch the mail

🛠️ Tech Stack

Cypress 13 — E2E test framework
Mailosaur — Email testing for OTP verification
Page Object Model (POM) — Test structure pattern

ProjectViewIQ/
├── cypress/
│   ├── e2e/
│   │   └── insightTests.cy.js       # Test specs
│   ├── pages/
│   │   └── InsightsPage.js          # Page Object Model
│   └── support/
│       ├── commands.js              # Custom Cypress commands (loginWithOTP)
│       └── e2e.js                   # Global config and exception handling
├── cypress.config.js                # Cypress configuration + Mailosaur tasks
├── cypress.env.json                 # ⚠️ Not committed — see setup below
├── .gitignore
└── README.md

⚙️ Setup & Installation
Prerequisites

Node.js v18.17.0 (recommended — use nvm)
npm
Steps:

1. Clone the repository
bashgit clone <repo-url>
cd ProjectViewIQ

2. Switch to the correct Node version
bashnvm install 18.17.0
nvm use 18.17.0

3. Install dependencies
bashnpm install

🚀 Running Tests
Open Cypress UI (interactive mode)
bash./node_modules/.bin/cypress open
Run tests headlessly (CI mode)
bash./node_modules/.bin/cypress run
Run a specific spec
bash./node_modules/.bin/cypress run --spec "cypress/e2e/insightTests.cy.js"

🔐 Authentication Flow
This suite uses OTP-based login via Mailosaur:

The test clears the Mailosaur inbox before login
Enters email and password credentials
Clicks the OTP send button and waits for the email to arrive
Reads the 6-digit OTP from Mailosaur and enters it automatically
Session is cached using cy.session() and reused across tests — OTP is only fetched once per run

