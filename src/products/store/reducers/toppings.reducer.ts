import * as fromToppings from '../actions/toppings.action';
import { Topping } from '../../models/topping.model';

export interface ToppingState {
    entities: { [id: number]: Topping };
    loaded: boolean;
    loading: boolean;
    selectedToppings: number[];
}


export const initialState: ToppingState = {
    entities: {},
    loaded: false,
    loading: false,
    selectedToppings: []
};

export function reducer(
    state = initialState,
    action: fromToppings.ToppingAction
): ToppingState {


    switch (action.type) {

        case fromToppings.VISUALISE_TOPPINGS: {
            const selectedToppings = action.payload;

            return {
                ...state,
                selectedToppings,
            };
        }

        case fromToppings.LOAD_TOPPINGS: {
            return {
                ...state,
                loading: true
            };
        }
        case fromToppings.LOAD_TOPPINGS_SUCCESS: {
            const toppings = action.payload;

            // tslint:disable-next-line:no-shadowed-variable
            const entities = toppings.reduce((entities: { [id: number]: Topping }, topping: Topping) => ({
                ...entities,
                [topping.id]: topping
            }),
                { ...state.entities });

            return {
                ...state,
                loading: false,
                loaded: true,
                entities
            };
        }
        case fromToppings.LOAD_TOPPINGS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
    }
    return state;
}

export const getToppingEntities = (state: ToppingState) => state.entities;
export const getToppingsLoaded = (state: ToppingState) => state.loaded;
export const getToppingsLoading = (state: ToppingState) => state.loading;
export const getSelectedToppings = (state: ToppingState) => state.selectedToppings;
