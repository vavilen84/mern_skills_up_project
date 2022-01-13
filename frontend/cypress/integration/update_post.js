describe('Update post', () => {

    beforeEach(() => {
        cy.loadFixtures();
    });

    it('Update post', () => {

        // login
        cy.visit('/');
        cy.login();

        // go to posts page & click post update
        cy.visit('/posts');
        cy.get('.posts-list').first().contains('Update').click();
        cy.url().should('include', '/posts/update/post-11');


        // fill & submit create post form
        cy.get('input[name="title"]').clear();
        cy.get('input[name="title"]').type('updated_title');

        cy.get('input[name="url"]').clear();
        cy.get('input[name="url"]').type('updated_url');

        cy.get('textarea[name="content"]').clear();
        cy.get('textarea[name="content"]').type('updated_content');

        cy.get('input[type="submit"]').click();

        // I should see success alert message
        cy.get('.alertBlock.success.visible').contains('Updated!');

        // I see current url is updated
        cy.url().should('include', '/posts/update/updated_url');

        // reload page
        cy.visit('/posts/update/updated_url')

        // see form contains updated data
        cy.get('input[name="title"]').should('have.value', 'updated_title')
        cy.get('input[name="url"]').should('have.value', 'updated_url')
        cy.get('textarea[name="content"]').should('have.text', 'updated_content')
    });
});