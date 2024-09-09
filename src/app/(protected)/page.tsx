import ChefDashboard from "@/components/ChefDashboard";
import { createClient } from "@/lib/supabase/server";
import { Dish, Ingredient } from "@/lib/typings";

const Home = async () => {
  const supabase = createClient();

  const { data: dishes } = await supabase.from("dishes").select(`
    *,
    dish_ingredients: dish_ingredients (
      *,
      ingredient: ingredients (*)
    )
  `);

  const { data: ingredients } = await supabase.from("ingredients").select("*");

  return (
    <ChefDashboard
      dishes={dishes as Dish[]}
      availableIngredients={ingredients as Ingredient[]}
    />
  );
};

export default Home;
