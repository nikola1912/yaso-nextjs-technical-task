"use client";

import { FC, useState } from "react";

import { Dish, Ingredient } from "@/lib/typings";
import DishCard from "@/components/DishCard";
import EditDishForm from "@/components/EditDishForm";

interface ChefDashboardProps {
  dishes: Dish[];
  availableIngredients: Ingredient[];
}

const ChefDashboard: FC<ChefDashboardProps> = ({
  dishes,
  availableIngredients,
}) => {
  const [editingDish, setEditingDish] = useState<null | Dish>(null);

  return (
    <div>
      {editingDish && (
        <EditDishForm
          key={editingDish.id}
          dishId={editingDish.id}
          dishVersion={editingDish.version_number}
          dishName={editingDish.name}
          initialIngredients={editingDish.dish_ingredients}
          availableIngredients={availableIngredients}
          onCancel={() => setEditingDish(null)}
        />
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onEditDish={() => setEditingDish(dish)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChefDashboard;
