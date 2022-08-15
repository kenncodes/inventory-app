/*var productRows = document.querySelectorAll(".productRow");
productRows.forEach(row => {
    row.addEventListener('click', e => {
        var id = e.target.parentNode.id;
        console.log(id);
        window.location = `./product/${id}`;
    })
})*/

var deleteImgs = document.querySelectorAll(".deleteImg");
deleteImgs.forEach(img => {
    img.addEventListener('click', (event) =>{
        let id = event.target.parentNode.parentNode.id;
        console.log(id);
        fetch(`/product/${id}`, {
            method: 'delete',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: id
            })
        })
        .then( res => {
            window.location.reload()
        })
        .catch(error => {
            console.log(error)
        })
    })
})

var editImgs = document.querySelectorAll(".editImg")
editImgs.forEach(img => {
    img.addEventListener('click', (event) => {
        let id = event.target.parentNode.parentNode.id
        console.log(id)
        window.location = `/edit/${id}`
     /*   fetch(`/product/${id}`, {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        }).then( res => {
            console.log(res.json())
        })
        .catch(error => console.error(error))
        */
    })
})