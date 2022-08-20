let category = JSON.parse(document.getElementById('cat').getAttribute('data'));
console.log('html', category);
let left_list = document.getElementById('left_list');
for (var i = 0; i < category.length; i++) {
  var list_item = document.createElement('a');
  list_item.className = 'title';
  list_item.style.textDecoration = 'none';
  list_item.setAttribute('href', '/dashboard/' + category[i].id);
  list_item.innerHTML = category[i].category_name;
  left_list.appendChild(list_item);
}

async function addHandler(event) {
  event.preventDefault();
  product_id=event.target.id;  
  console.log("*************************>>>>",product_id);
  const response = await fetch("/shopping/"+product_id, {
    method: 'POST',
    body: JSON.stringify({
      product_id
    }),
  })
  
  document.location.replace('/dashboard');

}

document.getElementById('display').addEventListener('click', addHandler);
