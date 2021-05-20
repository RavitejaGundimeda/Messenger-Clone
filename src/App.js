import React, { useEffect, useState } from 'react';
import { FormControl,Input  } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {

  //Creating the state
  const [input,setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  //console.log(input);
  //console.log(messages);
  //useState = variable in React
  //useEffect = run code on a condition in react

  useEffect(() => {

    //run once when the app component loads
    db.collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot(sanpshot => {
    setMessages(sanpshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    } )
    
   }, [] )

  useEffect(() => {

    setUsername(prompt('Please enter UserName'));
    
   }, [] )

  const sendMessage = (event) => {
    event.preventDefault(); //Disables refresh that happens everytime after giving input
   // window.scrollTo(0, 999999999999);
     
    db.collection('messages').add({
      message : input,
      username : username,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })
   
    //setMessages([...messages,{username : username,message : input  }]); //Its like appending the current inp to previous inp into array
     setInput(''); //keep the input to empty, after giving input

  }
 

  return (
    <div className="App">

      <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100"  alt=""/>
      <h1> Facebook-Messenger-Clone </h1>
      <h2> Welcome {username} 👋 </h2>

      <form className = "app__form">
        <FormControl className= "app__formControl">
          <Input className = "app__input" placeholder='Enter your message...' value = { input } onChange = {event => setInput(event.target.value)} />
          <IconButton className='app__iconButton' disabled={!input} variant='contained' color='primary' type='submit' onClick = {sendMessage}>
            <SendIcon />
          </IconButton>

       </FormControl>
     </form>

      <FlipMove>
      {
         //This something like for-loop to iterate
         messages.map(({id, message}) => (

          //We pass the text to Message.js file, so that we can grab and do whatever we want in that file
          //A message can be of user who is not logged in.
          <Message key ={id} username = {username} message = {message} /> 
          
          )
        )
       }

      </FlipMove>

   </div>
  );
}

export default App;
