/// <reference types="Cypress"/>
describe('Teste Excluir Cliente', () => {
  it('Exclui cliente do Banco de Dados', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.clientes').click({ force: true })
    cy.get(':nth-child(5) > :nth-child(6) > :nth-child(2)').click()
    cy.get('.confirm-delete-buttons > :nth-child(1)').click()
    
  });
});