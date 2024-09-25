package ex4.reastapi;
import ex4.ingredients.Ingredient;
import ex4.ingredients.IngredientResponse;
import ex4.pizzaOrder.Order;
import ex4.pizzaOrder.OrderResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@RestController
@RequestMapping("/api")
public class IngredientRestController {

    @GetMapping(value = "/ingredient")
    public ArrayList<Ingredient> getRoot() {
        return IngredientResponse.getAllIngredients();
    }

    @GetMapping(value = "/{id}")
    public Order getOrder(@PathVariable final Long id) {
        Order b =  OrderResponse.findOrderById(id);
        if (b == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order Not Found");
        return b;
    }

    @PostMapping(value = "/order")
    public ResponseEntity<Order> create(@RequestBody final Order bk) {
        OrderResponse.addOrder(bk);
        return ResponseEntity.ok(bk);
    }
    @ExceptionHandler({MethodArgumentTypeMismatchException.class, IllegalArgumentException.class})
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }

}
