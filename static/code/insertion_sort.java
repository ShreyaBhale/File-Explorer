
public class insertion_sort
{
	public static void main(String[] args) {
	    int[] arr = {1,89,5,35,7,4,2,65,};
	    
	    for(int i=1; i<=arr.length-1; i++) {
	        
	        for(int j=i; j>=0 && arr[j-1] > arr[j]; j--) {
	            int temp = arr[j];
	            arr[j] = arr[j-1];
	            arr[j-1] = temp;
	        }
	 }
	 
     //print
	 for(int i=0; i<arr.length; i++) {
	     System.out.println(arr[i]);
	 }
    	}
}
