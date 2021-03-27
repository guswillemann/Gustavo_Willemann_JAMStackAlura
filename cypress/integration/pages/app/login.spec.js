/// <reference types="cypress" />

describe('/pages/app/login/', () => {
  it('fill the imputs and access /app/profile', () => {
    cy.visit('/app/login/');
    cy.get('#loginForm input[name="usuario"]').type('testuser');
    cy.get('#loginForm input[name="senha"]').type('senhasegura');
    cy.get('#loginForm button[type="submit"]').click();
    cy.url().should('include', '/app/profile');
  });
});
