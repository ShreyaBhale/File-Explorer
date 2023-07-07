import java.util.Scanner;

public class BST {
    
    class node {
        int data;
        node left, right;

        node(int data) {
            this.data = data;
            left = right = null;
        }
    }

    public node insert(node root, int val) {
        if(root == null) {
           node node = new node(val);
           return node;
        }

        if(val < root.data){
            root.left = insert(root.left, val); 
        }
        
        else {
            root.right = insert(root.right, val);
        }
        return root;
    }

    void inorder(node root) {
        if(root!=null) {
            inorder(root.left);
            System.out.println(root.data);
            inorder(root.right);
        }
    }

    void preorder(node root) {
        if(root!=null) {
            System.out.println(root.data);
            inorder(root.left);
            inorder(root.right);
        }
    }

    void postorder(node root) {
        if(root!=null) {
            inorder(root.left);
            inorder(root.right);
            System.out.println(root.data);
        }
    }

    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int ch, val;

        BST b = new BST();
        node root = null;

        do{
            System.out.println("1. Insert\n 2.Print ");
            ch = sc.nextInt();

            switch(ch) {
                case 1:

                int num;
                System.out.println("how many?");
                num = sc.nextInt();

                while(num>0){
                System.out.println("Enter: ");
                val = sc.nextInt();
                root = b.insert(root,val);
                num--;
                }
                break;

                case 2:
                b.inorder(root);
                break;

                case 3:
                b.preorder(root);
                break;

                case 4:
                b.postorder(root);
                break;
            }
        }while(ch<5);
    }
}
