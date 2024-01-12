import {initializeApp} from "firebase/app"


import {
    getFirestore, onSnapshot, addDoc, serverTimestamp,
    collection
} from "firebase/firestore"


const name = document.querySelector('#name')
const email = document.querySelector('#email')
const message = document.querySelector('#message')
const submit = document.querySelector('.submit')

const firebaseConfig = {
  apiKey: "AIzaSyDhfcv5t4KEaT7OA1A3Niie-REi7EEbfWQ",
  authDomain: "chesscake-b7761.firebaseapp.com",
  projectId: "chesscake-b7761",
  storageBucket: "chesscake-b7761.appspot.com",
  messagingSenderId: "181028558590",
  appId: "1:181028558590:web:ee1834bafdd6368146f7af"
};

//init firebase

initializeApp(firebaseConfig)

//  init services

const database = getFirestore()

const colRef = collection(database, "contactUs")



const navButtons = document.querySelectorAll(".ul li")

const hamButton = document.querySelector(".ham-container");
const hamMenu = document.querySelector(".ham-nav");

navButtons[0].classList.add("clicked")

navButtons.forEach(function(button){
    button.addEventListener('click', function(e){
        // e.preventDefault()
        button.classList.add('clicked')
        navButtons.forEach(function(otherButton){
            if(otherButton !== button){
                otherButton.classList.remove('clicked')
            }
        }) 
    })
})

hamButton.addEventListener ("click", ()=>{


        hamMenu.classList.toggle("clickedd");
        
        

        
    })
    

            document.getElementById('menu1').addEventListener('click', function () {
  this.classList.toggle('close');
});

console.log("why")


onSnapshot(colRef, (snapshot)=>{
    let details =[]
    snapshot.docs.forEach(doc=>{
        details.push({...doc.data(), id: doc.id})
    })

    console.log(details)
})


const addMessage = () =>{
    submit.innerHTML = "submitting....."
addDoc(colRef, {
        name: name.value,
        email: email.value,
        message: message.value,
        createdAt : serverTimestamp()
    })
        .then(()=>{
            
            name.value = ''
            email.value = ''
            message.value = ''
            submit.innerHTML = "submitted"
        })
        .then(()=>{
            submit.innerHTML = "Contact us now"
        })
        .catch(()=>{
            alert("not done")
        })
}

submit.addEventListener("click", ()=>{
    if(!message.value.trim() || !name.value.trim() || !email.value.trim()){
        alert("Please fill all inputs")
    } else{
        addMessage()
    }
})

