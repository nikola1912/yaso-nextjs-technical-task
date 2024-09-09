export interface Ingredient {
  id: number;
  name: string;
  created_at: string;
}

export interface DishIngredient {
  id: number;
  dish_id: number;
  ingredient: Ingredient;
  ingredient_id: number;
  ingredient_amount: number;
  created_at: string;
}

export interface Dish {
  id: number;
  chef_id: string;
  name: string;
  dish_ingredients: DishIngredient[];
  version_number: number;
  created_at: string;
}

export interface CreateDishIngredient {
  dish_id: number;
  ingredient_id: number;
  ingredient_amount: number;
}
