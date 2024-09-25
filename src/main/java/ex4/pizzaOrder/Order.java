package ex4.pizzaOrder;

import java.util.ArrayList;
import java.util.List;

/**
 * the order data the form data and the pizzas he orders.
 */
public class Order {
    /**
     * the customer data
     */
    private FormData formData;
    /**
     * the customer pizzas
     */
    private List<List<Integer>> carts;
    private Long id;

    public Order() {
        this.formData = new FormData();
        this.carts = new ArrayList<>();
    }

    public Order(Long id , FormData form, List<List<Integer>> cart) {
        this.id = id;
        this.formData = form;
        this.carts = cart;
    }

    /**
     * the getter and the setter functions of the FormData class
     */

    public FormData getFormData() {
        return formData;
    }

    public void setFormData(FormData formData) {
        this.formData = formData;
    }

    public List<List<Integer>> getCarts() {
        return carts;
    }

    public void setCarts(List<List<Integer>> ca) {
        this.carts = ca;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
