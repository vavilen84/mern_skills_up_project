describe('Create new post', () => {

    beforeEach(() => {
        cy.loadFixtures();
    });

    it('Create new post', () => {

        // login
        cy.visit('/');
        cy.login();

        // go to posts page
        cy.visit('/posts');

        // click create new post btn
        cy.get('.container').contains('Create New Post').click();
        cy.url().should('include', '/posts/create');

        // fill & submit create post form
        cy.get('input[name="title"]').type('title');
        cy.get('input[name="url"]').type('new_post_url');
        cy.get('textarea[name="content"]').type('content');
        cy.fixture('example_image.png').as('postImage');
        cy.get('input[name="image"]').then(function (el) {
            // convert the logo base64 string to a blob
            const blob = Cypress.Blob.base64StringToBlob(this.postImage, 'image/png')

            const file = new File([blob], 'example_image.png', { type: 'image/png' })
            const list = new DataTransfer()

            list.items.add(file)
            const myFileList = list.files

            el[0].files = myFileList
            el[0].dispatchEvent(new Event('change', { bubbles: true }))
        });
        cy.get('input[type="submit"]').click();

        // I should be on posts index page and see new post is created
        cy.visit('/posts');
        cy.get('.posts-list').first().contains('title').click();

        // I can see created post details
        cy.url().should('include', '/posts/new_post_url');
        cy.get('.post').find('h1').contains('title');
        cy.get('.post').find('.content').contains('content');
        cy.get('.post').find('img').should('be.visible');
    });
});