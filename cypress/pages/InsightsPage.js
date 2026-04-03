class InsightsPage {

    goToInsights() {
        cy.visit('/insights/channels');
        cy.get('.tab-item.selected').should('contain.text','Channels')
    }
  
    searchInfluencer(name) {
      cy.get('#search-input').should('be.visible')
        .clear()
        .type(name + '{enter}')
    }

    validatePagination() {
        cy.get(".title-container span.name").should('have.length', 32)
    }

    validateSearchResult(name) {
        cy.get(".title-container span.name")
          .should("have.length.at.least", 10)
          .then(($els) => {
            const firstTenTexts = [...$els]
              .slice(0, 10)
              .map((el) => el.innerText.toLowerCase());

            const failures = [];
            firstTenTexts.forEach((text) => {
              try {
                expect(text).to.include(name.toLowerCase());
              } catch (e) {
                failures.push(`"${text}" does not include "${name.toLowerCase()}"`);
              }
            });

            if (failures.length > 0) {
              throw new Error(
                `${failures.length} results did not match "${name}":\n` + failures.join('\n')
              );
            }
          });
    }

    clickFilters() {
        cy.get('.filters-popover-controller').click() 
    }

    clickMinimumValues() {
        cy.get('.inputs-range').each(($row) => {
          
          const expectedMin = $row.find('input.inputbox-range.min').attr('min') || '0';
          
          cy.wrap($row).find('.holder.min').click();
          
          // ✅ Strip commas from actual value before comparing
          cy.wrap($row)
            .find('input.inputbox-range.min')
            .should(($input) => {
              const actualValue = $input.val().replace(/,/g, '');
              expect(actualValue).to.equal(expectedMin);
            });
        });
    }

}
  
export default new InsightsPage()