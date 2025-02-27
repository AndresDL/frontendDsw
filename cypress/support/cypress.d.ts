import { mount } from 'cypress/angular'

declare namespace Cypress {
    interface Chainable {
        getToken(): void;
    };
};

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}