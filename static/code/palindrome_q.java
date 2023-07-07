import java.util.Stack;
import java.util.Queue;
import java.util.Scanner;
import java.util.LinkedList;


 class palindrome_q {

    public static boolean checkPalindrome(String string) {
        Stack<Character> stk = new Stack<>();
        Queue<Character> q = new LinkedList<>();
        String str = string.toLowerCase();
        
        for(int i=0; i<str.length(); i++) {
            char c = str.charAt(i);
            if(c >= 'a' && c <= 'z') {
                stk.push(c);
                q.add(c);
            }
        }
    
        while(!stk.empty()) {
            if(stk.pop() != q.remove()) {
                return false;
            }
        }return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter String");
        String string = sc.next();
        boolean ans = checkPalindrome(string);
        System.out.println(ans);

    }
}
