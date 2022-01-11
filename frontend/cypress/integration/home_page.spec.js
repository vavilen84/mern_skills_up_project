describe('Login', () => {

    beforeEach(() => {
        cy.loadFixtures();
    });

    it('I can see home page', () => {
        cy.visit('/');
        cy.get('.container').contains('Home Page Heading');
    });
});