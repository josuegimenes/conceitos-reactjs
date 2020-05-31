import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: "Desafio ReactJS",
      url: "https://github.com/josuegimenes",
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);
        
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]); 

  }

  return (
    <div>
      <ul data-testid="repository-list">

          {repositories.map(repository => 
            <li key={repository.id}>
              
              <ul>
                <li><a href={repository.url}>{repository.title}</a></li>
                <li>Likes: {repository.likes}</li>
              </ul>

              <button type="button" onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>

            </li>
          )}

          
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
