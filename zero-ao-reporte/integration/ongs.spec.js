/// <reference types="cypress" />

import Logon from '../support/pages/Logon';
import Register from '../support/pages/Register';   
import Profile from '../support/pages/Profile';   
import NewIncident from '../support/pages/NewIncident';

describe('Ongs', () => {

    it('devem poder realizar um cadastro', () => {

        Register.acessarCadastro();
        Register.preencherCadastro();
        Register.validarCadastroONG();
                
    });

    it('deve poder realizar um login no sistema', () => {
        // cy.visit('http://localhost:3000/');
        // cy.get('[data-cy=id]').type(Cypress.env('createdOngId'));
        // cy.get('[data-cy=button-login]').click();

        Logon.acessarLogin();
        Logon.preencherLogin();


    });

    it('devem poder fazer logout', ()=> {
       cy.login();
       Profile.clicarBotaoLogout();
      
        
    });

    it('devem poder cadastrar novos casos', ()=> {
        cy.login();

        Profile.clicarBotaoNovosCasos();

        NewIncident.preencherCadastroCaso();
        NewIncident.validarCadastroCaso();

        
    });

    it('devem poder excluir um caso', ()=> {
        cy.createNewIncident();
        cy.login();
        Profile.clicarBotaoExcluirCaso();
        Profile.validarExclusaoCaso();
    });

});


