"use client";

import { FC, useState, useTransition } from "react";
import { editDishAction } from "@/app/actions";
import {
  CreateDishIngredient,
  DishIngredient,
  Ingredient,
} from "@/lib/typings";

interface EditDishFormProps {
  dishId: number;
  dishVersion: number;
  dishName: string;
  initialIngredients: DishIngredient[];
  availableIngredients: Ingredient[];
  onCancel: () => void;
}

const EditDishForm: FC<EditDishFormProps> = ({
  dishId,
  dishVersion,
  dishName,
  initialIngredients,
  availableIngredients,
  onCancel,
}) => {
  const [name, setName] = useState(dishName);
  const [ingredients, setIngredients] = useState<CreateDishIngredient[]>(
    initialIngredients.map((ingredient) => ({
      dish_id: ingredient.dish_id,
      ingredient_id: ingredient.ingredient_id,
      ingredient_amount: ingredient.ingredient_amount,
    })),
  );

  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState({
    success: false,
    error: "",
  });

  const handleIngredientChange = (
    index: number,
    field: keyof CreateDishIngredient,
    value: number,
  ) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        dish_id: dishId,
        ingredient_id: availableIngredients[0].id,
        ingredient_amount: 0,
      },
    ]);
  };

  const deleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    startTransition(async () => {
      const result = await editDishAction(formData);

      if (result.error) {
        setState({ success: false, error: result.error });
      } else {
        setState({ success: true, error: "" });
        onCancel();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <input type="hidden" name="dishId" value={dishId.toString()} />
      <input type="hidden" name="dishVersion" value={dishVersion.toString()} />
      <input
        type="hidden"
        name="ingredients"
        value={JSON.stringify(ingredients)}
      />
      <div>
        <label>Dish Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-md bg-background-card p-3"
          placeholder="Enter dish name"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="block">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center space-x-2">
            <select
              value={ingredient.ingredient_id}
              onChange={(e) =>
                handleIngredientChange(
                  index,
                  "ingredient_id",
                  Number(e.target.value),
                )
              }
              className="mt-1 w-full rounded-md bg-background-card p-3"
            >
              {availableIngredients.map((availableIngredient) => (
                <option
                  key={availableIngredient.id}
                  value={availableIngredient.id}
                >
                  {availableIngredient.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={ingredient.ingredient_amount.toString()}
              onChange={(e) =>
                handleIngredientChange(
                  index,
                  "ingredient_amount",
                  Number(e.target.value),
                )
              }
              className="mt-1 w-20 rounded-md bg-background-card p-3"
              placeholder="%"
              required
            />

            <button
              type="button"
              onClick={() => deleteIngredient(index)}
              className="text-red-500 transition hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="mt-2 text-primary"
        >
          + Add Ingredient
        </button>
      </div>
      {state.error && (
        <p className="whitespace-pre-line text-red-500">{state.error}</p>
      )}
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isPending}
          className={`rounded-md px-4 py-2 shadow transition ${
            isPending
              ? "cursor-not-allowed bg-gray-400"
              : "bg-primary hover:bg-primary-dark"
          }`}
        >
          {isPending ? "Updating..." : "Update Dish"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-red-500 px-4 py-2 text-red-500 shadow transition hover:bg-red-950"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditDishForm;
