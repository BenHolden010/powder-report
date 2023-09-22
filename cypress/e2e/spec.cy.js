describe('Powder Report', () => {
  beforeEach('',()=>{
    cy.intercept('GET','https://api.worldweatheronline.com/premium/v1/ski.ashx?key=b5a5dbe0295146dfa83163732231809&q=breckenridge&format=json',{
      statusCode: 201,
      fixture: 'report'
    }).as('report')
    .visit('http://localhost:3000/')
  })
  it('should show home page with a header and form', () => {
    cy.get('.header').contains('button', 'Home').should('be.visible')
    .get('.header').contains('h1', 'Powder Report').should('be.visible')
    .get('.header').contains('button', 'Saved Reports').should('be.visible')
    .get('input[name="location"]').should('be.visible')
    .get('form').contains('button','SUBMIT').should('be.visible')
  })
  it('should allow a user to type in a location and view the snow report', () => {
    cy.get('input[name="location"]').type("breckenridge").should('have.value','breckenridge')
    .get('form').contains('button','SUBMIT').click().wait('@report')
    .url().should('contain','/breckenridge')
    .get('.report').contains('h2','breckenridge Snow Report.')
    .get('.report').contains('p', 'Chance of Snowfall: 10%')
    .get('.report').contains('p','High: 67ºF Low: 46ºF')
    .get('.hour-container').children().should('have.length', 8)
    .get('.hour-container').children().first().contains('h3','12am')
    .get('.hour-container').children().first().contains('p','snow fall: 0.0cm')
    .get('.hour-container').children().last().contains('h3','9pm')
    .get('.hour-container').children().last().contains('p','snow fall: 0.0cm')
    .get('.report').contains('button', 'Save Report')
  })
  it('should allow a user to type in a location and then save the snow report, but not more than once, then view the report and return home to start the process again.', () => {
    cy.get('input[name="location"]').type("breckenridge").should('have.value','breckenridge')
    .get('form').contains('button','SUBMIT').click().wait('@report')
    .get('.report').contains('button', 'Save Report').click()
    .get('.report').contains('button', 'Save Report').click()
    .get('.report').contains('button', 'Save Report').click()
    .get('.header').contains('button', 'Saved Reports').click()
    .url().should('contain','/savedReports')
    .get('.reports-container').children().should('have.length', 1)
    .get('.card').contains('h3','breckenridge')
    .get('.card').contains('p','Current Snowfall: 0.0cm')
    .get('.card').contains('p','Chance of new Snow: 10%')
    .get('.card').contains('button','🗑').click()
    .get('.reports-container').children().should('have.length', 0)
    .get('.header').contains('button','Home').click()
  })
})