// Write tests here!

describe('PizzaForm test', () => {
    //***** Get to the website *****

    //What is it doing
    it('navigate to http://localhost:3000/order', () => {
        //going to website
        cy.visit('http://localhost:3000/order')
        //assuring i'm in the right place
        cy.url().should('includes', 'localhost')
    })
    //Filling out name
    it('Inputs name into name field', () => {
        cy.get('input[name="name"]').type('Matthew').should('have.value', 'Matthew')
    })
    //Selecting Pizza Size
    it('Selects Pizza Size', () => {
        cy.get('select').select('large')
    })
    //Picking Sauce
    it('Picks a sauce', () => {
        cy.get('input[type="radio"]').first().check()
    })
    //Checking if all toppings work
    it('Picks toppings', () => {
        cy.get('[type="checkbox"]').check()
    })
    //Special instuctions
    it('Puts in special Instruction', () => {
        cy.get('input[name="special"]').type('Contactless Please').should('have.value', 'Contactless Please')
    })
    //submiting order
    it('Submits My Order', () => {
        cy.get('#submit').click()
    })
})