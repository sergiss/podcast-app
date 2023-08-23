import React from 'react'
import App from '../../src/App'
describe('PodcastList.cy.tsx', () => {
  it('playground', () => {
    cy.mount(<App />);
    cy.get('[data-testid="podcast-item"]').should('have.length.at.least', 1);
  });
  it('opens the first podcast', () => {
    cy.mount(<App />);
    cy.get('[data-testid="podcast-item"]').first().click();
    cy.url().should('include', '/podcast/');
  });
});
