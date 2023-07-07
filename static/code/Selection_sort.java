public class Selection_sort
{
	public static void main(String[] args) {
		int[] arr = {4, 8, 72, 65, 1, 9, 54};
		
		for(int i=0; i<arr.length-1; i++) {
		    int min = i;
		    for(int j=i+1; j<arr.length; j++) {
		        
		        if(arr[j] < arr[min] ) {
		            min = j;
		        }
		    }
		    
		    //swap
		    int temp = arr[i];
		    arr[i] = arr[min];
		    arr[min] = temp;
		}
		
		//print array
		for(int i=0; i<arr.length; i++) {
		    System.out.println(arr[i]);
		}
	}
}
