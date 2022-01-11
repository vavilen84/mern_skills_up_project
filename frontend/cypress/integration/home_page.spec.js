describe('Home page', () => {

    beforeEach(() => {
        cy.loadFixtures();
    });

    it('I can see home page', () => {
        cy.visit('/');

        // header navigation
        cy.get('.navbar').contains('Home');
        cy.get('.navbar').contains('Posts');
        cy.get('.navbar').contains('Login');

        // home page content
        cy.get('.container').contains('Home Page Heading');
        cy.get('.container').contains('The standard Lorem Ipsum passage, used since the 1500s ');

        // footer
        cy.get('.footer').contains('vavilen84');
    });
});