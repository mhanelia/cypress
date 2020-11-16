const el = require('./elements').ELEMENTS;

class NewIncident{
    preencherCadastroCaso(){
        cy.get(el.title).type('Animal de rua');
        cy.get(el.description).type('Animal precisa de um lugar para morar');
        cy.get(el.value).type('200');

        cy.route('POST', '**/incidents').as('newIncident');

        cy.get(el.buttonSave).click();


    }

    validarCadastroCaso(){
        
        cy.wait('@newIncident').then((xhr) =>{
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    }

}
 export default new NewIncident