// cypress/e2e/insights/.cy.js

import InsightsPage from "../pages/InsightsPage";

describe("Insights - Search Functionality", () => {
  before(() => {
    cy.task('clearInbox'); 
    cy.loginWithOTP();
  });
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    cy.loginWithOTP();      // ✅ restores cache instantly, re-logs if expired
    cy.visit('/insights/channels');
    cy.get('.tab-item.selected', { timeout: 15000 }).should('contain.text', 'Channels');
  
  });


  it('Search for influencer "MrBeast"', () => {
    InsightsPage.searchInfluencer("MrBeast");
    InsightsPage.validateSearchResult("Beast");
  });
  it(`Check the  Pagination results`, () => {
    InsightsPage.validatePagination();
  });
  it(`Check the min values in the filter`, () => {
    InsightsPage.clickFilters();
    InsightsPage.clickMinimumValues();
  });
  it(`Check the no vetted filters are applied`, () => {
    InsightsPage.clickFilters();
    cy.contains(".wide-box", "No").click();

    // Validate selection
    cy.contains(".wide-box", "No").should("have.class", "selected");

    cy.contains(".wide-box", "Yes").should("not.have.class", "selected");

    // Reset filters
    cy.contains("Reset").click();

    // Validate reset
    cy.contains(".wide-box", "All").should("have.class", "selected");

    cy.contains(".wide-box", "No").should("not.have.class", "selected");

    cy.contains(".wide-box", "Yes").should("not.have.class", "selected");
  });
});
