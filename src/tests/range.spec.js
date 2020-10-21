import {mount} from 'cypress-svelte-unit-test';
import RangeInput from '../components/shared/RangeInput.svelte';

describe('RangeInput', () => {
    it('Range input elements and text rendered correctly', () => {
        const testProps = {
            labelText: 'Test',
            outputText: "Span text"
        }
        mount(RangeInput, {    
            props: testProps
        });

        cy.get('.range-input-container').should("exist");
        cy.get('.range-input-container').find('label').should("exist").contains(testProps.labelText);
        cy.get('.range-input-container').find('label').find('input').should("exist").invoke('attr', 'range');
        cy.get('.range-input-container').find('span').should("exist").contains(testProps.outputText);

    });
    it('Range input name & label for attributes have correct values', () => {
        const testProps = {
            name: "test"
        }
        mount(RangeInput, {    
            props: testProps
        });

        cy.get('label').invoke('attr', 'for').should('contain', testProps.name);
        cy.get('input').invoke('attr', 'name').should('contain', testProps.name);
    });
    it('Input attributes have correct values', () => {
        const testProps = {
            min: 1000,
            max: 100000,
            step: 100,
            value: 5000,
        }
        mount(RangeInput, {    
            props: testProps
        });
        cy.get('input').invoke('attr', 'min').should('contain', testProps.min);
        cy.get('input').invoke('attr', 'max').should('contain', testProps.max);
        cy.get('input').invoke('attr', 'step').should('contain', testProps.step);
        cy.get('input').invoke('val').should('contain', testProps.value);
    })
})