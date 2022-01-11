describe('Posts', () => {

    beforeEach(() => {
        cy.loadFixtures();
    });

    it('I can see posts page', () => {
        cy.visit('/');
        cy.get('.navbar').contains('Posts').click();

        // I am posts page
        cy.url().should('include', '/posts')

        // I can see latest 10 posts
        for (let i = 2; i < 12; i++) {
            cy.get('.posts-list').should('include.text', 'Post ' + i);
        }
    });
});