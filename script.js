const categoriesList = document.getElementById('categories-list');
const treeCardsContainer = document.getElementById('tree-cards');
const cartList = document.getElementById('cart-list');
const totalPriceSpan = document.getElementById('total-price');
let cart = [];
let totalPrice = 0;

// --------------------------------loading Spinner----------------------------------------------
const showSpinner = () => {
  document.getElementById('loading-spinner').classList.remove('hidden');
};
const hideSpinner = () => {
  document.getElementById('loading-spinner').classList.add('hidden');
};

//-------------------------------- Fetch categories----------------------------------------------
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(response => response.json())
        .then(data => displayCategories(data.categories));
};
const displayCategories = (categories) => {
    categories.forEach(category => {
        const button = document.createElement('button');
        button.innerText = category.category_name;
        button.className = 'w-full border p-2 rounded hover:bg-green-600 text-left';
        button.onclick = () => {
            highlightActiveCategory(button);
            fetchTrees(category.id);
        };
        categoriesList.appendChild(button);
    });
};
const highlightActiveCategory = (selectedButton) => {
    [...categoriesList.children].forEach(btn => btn.classList.remove('bg-green-600', 'text-white'));
    selectedButton.classList.add('bg-green-600', 'text-white');
};
const fetchTrees = (id) => {
  showSpinner();
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(response => response.json())
    .then(data => {
      displayTrees(data.plants);
      hideSpinner();
    })
    .catch(() => hideSpinner());
};
const fetchAllTrees = () => {
  showSpinner();
  fetch('https://openapi.programming-hero.com/api/plants')
    .then(response => response.json())
    .then(data => {
      displayTrees(data.plants);
      hideSpinner();
    })
    .catch(() => hideSpinner());
};

const displayTrees = (trees) => {
  treeCardsContainer.innerHTML = `
    <div id="loading-spinner" class="col-span-full flex justify-center items-center py-10 hidden">
      <span class="loading loading-dots loading-lg text-green-700"></span>
    </div>

  `; // ------------------ spinner--------------------------

  if (!trees || trees.length === 0) {
    treeCardsContainer.innerHTML += `<p class="text-center col-span-full text-gray-500">No trees found 🌱</p>`;
    return;
  }

  trees.forEach(tree => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow p-3 hover:shadow-lg transition cursor-pointer flex flex-col';
    card.innerHTML = `
      <img src="${tree.image}" alt="${tree.name}" class="w-full h-40 md:h-48 object-cover rounded mb-2">
      <h3 class="font-bold mt-2 text-base md:text-lg">${tree.name}</h3>
      <p class="text-sm md:text-base text-gray-600">${tree.description.slice(0, 60)}...</p>
      <div class="flex justify-between items-center mt-2">
        <span class="inline-block bg-green-100 text-green-700 text-xs md:text-sm px-2 py-1 rounded-full mt-2">${tree.category}</span>
        <span class="text-black font-bold text-sm md:text-base">৳${tree.price}</span>
      </div>
      <button class="bg-green-700 text-white text-center mt-4 px-4 py-2 rounded-full text-sm md:text-base add-to-cart" data-name="${tree.name}" data-price="${tree.price}">Add to Cart</button>
    `;
    treeCardsContainer.appendChild(card);

    card.querySelector('.add-to-cart').onclick = (e) => {
      e.stopPropagation();
      addToCart(e.target);
    };
    card.onclick = () => showTreeDetails(tree);
  });
};
//------------------ add to cart-----------------------------------------
const addToCart = (button) => {
  const treeName = button.getAttribute('data-name');
  const treePrice = parseFloat(button.getAttribute('data-price'));
  const treeImage = button.parentElement.querySelector('img').src;
  cart.push({ name: treeName, price: treePrice, image: treeImage });
  totalPrice += treePrice;
  updateCart();
  alert('🌱 Tree added to cart!');
};
//--------------------------- update cart--------------------------------
const updateCart = () => {
  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center text-black font-semibold gap-6 bg-green-200 px-2 py-1 rounded';
    li.innerHTML = `
      <img src="${item.image}" alt="" class="w-10 h-8 object-cover rounded" />
      <span>${item.name} <span class="text-black">৳${item.price}</span></span>
      <button class="text-gray-700" onclick="removeFromCart(${index})">❌</button>
    `;
    cartList.appendChild(li);
  });
  totalPriceSpan.innerText = `৳${totalPrice}`;
};

//---------------------------- Remove item from cart-----------------------
const removeFromCart = (index) => {
  totalPrice -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
};
const fetchTreeDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(response => response.json())
    .then(data => {
      const tree = data.plant;
      showTreeDetails(tree);
    });
};

//-----------------------event listeners------------------------------------
categoriesList.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        highlightActiveCategory(e.target);
    }
});
//------------------details in modal-------------------------------
const showTreeDetails = (tree) => {
  document.getElementById('modal-tree-name').innerText = tree.name;
  document.getElementById('modal-tree-image').src = tree.image;
  document.getElementById('modal-tree-category').innerText = tree.category;
  document.getElementById('modal-tree-price').innerText = `৳${tree.price}`;
  document.getElementById('modal-tree-description').innerText = tree.description;
  document.getElementById('tree-modal').showModal();
};
//-------------------- Close-------------------------------
const closeModal = () => {
    document.getElementById('tree-modal').close(); 
};
loadCategories();
fetchAllTrees();
