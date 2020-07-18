import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as pizzasActions from '../actions/pizzas.action';
import * as fromServices from '../../services';
import { of } from 'rxjs';


@Injectable()
export class PizzasEffects {

    constructor(
        private actions$: Actions,
        private pizzasService: fromServices.PizzasService
    ) { }

    @Effect()
    loadPizzas$ = this.actions$.pipe(
        ofType(pizzasActions.LOAD_PIZZAS),
        switchMap(() => {
            return this.pizzasService
                .getPizzas()
                .pipe(
                    map(pizzas => new pizzasActions.LoadPizzasSuccess(pizzas)),
                    catchError(error => of(new pizzasActions.LoadPizzasFail(error)))
                );
        })
    );

    @Effect()
    createPizza$ = this.actions$.pipe(
        ofType(pizzasActions.CREATE_PIZZA),
        map((action: pizzasActions.CreatePizza) => action.payload),
        switchMap(pizza => {
            return this.pizzasService
                .createPizza(pizza)
                .pipe(
                    // tslint:disable-next-line:no-shadowed-variable
                    map(pizza => new pizzasActions.CreatePizzaSuccess(pizza)),
                    catchError(error => of(new pizzasActions.CreatePizzaFail(error)))
                );
        })
    );

    @Effect()
    createPizzaSUccess$ = this.actions$.pipe(
        ofType(pizzasActions.CREATE_PIZZA_SUCCESS),
        map((action: pizzasActions.CreatePizzaSuccess) => action.payload),
        map(pizza => new fromRoot.Go({
            path: ['/products', pizza.id]
        }))
    );

    @Effect()
    updatePizza$ = this.actions$.pipe(
        ofType(pizzasActions.UPDATE_PIZZA),
        map((action: pizzasActions.UpdatePizza) => action.payload),
        switchMap(pizza => {
            return this.pizzasService
                .updatePizza(pizza)
                .pipe(
                    // tslint:disable-next-line:no-shadowed-variable
                    map(pizza => new pizzasActions.UpdatePizzaSuccess(pizza)),
                    catchError(error => of(new pizzasActions.LoadPizzasFail(error)))
                );
        })
    );

    @Effect()
    removePizza$ = this.actions$.pipe(
        ofType(pizzasActions.REMOVE_PIZZA),
        map((action: pizzasActions.RemovePizza) => action.payload),
        switchMap(pizza => {
            return this.pizzasService
                .removePizza(pizza)
                .pipe(
                    // tslint:disable-next-line:no-shadowed-variable
                    map(pizza => new pizzasActions.RemovePizzaSuccess(pizza)),
                    catchError(error => of(new pizzasActions.RemovePizzaFail(error)))
                );
        })
    );

    @Effect()
    handlePizzaSuccess$ = this.actions$.pipe(
        ofType(
            pizzasActions.UPDATE_PIZZA_SUCCESS,
            pizzasActions.REMOVE_PIZZA_SUCCESS,
        ),
        map(_ => new fromRoot.Go({
            path: ['/products']
        }))
    );
}
