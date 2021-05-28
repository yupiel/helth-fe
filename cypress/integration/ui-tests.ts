context('Register', () => {
	function makeid(length: number) {
		var result = [];
		var characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result.push(
				characters.charAt(Math.floor(Math.random() * charactersLength))
			);
		}
		return result.join('');
	}

	const cypressUsername = `cypress-${makeid(10)}`;

	it('user can register and login with correct length username and password and gets redirected properly', () => {
		cy.visit('http://localhost:3000/#/register');

		cy.get('[data-cy=username]')
			.type(cypressUsername)
			.should('have.value', cypressUsername);

		cy.get('[data-cy=password]')
			.type('cypress-pass')
			.should('have.value', 'cypress-pass');

		cy.get('[data-cy=submit]').click();
		//REGISTER END

		cy.url().should('eq', 'http://localhost:3000/#/login');

		cy.get('[data-cy=username]')
			.type(cypressUsername)
			.should('have.value', cypressUsername);

		cy.get('[data-cy=password]')
			.type('cypress-pass')
			.should('have.value', 'cypress-pass');

		cy.get('[data-cy=submit]').click();
		//LOGIN END

		cy.url().should('eq', 'http://localhost:3000/#/');
		//HOMEPAGE END
	});

	it('user can not register because the username is in use and gets an error message', () => {
		cy.visit('http://localhost:3000/#/register');
		cy.url().should('eq', 'http://localhost:3000/#/register');

		cy.get('[data-cy=username]')
			.type(cypressUsername)
			.should('have.value', cypressUsername);

		cy.get('[data-cy=password]')
			.type('cypress-pass')
			.should('have.value', 'cypress-pass');

		cy.get('[data-cy=submit]').click();

		cy.get('.notification')
			.should('have.class', 'is-danger')
			.should('exist');

		cy.url().should('not.eq', 'http://localhost:3000/#/login');
		cy.url().should('eq', 'http://localhost:3000/#/register');
	});

	it('user can register but gets an error message when logging in with incorrect password and does not get redirected', () => {
		cy.visit('http://localhost:3000/#/register');
		cy.url().should('eq', 'http://localhost:3000/#/register');

		const negativeCaseUser = `cypress-${makeid(10)}`;

		cy.get('[data-cy=username]')
			.type(negativeCaseUser)
			.should('have.value', negativeCaseUser);

		cy.get('[data-cy=password]')
			.type('cypress-pass')
			.should('have.value', 'cypress-pass');

		cy.get('[data-cy=submit]').click();

		cy.url().should('eq', 'http://localhost:3000/#/login');

		cy.get('[data-cy=username]')
			.type(negativeCaseUser)
			.should('have.value', negativeCaseUser);

		cy.get('[data-cy=password]')
			.type('cypress-wrong-pass')
			.should('have.value', 'cypress-wrong-pass');

		cy.get('[data-cy=submit]').click();

		cy.get('.notification')
			.should('have.class', 'is-danger')
			.should('exist');

		cy.url().should('not.eq', 'http://localhost:3000/#/');
		cy.url().should('eq', 'http://localhost:3000/#/login');
	});

	it('create new activity of every type that should add to the activity list on the homepage', () => {
		cy.visit('http://localhost:3000/#/login');

		cy.get('[data-cy=username]')
			.type(cypressUsername)
			.should('have.value', cypressUsername);

		cy.get('[data-cy=password]')
			.type('cypress-pass')
			.should('have.value', 'cypress-pass');

		cy.get('[data-cy=submit]').click();

		cy.url().should('eq', 'http://localhost:3000/#/');

		const fillFormAndSubmit = (type: string) => {
			cy.get('[data-cy=new-activity-dialogue-type]').select(type);
			cy.get('[data-cy=new-activity-dialogue-submit]').click();
		};

		cy.get('[data-cy=new-activity-dialogue-add]').click();

		fillFormAndSubmit('Drink Water');
		fillFormAndSubmit('Walking');
		fillFormAndSubmit('Running');
		fillFormAndSubmit('Cycling');
		fillFormAndSubmit('Swimming');
		fillFormAndSubmit('Calisthenics');

		cy.get('[data-cy=new-activity-dialogue-add]').click();

		cy.get('[data-cy=activities-list]')
			.find('[data-cy=activity-entry]')
			.should('have.length', 6);
	});

	it('create new challenge for each type of activity and check if it is set in progress', () => {
		cy.visit('http://localhost:3000/#/login');
		cy.url().should('eq', 'http://localhost:3000/#/login');

		cy.get('[data-cy=username]')
			.type(cypressUsername)
			.should('have.value', cypressUsername);

		cy.get('[data-cy=password]')
			.type('cypress-pass')
			.should('have.value', 'cypress-pass');

		cy.get('[data-cy=submit]').click();

		cy.url().should('eq', 'http://localhost:3000/#/');

		cy.visit('http://localhost:3000/#/challenges');
		cy.url().should('eq', 'http://localhost:3000/#/challenges');

		const fillFormAndSubmit = (
			type: string,
			goal: number,
			weeks: number
		) => {
			cy.get('[data-cy=challenge-add-dialogue-type]').select(type);

			cy.get('[data-cy=challenge-add-dialogue-goal]').clear();
			cy.get('[data-cy=challenge-add-dialogue-goal]').type(
				goal.toString()
			);

			cy.get('[data-cy=challenge-add-dialogue-weeks]').clear();
			cy.get('[data-cy=challenge-add-dialogue-weeks]').type(
				weeks.toString()
			);

			cy.get('[data-cy=challenge-add-dialogue-submit]').click();
		};

		cy.get('[data-cy=new-challenge-dialogue-add]').click();

		fillFormAndSubmit('Drink Water', 1, 1);
		fillFormAndSubmit('Walking', 2, 1);
		fillFormAndSubmit('Running', 3, 2);
		fillFormAndSubmit('Cycling', 4, 2);
		fillFormAndSubmit('Swimming', 5, 3);
		fillFormAndSubmit('Calisthenics', 6, 4);

		cy.get('[data-cy=new-challenge-dialogue-add]').click();

		cy.get('[data-cy=challenges-list]')
			.find('[data-cy=challenge-entry]')
			.should('have.length', 6);
	});
});

export {};
