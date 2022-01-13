describe('Login/Logout', () => {

    beforeEach(() => {
        cy.loadFixtures();
    });

    it('Login/Logout', () => {
        cy.visit('/');

        // I can not see logout btn before login
        cy.get('.navigation').should('not.include.text', 'Logout');
        // I can not see admin buttons on posts page before login
        cy.visit('/posts');
        cy.get('.container').should('not.include.text', 'Create New Post');
        cy.get('.posts-list li').first().should('not.include.text', 'Update');
        cy.get('.posts-list li').first().should('not.include.text', 'Delete');

        cy.login();

        // I can see logout btn instead of login btn
        cy.get('.navigation').contains('Logout');

        // I can see admin buttons on posts page
        cy.visit('/posts');
        cy.get('.container').contains('Create New Post');
        cy.get('.posts-list li').first().contains('Update');
        cy.get('.posts-list li').first().contains('Delete');

        // logout
        cy.get('.navigation').contains('Logout').click();
        cy.get('.navigation').should('include.text', 'Login');
        cy.get('.navigation').should('not.include.text', 'Logout');
        cy.visit('/posts');
        cy.get('.container').should('not.include.text', 'Create New Post');
        cy.get('.posts-list li').first().should('not.include.text', 'Update');
        cy.get('.posts-list li').first().should('not.include.text', 'Delete');
    });
});