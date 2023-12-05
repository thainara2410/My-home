/// <reference types="Cypress"/>
describe('Teste Consultar Cliente', () => {
  it('Recuperar cliente do Banco de Dados', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.clientes').click({ force: true })
    cy.get('input').type('Gustavo')
    cy.get('.retangulo').click()
    
  });
});