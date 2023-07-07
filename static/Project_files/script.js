//in JS we can sort an array. making an array of obj can constructing a fu ction in sort function.

//loop thru tbody
const children = $('tbody').children();
//console.log(typeof children)


//convert childern to an array
let childern_arr = [];
for(let i=0; i< children.length; i++) {
    childern_arr.push(children[i]);
}
console.log(childern_arr);

//build an array of objects
const items = [];
childern_arr.forEach(element => {
    const rowDetails = {
        name: element.getAttribute('data-name'),
        size: parseInt(element.getAttribute('data-size')),
        time: parseInt(element.getAttribute('data-time')),
        html: element.outerHTML
    }
    items.push(rowDetails);
});

//order status
const sortStatus = {
    name: 'none',   //none up down
    size: 'none',
    time: 'none'
};

const sort = (items, option, type) => {
    items.sort((item1, item2) => {
        let value1, value2;
       if(type === 'name')
       { 
            value1 = item1.name.toUpperCase();
            value2 = item2.name.toUpperCase();
       }
       else if(type === 'size'){
        value1 = item1.size;
        value2 = item2.size;
       }
       else{
        value1 = item1.time;
        value2 = item2.time;
       }
        if(value1 < value2) {
            return -1;
        }
        if(value1 > value2) {
            return 1;
        }
        //eqaul names
        return 0;
        
    });
    //reverse array if option is down
    if(option === 'down') {
        items.reverse();
    }
};


// const sort_names_desc = items => {
//     sort_names_asc(items);
//     items.reverse();
// }


//fill table body with items
const fill_table_body = items => {
    const content = items.map(element => element.html).join('');     //to join all html content of array
    $('tbody').html(content);
};


//event listeners
document.getElementById('table_head_row').addEventListener('click', event =>{
    //event.target: property which tells which elements has been clicked
    if(event.target) {
            //clear icons which are repeated after click
            $('ion-icon').remove();

            if(['none', 'down'].includes(sortStatus[event.target.id])){
            //sort in ascending order
            sort(items, 'up', event.target.id);
            sortStatus[event.target.id] = 'up';
            //add icon
            event.target.innerHTML += ' <ion-icon name="arrow-dropup-circle"></ion-icon>';
        }
        else if(sortStatus[event.target.id] === 'up'){
            //sort in descending order
            sort(items, 'down', event.target.id);
            sortStatus[event.target.id] = 'down';
            //add icon
            event.target.innerHTML += ' <ion-icon name="arrow-dropdown-circle"></ion-icon>';
        }
            fill_table_body(items);
        }
});
    
