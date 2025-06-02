import {faker} from "@faker-js/faker";
import dotenv from 'dotenv';
dotenv.config();

Cypress.Commands.add('sendRequest', (url, method, body =null) => {

    cy.request({
        url: url,
        method: method,
        headers: {
            'Authorization': Cypress.env('auth'),
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
        body: body
    })

})

Cypress.Commands.add('getGoals', () => {
    cy.sendRequest('team/90151212666/goal', 'GET')
})

Cypress.Commands.add('getGoal', (id) => {
    cy.sendRequest('goal/'+id, 'GET')
})

Cypress.Commands.add('createGoal', () => {
    cy.sendRequest('team/90151212666/goal', 'POST',  {'name': faker.person.lastName()})
})

Cypress.Commands.add('deleteGoal', (id) => {
    cy.sendRequest(`goal/`+id, 'DELETE')
})

Cypress.Commands.add('updateGoal', (id) => {

    cy.get('@goalId2').then((id) => {
        cy.sendRequest('goal/'+id, 'PUT', {'name': faker.person.firstName()})
    })
})