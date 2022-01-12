describe('Create new post', () => {

    beforeEach(() => {
        cy.loadFixtures();
    });

    it('Create new post', () => {
        // login and go to posts page
        cy.login();
        cy.visit('/posts');


    });
});