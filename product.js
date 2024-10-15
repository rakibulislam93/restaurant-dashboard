
// ************* Product show ******************
const loadAllProduct=(search)=>{
    
    const token = localStorage.getItem('token');
    
    if(token){
        fetch(`https://softs-venture.onrender.com/api/products/?search=${search?search:""}`,{
            method : 'GET',
            headers : {
                'Authorization': `Token ${token}`,
                'Content-Type' : 'application/json',
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            displayProduct(data)
        })
    }
    else{
        window.location.href = 'login.html'
    }
}


const displayProduct=(product)=>{
    document.getElementById("product_count").innerText = `Total Product Found : ${product.length}`
    document.getElementById("product_container").innerHTML="";
    product.forEach(element => {
        
        const parent = document.getElementById("product_container")
        const div = document.createElement("div")
        div.classList.add("product-card")

        div.innerHTML = `
            <p style="text-align:start; margin-left:20px; margin-top:10px; color:blue;">ProductId : ${element.id}</p>
            <img src="${element.image}" alt="">
            <h5>${element.name}</h5>
            <h5>$ ${element.price}</h5>
            
        `
        div.addEventListener('click',() => openModel(element))

        parent.appendChild(div)
        
        
    });
}

const openModel=(product)=>{
    document.getElementById('modal-title').innerText = `ProductId : ${product.id}`

    document.querySelector(".modal-body").innerHTML = `
    <img src="${product.image}" alt="" style="width:100%; height:auto;">
    <h5>${product.name}</h5>
    <h5>$ ${product.price}</h5>
    `;

    document.getElementById('editButton').onclick = () => editProduct(product.id)
    
    const product_modal = new bootstrap.Modal(document.getElementById('product_modal'))
    product_modal.show();

    document.getElementById('deleteButton').onclick = () => productDelmodalOpen(product.id)
  
}

const editProduct = (productId) => {
    const token = localStorage.getItem('token');
    // Fetch the product details from the API by its ID
    if(token){
        fetch(`https://softs-venture.onrender.com/api/products/${productId}/`,{
            method : 'GET',
            headers : {
                'Authorization': `Token ${token}`,
                'Content-Type' : 'application/json',
            }
        })
            .then(res => res.json())
            .then(product => {
                // Fill the form with product details
                document.getElementById("productName").value = product.name;
                document.getElementById("productPrice").value = product.price;
                
                document.getElementById("productId").value = product.id;
    
                // Show the modal
                const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
                editProductModal.show();
            });
    }
    else{
        window.location.href = 'login.html'
    }
}



// Save changes when the "Save Changes" button is clicked
const saveChangesBtn = document.getElementById('saveChangesBtn')
if(saveChangesBtn){
    saveChangesBtn.addEventListener("click", () => {
    const productId = document.getElementById("productId").value;
    const updatedName = document.getElementById("productName").value;
    const updatedPrice = document.getElementById("productPrice").value;
    const productImageInput = document.getElementById("productImage");
    const updatedImage = productImageInput.files[0]; // ফাইলটি নেয়ার জন্য

    if (!updatedName || !updatedPrice || (productImageInput.files.length === 0)) {
        alert("All fields are required!"); 
        return;
    }

    // Prepare the updated product data using FormData
    const formData = new FormData();
    formData.append('name', updatedName);
    formData.append('price', updatedPrice);
    if (updatedImage) { 
        formData.append('image', updatedImage);
    }

    

    // Send the updated data to the server using PUT request
    const token = localStorage.getItem('token');
    fetch(`https://softs-venture.onrender.com/api/products/${productId}/`, {
        method: 'PUT',
        headers : {
            'Authorization': `Token ${token}`,           
        },
        body: formData
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Error updating product');
        }
    })
    .then(data => {
        console.log("Product updated successfully:", data);
        // Close the edit modal
        const editProductModal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
        const ProductModal = bootstrap.Modal.getInstance(document.getElementById('product_modal'));
        editProductModal.hide();
        ProductModal.hide()
        // Optionally, reload the product list to show the updated data
        loadAllProduct(); 
    })
    .catch(error => console.error('Error updating product:', error));
});
}

// **************** Product delete modal ****************
const productDelmodalOpen=(product_id)=>{
    
    const prdDelModal = new bootstrap.Modal(document.getElementById('productDelete_modal'))
    prdDelModal.show()

    document.getElementById('productDelbtn').onclick=()=> deleteProduct(product_id)
}



// ************* For Product Delete ***************
const deleteProduct = (product_id) =>{
    const token = localStorage.getItem('token')

    if(token){
        fetch(`https://softs-venture.onrender.com/api/products/${product_id}/`,{
            method : 'DELETE',
            headers : {
                'Authorization': `Token ${token}`,
                'Content-Type':'application/json'
            },
        })
        .then(res=>{
            
            if(res.status == 204){
                
                window.location.href = 'products.html'
            }
        })
    }
    else{
        window.location.href = 'login.html'
    }
    

}


const getSearchValue=()=>{
    const value = document.getElementById("search").value 
    loadAllProduct(value)
    console.log(value)
    document.getElementById("search").value = ""
}

loadAllProduct()



// ************** Product add proceess ************

const AddNewProduct=(event)=>{
    event.preventDefault()
    name = document.getElementById("name").value 
    price = document.getElementById("price").value 
    image = document.getElementById("image").files[0];

    const formData = new FormData();
    formData.append("name",name);
    formData.append("price",price);
    formData.append("image",image)
    
    console.log(formData)
    const token = localStorage.getItem('token')
    fetch("https://softs-venture.onrender.com/api/products/",{
        method : "POST",
        headers : {
            'Authorization': `Token ${token}`,
            
        },   
        body : formData
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        // console.log("product added successfull....")
        document.getElementById("product_add_massage").style.display = "block"
        document.getElementById("add_product_massage").innerText = `Product added successfull.`
        setTimeout(() => {
            window.location.href="products.html"
        }, 2000);
    })
}
document.getElementById("productForm").addEventListener("submit",AddNewProduct);
















