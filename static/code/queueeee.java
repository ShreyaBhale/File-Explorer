import java.util.Queue;
import java.util.LinkedList;

public class queueeee {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>();

        q.add(2);
        q.add(3);
        q.add(4);
        q.add(5);
        q.add(6);

        int x = q.remove();

        System.out.println("Queue: " + q);
        System.out.println(x);

    }
}
