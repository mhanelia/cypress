const el = require('./elements').ELEMENTS;
class Profile {
    clicarBotaoLogout(){
        cy.get(el.buttonLogout).click(); 
    }

    clicarBotaoNovosCasos(){
        cy.get(el.buttonNewIncident).click();
    }

    clicarBotaoExcluirCaso(){
        cy.route('DELETE', '**/incidents/*').as('deleteIncidente');

        cy.get(el.buttonDeleteIncident).click();

    }

    validarExclusaoCaso(){
        cy.wait('@deleteIncidente').then((xhr) => {
            expect(xhr.status).to.eq(204);
            expect(xhr.response.body).to.be.empty;
                })

    }
}

export default new Profile();