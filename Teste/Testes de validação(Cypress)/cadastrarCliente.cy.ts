/// <reference types="Cypress"/>
describe('Teste Cadastrar Cliente', () => {
  it('Cadastrar cliente no Banco De Dados', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.clientes').click({ force: true })
    cy.get('footer > button').click()
    cy.get('[name="id"]').type('1233243')
    cy.get('[name="cpf"]').type('234235232')
    cy.get('[name="nome"]').type('teste')
    cy.get('[name="telefone"]').type('1233')
    cy.get('[name="email"]').type('teste')
    cy.get('.botaoCadastrar').click()
  });
});