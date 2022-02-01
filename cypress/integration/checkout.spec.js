/// <reference types="cypress" />
import { AVOCADO_TOAST } from '../../items.js';

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
    .get('select')
    .should('have.value', quantity.toString());
};

const updateQuantity = ({ name }, quantity) => {
  cy.get('cart-details')
    .shadow()
    .contains(name)
    .parent('article')
    .get('select')
    .select(quantity.toString());
};

const testOrderTotalIs = (money) => {
  cy.get('order-total').shadow().contains(money);
};

describe('Checkout', () => {
  before(() => {
    cy.visit('/');
  });
  it('displays an empty cart', () => {
    testCartCountIs(0);
    testOrderTotalIs('$0.00');
  });
  it('allows a user to add and remove an item from the cart', () => {
    // Add item
    addItemToCart(AVOCADO_TOAST);
    testHasItemInCart(AVOCADO_TOAST);
    testCartCountIs(1);
    testOrderTotalIs(AVOCADO_TOAST.price);
    // Remove item
    removeItemFromCart(AVOCADO_TOAST);
    testCartCountIs(0);
    testOrderTotalIs('$0.00');
  });
  it('allows a user to update quantity on an item in the cart', () => {
    addItemToCart(AVOCADO_TOAST);
    testQuantityIs(AVOCADO_TOAST, 1);
    updateQuantity(AVOCADO_TOAST, 2);
  });
});
