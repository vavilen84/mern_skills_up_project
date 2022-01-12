Cypress.Commands.add('loadFixtures', () => {
    let cmd = "cd .. && make load-fixtures";
    cy.exec(cmd).then((result) => {
        cy.log(result);
    });
});

Cypress.Commands.add('login', () => {
    cy.visit('/login');
    cy.get('[name="username"]').type("username1");
    cy.get('[name="password"]').type("password1");
    cy.get('[type="submit"]').click();
});