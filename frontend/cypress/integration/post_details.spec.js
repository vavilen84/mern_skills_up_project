describe('Post Details', () => {

    beforeEach(() => {
        cy.loadFixtures();
    });

    it('Post Details', () => {
        // go to posts page and click a post details link
        cy.visit('/posts');
        cy.get('.posts-list').contains('Post 11').click();

        // I am on post details page
        cy.url().should('include', '/posts/post-11');

        // I can see post content
        cy.get('.post').find('h1').contains('Post 11');
        cy.get('.post').find('.description').contains('three, four');
        cy.get('.post').find('.content').contains('content string');
        cy.get('.post').find('img').should('be.visible');

    });
});