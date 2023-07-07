class node {
    int data;
    linkedlist next;

    node(int data) {
        this.data = data;
    }
}

class implementation {
    node head;

    public void insert(int val) {
        node new_node = new node(val);
        new_node.data = val;

        if(isempty()) {
            head = new_node;
        }

        else{
            node temp = head;
            while(temp.next != null) {
                temp = temp.next;
            }

            temp.next = new_node;
        }
    }

    public void print() {
        node temp = head;
        
        while(temp.next !=null) {
            System.out.print(temp + "->");
            temp = temp.next;
        }
    }

    boolean isempty() {
        return head == null;
    }
}

public class linkedlist{
    public static void main(String args[]) {
        implementation i = new implementation();

        i.insert(1);
        i.insert(2);
        i.insert(3);
        i.insert(4);
        i.insert(5);
        i.insert(6);

        i.print();
    }
}