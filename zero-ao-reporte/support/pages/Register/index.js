const el = require('./elements').ELEMENTS;

class Register {
    acessarCadastro(){
        cy.visit('http://localhost:3000/register');
    }
    //cy.get() - busca um elemento
    //.type() insere um texto
    preencherCadastro(){
        cy.get(el.name).type('Arcadafé');
        cy.get(el.email).type('arca@mail.com');
        cy.get(el.whatsapp).type('14999999999');
        cy.get(el.city).type('Bauru');
        cy.get(el.uf).type('SP');

        //routing:
        //start server com cy.servers() - adicionado ao index.js para que seja executado a cada teste
        //criar rota com cy.route()
        //atribuir rota a um alias
        //esperar com cy.wait e fazer uma validação

        //deve ser passado antes de executar o clique no botão de submit para que ele começe a ouvir 
        //as ações antes de clicar

        
        //POST é o método, o ** é um coringa da URL mas o /ongs o sistema sempre acessa
        //o as() ele salva o resultado em uma variável (alias) que é dada dentro do as(''), no caso postOng
        cy.route('POST','**/ongs').as('postOng');

        cy.get(el.submit).click();


    }

    validarCadastroONG(){
        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        });
    }
}

export default new Register();