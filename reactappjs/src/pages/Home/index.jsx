
import React, { useState, useEffect } from 'react';
import './style.css';

import { Card } from '../../components/Card';

export function Home() {
  const [name, setName] = useState('');
  const [people, setPeople] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''});

  function handleAddPerson(){

    const newPerson = {
      name: name,
      time: new Date().toLocaleTimeString("pt-br",{
        hour:   '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setPeople(prevState => [...prevState,newPerson]);
  }

  //É executado automaticamente assim que a página (os componentes) é renderizada
  useEffect(() => {
    fetch('https://api.github.com/users/carolpatricio')
    .then(response => response.json())
    .then(data => {
      console.log(data.login);
      setUser({
        name: data.name != null ? data.name : data.login.replace(/([a-z])([A-Z])/g, '$1 $2'),
        avatar: data.avatar_url 
      })
    });
  }, []); //estados que o useEffect depende.

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil" />
        </div>
      </header>
      <input type="text" 
            placeholder="Digite o nome..." 
            onChange={ev => setName(ev.target.value)}
      />
      <button type="button" onClick={handleAddPerson}> 
        Adicionar
      </button>

      {
        people.map(person => (
          <Card 
            key  = { person.time }
            name = { person.name } 
            time = { person.time }/>
        ))
      }

    </div>
  )
}


