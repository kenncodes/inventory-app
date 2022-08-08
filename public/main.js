var productRows = document.querySelectorAll(".productRow");
productRows.forEach(row => {
    row.addEventListener('click', e => {
        var id = e.target.parentNode.id;
        console.log(id);
        window.location = `./product/${id}`;
    })
})
