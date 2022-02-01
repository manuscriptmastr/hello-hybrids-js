/// <reference types="cypress" />

describe('Checkout', () => {
  it('displays an empty cart', () => {
    cy.visit('/');
    cy.findByLabelText(/cart \(0 items\)/i);
  });
});
