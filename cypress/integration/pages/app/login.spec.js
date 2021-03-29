/// <reference types="cypress" />

describe('/pages/app/login/', () => {
  it('fills the imputs and access /app/profile', () => {
    cy.intercept('https://instalura-api-git-master-omariosouto.vercel.app/api/login')
      .as('userLogin');
    cy.visit('/app/login/');
    cy.get('#formLogin input[name="user"]').type('omariosouto');
    cy.get('#formLogin input[name="password"]').type('senhasegura');
    cy.get('#formLogin button[type="submit"]').click();
    cy.url().should('include', '/app/profile');
    cy.wait('@userLogin')
      .then((intercept) => {
        const { token } = intercept.response.body.data;
        cy.getCookie('APP_TOKEN')
          .should('exist')
          .should('have.property', 'value', token);
      });
  });
});
