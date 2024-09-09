"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

const editDishSchema = z.object({
  dishId: z.string().min(1, "Dish ID is required"),
  dishVersion: z.number().min(1, "Version must be a positive number"),
  name: z.string().min(1, "Dish name is required"),
  ingredients: z
    .object({
      dish_id: z.number(),
      ingredient_id: z.number(),
      ingredient_amount: z.number().min(0).max(100),
    })
    .array()
    .refine(
      (ingredients) => {
        const totalAmount = ingredients.reduce(
          (sum, ingredient) => sum + ingredient.ingredient_amount,
          0,
        );
        return totalAmount === 100;
      },
      { message: "Ingredient amounts must add up to 100%" },
    ),
});

export interface EditDishFormState {
  success: boolean;
  error?: string;
}

export async function editDishAction(formData: FormData) {
  const supabase = createClient();

  const validationResult = editDishSchema.safeParse({
    dishId: formData.get("dishId"),
    dishVersion: Number(formData.get("dishVersion")),
    name: formData.get("name"),
    ingredients: JSON.parse(formData.get("ingredients") as string),
  });

  if (!validationResult.success) {
    const error = validationResult.error.errors
      .map((err) => err.message)
      .join("\n");

    console.error(validationResult.error.errors);

    return { error, success: false };
  }

  const { dishId, dishVersion, name, ingredients } = validationResult.data;

  try {
    const { error: dishError } = await supabase
      .from("dishes")
      .update({ name, version_number: dishVersion + 1 })
      .eq("id", dishId);

    if (dishError) {
      throw new Error(`Error updating dish: ${dishError.message}`);
    }

    const { error: deleteError } = await supabase
      .from("dish_ingredients")
      .delete()
      .eq("dish_id", dishId);

    if (deleteError) {
      throw new Error(`Error deleting old ingredients: ${deleteError.message}`);
    }

    const { error: insertError } = await supabase
      .from("dish_ingredients")
      .insert(
        ingredients.map((ingredient) => ({
          dish_id: dishId,
          ingredient_id: ingredient.ingredient_id,
          ingredient_amount: ingredient.ingredient_amount,
        })),
      );

    if (insertError) {
      throw new Error(
        `Error inserting new ingredients: ${insertError.message}`,
      );
    }

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Edit dish error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
