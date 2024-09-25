package ex4.ingredients;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

/**
 * the ingredient class: will represent the name and the image of the ingredient
 */
public class Ingredient {
    /**
     * Ingredient name
     */
    private String name;
    /**
     * Ingredient image
     */
    private byte[] image;

    /**
     * default constructor
     */
    public Ingredient() {}

    /**
     * constructor add name and image
     */
    public Ingredient(String name) {
        this.name = name;
        try {
            this.image = Files.readAllBytes(Paths.get(getClass().getResource(STR."/static/\{this.name}.jpg").toURI()));
        } catch (IOException | java.net.URISyntaxException e) {
            e.printStackTrace();
        }
    }

    /**
     * the getter functions of the ingredient class
     * @return name
     */

    public String getName() {
        return name;
    }

    public String getImage() {
        return Base64.getEncoder().encodeToString(image);
    }

}
