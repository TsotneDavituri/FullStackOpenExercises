describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Jesse Pinkman',
      username: 'jdog58',
      password: 'yeaascience'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })

  it('front page can be opened', function() {
    cy.visit('')
    cy.contains('Log in to application')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#usernameInput').type('jdog58')
      cy.get('#passwordInput').type('yeaascience')
      cy.get('#loginButton').click()

      cy.contains('Jesse Pinkman is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameInput').type('jdog58')
      cy.get('#passwordInput').type('wrong')
      cy.get('#loginButton').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Jesse Pinkman is logged in')
    })


    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'jdog58', password: 'yeaascience' })
      })

      it('a new blog can be created', function() {
        cy.contains('new blog').click()

        cy.get('#titleInput').type('how to cook meth')
        cy.get('#authorInput').type('Heisenberg')
        cy.get('#urlInput').type('https://www.myshout.us/cpn_cook')
        cy.get('#submitButton').click()

        cy.get('html').should('contain', 'how to cook meth')
        cy.get('html').should('contain', 'Heisenberg')

        cy.get('.notification')
          .should('contain', 'Creation succeeded!')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      it('a blog can be liked', function() {
        cy.createBlog({ title: 'how to cook meth', author: 'Heisenberg', url: 'https://www.myshout.us/cpn_cook' })
        cy.contains('view').click()
        cy.get('#likeButton').click()

        cy.get('.blog')
          .should('contain', '1')
      })

      it('a blog can be deleted by the owner', function() {
        cy.createBlog({ title: 'how to cook meth', author: 'Heisenberg', url: 'https://www.myshout.us/cpn_cook' })
        cy.contains('view').click()

        cy.get('#removeButton').click()

        cy.get('html').should('not.contain', 'how to cook meth')
        cy.get('html').should('not.contain', 'Heisenberg')
        cy.get('html').should('not.contain', 'https://www.myshout.us/cpn_cook')
      })

      it('only the owner can see the delete button', function() {
        const user = {
          name: 'Walter White',
          username: 'TheOneWhoKnocks14',
          password: 'fuckcancer'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

        cy.createBlog({ title: 'how to cook meth', author: 'Heisenberg', url: 'https://www.myshout.us/cpn_cook' })

        cy.get('#logoutButton').click()

        cy.get('#usernameInput').type('TheOneWhoKnocks14')
        cy.get('#passwordInput').type('fuckcancer')
        cy.get('#loginButton').click()

        cy.get('.blog').should('contain', 'how to cook meth')
        cy.get('.blog').should('contain', 'Heisenberg')

        cy.contains('view').click()

        cy.get('.blog').should('not.contain', '#removeButton')
      })

      it('The blogs are ordered by likes', function() {
        cy.createBlog({ title: 'how to cook meth', author: 'Heisenberg', url: 'https://www.chemistry.us' })
        cy.get('.blog').eq(0).contains('view').click()
        cy.get('.blog').eq(0).contains('like').click()
        cy.get('.blog').eq(0).should('contain', '1')
        cy.get('.blog').eq(0).contains('like').click()
        cy.get('.blog').eq(0).should('contain', '2')
        cy.get('.blog').eq(0).contains('like').click()
        cy.get('.blog').eq(0).should('contain', '3')
        cy.get('.blog').eq(0).contains('like').click()
        cy.get('.blog').eq(0).should('contain', '4')
        cy.get('.blog').eq(0).contains('like').click()
        cy.get('.blog').eq(0).should('contain', '5')

        cy.get('.blog').eq(0).contains('hide').click()

        cy.createBlog({ title: 'how to snort coke', author: 'Tuco', url: 'https://www.tuco.us/snort' })
        cy.get('.blog').eq(1).contains('view').click()
        cy.get('.blog').eq(1).contains('like').click()
        cy.get('.blog').eq(1).should('contain', '1')
        cy.get('.blog').eq(1).contains('like').click()
        cy.get('.blog').eq(1).should('contain', '2')
        cy.get('.blog').eq(1).contains('like').click()
        cy.get('.blog').eq(1).should('contain', '3')
        cy.get('.blog').eq(1).contains('like').click()
        cy.get('.blog').eq(1).should('contain', '4')

        cy.get('.blog').eq(1).contains('hide').click()

        cy.createBlog({ title: 'how to be gangsta yo', author: 'Jesse Pinkman', url: 'https://www.myshout.us/cpn_cook' })
        cy.get('.blog').eq(2).contains('view').click()
        cy.get('.blog').eq(2).contains('like').click()
        cy.get('.blog').eq(2).should('contain', '1')
        cy.get('.blog').eq(2).contains('like').click()
        cy.get('.blog').eq(2).should('contain', '2')
        cy.get('.blog').eq(2).contains('like').click()
        cy.get('.blog').eq(2).should('contain', '3')
        cy.get('.blog').eq(2).contains('like').click()
        cy.get('.blog').eq(2).should('contain', '4')
        cy.get('.blog').eq(2).contains('like').click()
        cy.get('.blog').eq(1).should('contain', '5')
        cy.get('.blog').eq(1).contains('like').click()
        cy.get('.blog').eq(0).should('contain', '6')


        cy.get('.blog').eq(0).should('contain', '6')
        cy.get('.blog').eq(1).should('contain', '5')
        cy.get('.blog').eq(2).should('contain', '4')
      })
    })
  })
})