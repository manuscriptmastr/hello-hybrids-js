/// <reference types="cypress" />
import currency from 'currency.js';
import { AVOCADO_TOAST, CHEESE_BURGER, EGGS_BENEDICT } from '../../items.js';

// Utils
export const add = (a, b) => currency(a).add(b).format();

export const sum = (moneys) => moneys.reduce(add, '$0.00');

export const multiply = (value, rate) =>
  currency(value).multiply(rate).format();

const addItemToCart = ({ name }) => {
  cy.get('app-menu')
    .shadow()
    .contains(name)
    .parent('article')
    .contains('button', 'Buy')
    .click();
};

const removeItemFromCart = ({ name }) => {
  cy.get('cart-details')
    .shadow()
    .contains(name)
    .parent('article')
    .contains('button', 'x')
    .click();
};

const testHasItemInCart = ({ name }) => {
  cy.get('cart-details').shadow().contains(name);
};

const testCartCountIs = (count) => {
  cy.get('cart-details')
    .shadow()
    .within(() => {
      if (count === 0) {
        cy.contains('Cart (0 Items)');
        cy.contains('Your cart is empty.');
      } else {
        cy.contains(`Cart (${count} ${count === 1 ? 'Item' : 'Items'})`);
      }
    });
};

const testQuantityIs = ({ name }, quantity) => {
  cy.get('cart-details')
    .shadow()
    .contains(name)
    .parent('article')
    .within(() => {
      cy.get('select').should('have.value', quantity.toString());
    });
};

const setQuantity = ({ name }, quantity) => {
  cy.get('cart-details')
    .shadow()
    .contains(name)
    .parent('article')
    .within(() => {
      cy.get('select').select(quantity.toString());
    });
};

const testOrderTotalIs = (money) => {
  cy.get('order-total').shadow().contains(money);
};

const type = (label, text) => {
  cy.get('customer-information')
    .shadow()
    .within(() => {
      cy.get(`form-input[label="${label}"]`)
        .shadow()
        .within(() => {
          cy.get('input').type(text, { force: true });
        });
    });
};

const testSubmitButtonIsDisabled = (disabled = true) => {
  cy.get('order-total')
    .shadow()
    .contains('button', 'Submit Order')
    .should(disabled ? 'be.disabled' : 'not.be.disabled');
};

describe('Checkout', () => {
  beforeEach(() => {
    cy.clearSessionStorage();
    cy.visit('/');
  });
  it('displays an empty cart', () => {
    testCartCountIs(0);
    testOrderTotalIs('$0.00');
  });
  it('allows a user to add and remove an item from the cart', () => {
    addItemToCart(AVOCADO_TOAST);
    testHasItemInCart(AVOCADO_TOAST);
    testCartCountIs(1);
    testOrderTotalIs(AVOCADO_TOAST.price);

    removeItemFromCart(AVOCADO_TOAST);
    testCartCountIs(0);
    testOrderTotalIs('$0.00');
  });
  it('allows a user to update quantity on an item in the cart', () => {
    addItemToCart(AVOCADO_TOAST);
    testQuantityIs(AVOCADO_TOAST, 1);
    testOrderTotalIs(AVOCADO_TOAST.price);
    setQuantity(AVOCADO_TOAST, 2);
    testOrderTotalIs(multiply(AVOCADO_TOAST.price, 2));
  });
  it('disallows a user from adding a redundant item to the cart', () => {
    addItemToCart(AVOCADO_TOAST);
    testCartCountIs(1);
    testQuantityIs(AVOCADO_TOAST, 1);
    cy.get('app-menu')
      .shadow()
      .contains(AVOCADO_TOAST.name)
      .parent('article')
      .contains('button', 'Buy')
      .should('be.disabled');
  });
  it('allows a user to add multiple unique items to the cart', () => {
    addItemToCart(AVOCADO_TOAST);
    addItemToCart(CHEESE_BURGER);
    addItemToCart(EGGS_BENEDICT);
    testCartCountIs(3);
    testOrderTotalIs(
      sum([AVOCADO_TOAST.price, CHEESE_BURGER.price, EGGS_BENEDICT.price])
    );
    setQuantity(CHEESE_BURGER, 2);
    setQuantity(EGGS_BENEDICT, 3);
    testCartCountIs(6);
    testOrderTotalIs(
      sum([
        AVOCADO_TOAST.price,
        multiply(CHEESE_BURGER.price, 2),
        multiply(EGGS_BENEDICT.price, 3),
      ])
    );
  });
  it("preserves a user's cart when browser refreshes", () => {
    addItemToCart(AVOCADO_TOAST);
    setQuantity(AVOCADO_TOAST, 1);
    addItemToCart(CHEESE_BURGER);
    setQuantity(CHEESE_BURGER, 2);
    addItemToCart(EGGS_BENEDICT);
    setQuantity(EGGS_BENEDICT, 3);

    cy.reload();

    testHasItemInCart(AVOCADO_TOAST);
    testQuantityIs(AVOCADO_TOAST, 1);
    testHasItemInCart(CHEESE_BURGER);
    testQuantityIs(CHEESE_BURGER, 2);
    testHasItemInCart(EGGS_BENEDICT);
    testQuantityIs(EGGS_BENEDICT, 3);
  });
  it('disallows user from submitting an order until the cart has at least one item and customer information is filled out', () => {
    testSubmitButtonIsDisabled();
    addItemToCart(AVOCADO_TOAST);
    testSubmitButtonIsDisabled();
    type('First Name', 'Joshua');
    type('Last Name', 'Martin');
    type('Email Address', 'me@me.com');
    type('Phone Number', '555-666-7777');
    type('Date of Birth', '01/01/2000');
    testSubmitButtonIsDisabled(false);
  });
});
