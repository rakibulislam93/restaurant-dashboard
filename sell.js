
// ******************* sell add er kaj start ***********************
const addSell=(event)=>{
    event.preventDefault()
    
    const product_id = document.getElementById("add-sell-id").value 
    const product_quantity = document.getElementById("add-sell-quantity").value 

    console.log(product_id,product_quantity)
    const info = {
        "product_id": product_id,
        "quantity": product_quantity
    }

    const token = localStorage.getItem('token')
    fetch("https://softs-venture.onrender.com/api/products/sell",{
        method:"POST",
        headers:{
            "Authorization" : `Token ${token}`,
            "Content-Type":"application/json"
        },
        body : JSON.stringify(info)
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.product_id){
            document.getElementById("sell-errors").style.display = "block"
            document.getElementById("add-sell-error").innerText = `Product ID Doesn't exists.! Provide valid ID..`
        }
        else{
            document.getElementById("sell-errors").style.display = "block"
            document.getElementById("add-sell-error").innerText = `New sell added successfully done.!`
            
            setTimeout(() => {
                window.location.href="all_sell.html"
            }, 2000);
        }
    })
}




document.getElementById('apply-filter-btn').addEventListener('click',function(){
    const startDate = document.getElementById('start_date').value
    const endDate = document.getElementById('end_date').value

    if(startDate && endDate){
        loadAllSell('',startDate,endDate)
    }
    else{
        alert('Please select both start date and end date')
    }
})

document.getElementById('yesterday-btn').addEventListener('click',function(){
    // console.log("yesterday")
    loadAllSell("yesterday")
})
document.getElementById('today-btn').addEventListener('click',function(){
    // console.log("today")
    loadAllSell('today')
})

document.getElementById('all-btn').addEventListener('click',function(){
    // console.log("today")
    loadAllSell('')
})




// ************ All sell load korbo *********


const loadAllSell=(filter,start_date,end_date)=>{
    const parent = document.getElementById("sell-data").innerHTML = ""

    let query = `search=${filter}`;
    
    if(start_date && end_date){
        query += `&start_date=${start_date}&end_date=${end_date}`;
    }

    const token = localStorage.getItem('token')
    
    if(token){
        fetch(`https://softs-venture.onrender.com/api/products/sell?${query}`,{
            method : 'GET',
            headers : {
                'Authorization': `Token ${token}`,
                'Content-Type' : 'application/json',
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.sells)
            displayAllSell(data.sells)
            
        })
    }
    else{
        window.location.href = 'login.html'
    }
}



const displayAllSell=(sell)=>{
    document.getElementById("card-title").innerText = `Total Sells : ${sell.length}`
    let totalAmount = 0;
    
    sell.forEach(element => {
        
        totalAmount += element.price_at_sell * element.quantity;

        const parent = document.getElementById("sell-data")
        const tr = document.createElement("tr")
        tr.innerHTML=`
        <th scope="row">${element.product.name}</th>
        <td>$ ${element.product.price}</td>
        <td>$ ${element.price_at_sell}</td>
        <td>${element.quantity}</td>
        <td>$ ${element.total_price}</td>
        <td>${element.sell_date}</td>
        `
        parent.appendChild(tr)
    });

    document.getElementById('total-sell-amount').innerText = `Total Sell Amount : $${totalAmount.toFixed(2)}`;
}

loadAllSell()





