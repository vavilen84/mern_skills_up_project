describe('Delete post', () => {

    beforeEach(() => {
        cy.loadFixtures();
    });

    it('Delete post', () => {

        // login
        cy.visit('/');
        cy.login();

        // go to posts page & click post delete
        cy.visit('/posts');
        cy.get('.posts-list').first().contains('Post 11');
        cy.get('.posts-list').first().contains('Delete').click();

        // I see modal confirmation is opened
        cy.get('.modal-content').should('be.visible');
        cy.get('.modal-content').contains('Remove post');
        cy.get('.modal-content').contains('Are you sure you want ot remove the post?');
        cy.get('.modal-content').contains('Delete').click();

        // I dont see post in list
        cy.get('.posts-list').first().should('not.include.text', 'Post 11');

        // I am not able to visit its details page
        cy.visit('/posts/post-11');
        cy.get('.container').contains('404 - Not Found');
    });
});