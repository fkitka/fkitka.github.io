import { Dish } from "../dishes/dish";

export interface Item {
    item: Dish;
    key: string;
    quantity: number;
}