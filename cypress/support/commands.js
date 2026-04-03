// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
window.process = window.process || { env: {} };
Cypress.Commands.add("loginWithOTP", () => {
    cy.session('otp-session', () => {
        cy.task('clearInbox');  // ✅ clear inbox before triggering OTP
        cy.visit('/');
        cy.get('input[type="email"]').type(Cypress.env('EMAIL'));
        cy.get('input[type="password"]').type(Cypress.env('PASSWORD'));
        cy.get("#login-btn").click();
        const startTime = Date.now();
      
        
          cy.get('button[data-testid="next-button-main"]', {
            timeout: 20000,
          }).click();
          cy.log("START TIME RECEIVED:", startTime.toString());
          cy.contains("Sending").should("not.exist");
          cy.contains("Enter Validation Code").should("be.visible");
          // ✅ Now fetch — inbox only has the new email
          cy.task("getOTP", {}, { timeout: 2 * 60000 }).then((otp) => {
            expect(otp).to.have.length(6);
      
            const digits = otp.split("");
      
            cy.get(".code-input").each(($el, index) => {
              cy.wrap($el).type(digits[index]);
            });
          });
          cy.url({ timeout: 20000 }).should("include", "/home");
        }, {
            validate() {
                cy.visit('/home');
                cy.url({ timeout: 10000 }).should("include", "/home");
            }
          });
        });