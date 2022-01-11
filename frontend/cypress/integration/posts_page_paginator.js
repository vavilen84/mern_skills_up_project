describe('Posts page paginator', () => {

    beforeEach(() => {
        cy.loadFixtures();
    });

    it('Posts page paginator', () => {
        cy.visit('/posts');

        // I can see paginator and 2 available pages; first page is active
        cy.get('#paginator').contains('1').should('have.class', 'active');
        cy.get('#paginator').contains('2').should('not.have.class', 'active');

        // click on 2ns page btn
        cy.get('#paginator').contains('2').click();

        // see active page btn is 2nd
        cy.get('#paginator').contains('1').should('not.have.class', 'active');
        cy.get('#paginator').contains('2').should('have.class', 'active');

        // I can see the first post
        cy.get('.posts-list').contains('Post 1');
        cy.get('.posts-list li').should('have.length', 1);
        cy.get('.posts-list').should('include.text', 'Post 1');

        // I dont see posts from the first page
        for (let i = 2; i < 12; i++) {
            cy.get('.posts-list').should('not.include.text', 'Post ' + i);
        }

        // click prev btn
        cy.get('#paginator').contains('Prev').click();
        cy.get('#paginator').contains('1').should('have.class', 'active');
        cy.get('#paginator').contains('2').should('not.have.class', 'active');
        for (let i = 2; i < 12; i++) {
            cy.get('.posts-list').should('include.text', 'Post ' + i);
        }

        // click next btn
        cy.get('#paginator').contains('Next').click();
        cy.get('#paginator').contains('1').should('not.have.class', 'active');
        cy.get('#paginator').contains('2').should('have.class', 'active');
        for (let i = 2; i < 12; i++) {
            cy.get('.posts-list').should('not.include.text', 'Post ' + i);
        }
        cy.get('.posts-list').should('include.text', 'Post 1');

    });
});