
public class bubble_sort
{
	public static void main(String[] args) {
		int[] arr = {4, 8, 72, 65, 1, 9, 54};
		
		for(int i=arr.length-1; i>0; i--) {
		    for(int j=0; j<i; j++) {
		        if(arr[j] > arr[j+1]) {
		            int temp = arr[j];
		            arr[j] = arr[j+1];
		            arr[j+1] = temp;
		        }
		    }
		}
		 //print
		for(int i=0; i<arr.length; i++) {
		    System.out.println(arr[i]);
		}
	}
}
