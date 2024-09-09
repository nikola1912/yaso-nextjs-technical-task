"use client";

import { FC } from "react";

import { Dish } from "@/lib/typings";

interface DishCardProps {
  dish: Dish;
  onEditDish: (dish: Dish) => void;
}

const DishCard: FC<DishCardProps> = ({ dish, onEditDish }) => {
  return (
    <div className="rounded-lg bg-background-card p-6">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-semibold text-text-primary">{dish.name}</h2>
        <span className="rounded-full bg-gray-700 px-2 py-1 text-sm text-text-light">
          Version {dish.version_number}
        </span>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {dish.dish_ingredients.map((dishIngredient, index) => (
          <div
            key={index}
            className="flex items-center rounded-full bg-gray-700 px-2 py-1 text-sm text-text-light"
          >
            <span className="mr-1 font-medium">
              {dishIngredient.ingredient.name}
            </span>
            <span>({dishIngredient.ingredient_amount}%)</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          className="rounded-md border border-primary px-4 py-2 text-primary shadow transition hover:bg-primary-dark"
          onClick={() => onEditDish(dish)}
        >
          Edit Dish
        </button>
        <button className="rounded-md border border-red-500 px-4 py-2 text-red-500 shadow transition hover:bg-red-950">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DishCard;
