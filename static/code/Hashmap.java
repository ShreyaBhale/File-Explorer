import java.util.*;

public class Hashmap {
    public static void main(String args[]) {
        int arr[] = {2, 5, 89, 5, 3, 2, 5};
        HashMap<Integer, Integer> mp = new HashMap<>();

        for(int i=0; i<arr.length; i++) {
            if(mp.containsKey(arr[i])) {
                int freq= mp.get(arr[i]);
                freq++;
                mp.put(arr[i], freq);

                //can also be written as:
                //mp.put(arr[i], mp.get(arr[i] + 1));
            }
            else{
                mp.put(arr[i], 1);
            }
        }

        //print hash map
        for(Map.Entry<Integer, Integer> e : mp.entrySet()) {
            System.out.println("key: " + e.getKey() + "value: " + e.getValue());
        }
        System.out.println();

        //most freq element
        int max_count = 0; int key = -1;
        for(Map.Entry<Integer, Integer> e : mp.entrySet()) {
            if(e.getValue() > max_count) {
                max_count = e.getValue();
                key = e.getKey();
            }
        }

        System.out.println("Mpst repeated number is " + key + " with frequecy: " + max_count);
    }
}