package ex4.ingredients;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * the ingredient response class contains list of 10 fixed ingredient
 */
public class IngredientResponse {

    /**
     * the fixed ingredient
     */
    private static final ArrayList<Ingredient> list = new ArrayList<>(Arrays.asList(
            new Ingredient("Cheese"),
            new Ingredient("Chicken"),
            new Ingredient("Sausage"),
            new Ingredient("Pepperoni"),
            new Ingredient("Red Peppers"),
            new Ingredient("Pesto"),
            new Ingredient("Green Olives"),
            new Ingredient("Black Olives"),
            new Ingredient("Mushrooms"),
            new Ingredient("Corn")
    ));

    /**
     * return the ingredient list
     * @return list of ingredient
     */
    public  static ArrayList<Ingredient> getAllIngredients() {
        return list;
    }
}
