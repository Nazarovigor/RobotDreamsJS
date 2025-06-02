import {faker} from '@faker-js/faker';

describe("Test goals on Clickup", () => {

    let name1, name2, id1, id2;

    it('Get Goals - Should send get request and return 200 code', () => {

        cy.createGoal()
            .then((response) => {
                expect(response.status).to.eq(200)
                name1 = response.body.goal.name
                id1 = response.body.goal.id


                cy.createGoal()
                    .then((response) => {
                        expect(response.status).to.eq(200)
                        name2 = response.body.goal.name
                        id2 = response.body.goal.id


                        cy.getGoals()
                            .then((response) => {
                                expect(response.status).to.eq(200)
                                expect(response.body.goals[0].name).to.eq(name1)
                                expect(response.body.goals[1].name).to.eq(name2)

                            });

                        cy.deleteGoal(id1);
                        cy.deleteGoal(id2)

                    });


            });


    });

    it('Create goal - Should send Post request and return 200 code', () => {

        cy.createGoal()
            .then((response) => {
                expect(response.status).to.eq(200)
                cy.wrap(response.body.goal.id).as('goalId')

            });
        cy.get('@goalId').then((goalId) => {

            cy.deleteGoal(goalId)
                .then((response) => {
                    expect(response.status).to.eq(200)

                });
        });

    })

    it('Get goal - Should send Get request and return 200 code', () => {

        cy.createGoal()
            .then((response) => {
                expect(response.status).to.eq(200)
                cy.wrap(response.body.goal.id).as('goalId1')

            });
        cy.get('@goalId1').then((goalId1) => {

            cy.getGoal(goalId1)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.goal.id).to.eq(goalId1)

                });

            cy.deleteGoal(goalId1);

        });

    })



    it('Update goal - Should sent PUT request and return 200 code', () => {


        cy.createGoal()
            .then((response) =>{
                cy.wrap(response.body.goal.id).as('goalId2')

            })

        cy.get('@goalId2')
            .then((goalId2) => {
            cy.updateGoal(goalId2)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    cy.wrap(response.body.goal.name).as('name3')
                })
        })

        cy.get('@name3')
            .then((name3) => {
                cy.getGoals()
                    .then((response) => {
                        expect(response.body.goals[0].name).to.eq(name3)
                    })
            })


        cy.get('@goalId2').then((goalId2) => {

            cy.deleteGoal(goalId2)
                .then((response) => {
                    expect(response.status).to.eq(200)

                })
         })
    })

    it('Delete goal - Should send Delete request and return 200 code', () => {

        cy.createGoal()
            .then((response) => {
                expect(response.status).to.eq(200)
                cy.wrap(response.body.goal.id).as('goalId3')

            });
        cy.get('@goalId3').then((goalId3) => {

            cy.getGoal(goalId3)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.goal.id).to.eq(goalId3)

                });

            cy.deleteGoal(goalId3)
                .then((response) => {
                    expect(response.status).to.eq(200)

                });

        });

    })

})