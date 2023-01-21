const socket = io();

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')



const $sendLocationButton = document.querySelector('#send-location')



socket.on('message',(a)=>{
    console.log(a);
})

$messageForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    $messageFormButton.setAttribute('disabled','disabled')//one the form is submitted the form is disabled means button gets disabled you can't click it again


    const msg = e.target.elements.message.value
    socket.emit('sendMessage', msg , (error,sundi)=>{
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = '';
        $messageFormInput.focus()

        if(error)
        {
            return console.log(error);
        }
        // console.log(sundi);
    });
})

$sendLocationButton.addEventListener('click',()=>{
    if(!navigator.geolocation)
    {
        return alert('Geolocation is not supported by your brouser!')
    }

    $sendLocationButton.setAttribute('disabled','disabled')


    navigator.geolocation.getCurrentPosition((position)=>{
         console.log(position.coords.latitude);
        socket.emit('sendLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },()=>{
            $sendLocationButton.removeAttribute('disabled')
            console.log("Location Shared!")
        })
    })
})




// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log("clicked");
//     socket.emit('increment')
// })