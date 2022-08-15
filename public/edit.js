console.log("hello edit")

var saveButton = document.getElementById("saveButton")
var cancelButton = document.getElementById("cancelButton")

cancelButton.onclick = () => {
    window.location = "/products"
}

saveButton.addEventListener('click', (event) => {
    let id = data[0]._id
    let name = document.getElementById("name").value
    let price = document.getElementById("price").value
    let quantity = document.getElementById("quantity").value

    console.log(price)
    console.log(id)
    fetch(`/edit/${id}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: id,
            name: name,
            price: price,
            quantity: quantity
        })
    })
    .then(res => console.log(res.json()))
    .then(res => window.location= "/products")
    .catch(error => console.log(error))
})