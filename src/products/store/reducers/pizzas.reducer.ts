import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from 'src/products/models/pizza.model';


export interface PizzaState {
    entities: { [id: number]: Pizza };
    loaded: boolean;
    loading: boolean;
}

export const initialState: PizzaState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromPizzas.PizzasAction
): PizzaState {
    switch (action.type) {
        case fromPizzas.LOAD_PIZZAS: {
            return {
                ...state,
                loading: true
            };
        }

        case fromPizzas.LOAD_PIZZAS_SUCCESS: {

            const pizzas = action.payload;

            // tslint:disable-next-line:no-shadowed-variable
            const entities = pizzas.reduce((entities: { [id: number]: Pizza }, pizza: Pizza) => ({
                ...entities,
                [pizza.id]: pizza
            }),
                { ...state.entities });

            return {
                ...state,
                loaded: true,
                loading: false,
                entities
            };
        }

        case fromPizzas.LOAD_PIZZAS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }

        case fromPizzas.UPDATE_PIZZA_SUCCESS:
        case fromPizzas.CREATE_PIZZA_SUCCESS: {
            const pizza = action.payload;
            const entities = {
                ...state.entities,
                [pizza.id]: pizza

            };
            return {
                ...state,
                entities
            };
        }
        case fromPizzas.REMOVE_PIZZA_SUCCESS: {
            const pizza = action.payload;

            // a rota de delete deve retornar o item deletado
            const { [pizza.id]: removed, ...entities } = state.entities;

            console.log(removed, entities);

            return {
                ...state,
                entities,
            };
        }
    }

    return state;
}


export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
