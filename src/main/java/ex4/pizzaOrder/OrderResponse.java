package ex4.pizzaOrder;

import java.util.ArrayList;

/**
 * the Order response class contains list of customer order
 */
public class OrderResponse {
    private static final ArrayList<Order> list = new ArrayList<>();

    /**
     * add order to the list. and add an id to each added order
     * @param or - the order to be added
     */
    public static synchronized void addOrder(Order or) {
        or.setId((long) (list.size() + 1312));
        list.add(or);
    }

    /**
     * return the order of the requested id
     * @param id - id of order to search and return
     * @return the requested order or null if it does not exist
     */
    public static Order findOrderById(Long id) {
        Order order = null;
        for (Order b : list) {
            if (b.getId().equals(id)) {
                order = new Order(b.getId(), b.getFormData(), b.getCarts());
                break;
            }
        }
        return order;
    }
}
