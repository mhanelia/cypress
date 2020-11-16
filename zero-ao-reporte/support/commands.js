// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Função que cria a ong passando os paramentros sem a necessidade de cadastrar a ong
// na tela de cadastro. Faz com que seja possível testar o login sem a necessidade
// de testar o cadastro

Cypress.Commands.add("createOng", () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/ongs',
        body: {
            name: "Arcadafé",
            email: "arca@mail.com",
            whatsapp: "149999999999",
            city: "Bauru",
            uf: "SP"    
        }
    }).then(response => {
        expect(response.body.id).is.not.null;
        cy.log(response.body.id);

        Cypress.env('createdOngId', response.body.id);
    })
})

Cypress.Commands.add('createNewIncident', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/incidents', 
        headers: { 'Authorization': `${ Cypress.env('createdOngId')}`},
        body: {
            description: "Animal abandonado",
            title: "Animal de rua precisa de casa",
            value: "150"            
        }
    }).then(response =>{
        expect(response.body.id).is.not.null;
        cy.log(response.body.id);

        Cypress.env('createdIncidentID', response.body.id);
    })

})
Cypress.Commands.add('login', () => { 
    cy.visit('http://localhost:3000/profile', { 
        onBeforeLoad: (browser) => {
            browser.localStorage.setItem('ongId', Cypress.env('createdOngId'));    
            browser.localStorage.setItem('ongName', 'Arcadafé');        
        }
    });
    
})