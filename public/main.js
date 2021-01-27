const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/citas', { 
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'El Intruso 4',
            quote: 'A que no me esperabais! Ea!'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
})


const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
    fetch('/citas', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'El Intruso 3'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if (response === 'No hay ninguna cita') {
                messageDiv.textContent = 'No hay ninguna cita del intruso 3'
            } else {
                window.location.reload(true)
            }
        })
})




deleteButton.addEventListener('click', _ => {
    fetch(/* ... */)
      .then(/* ... */)
      .then(response => {
        if (response === 'No quote to delete') {
          messageDiv.textContent = 'No Darth Vadar quote to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(/* ... */)
  })