import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": "My Website 2",
      "url": "url",
      "techs": ["Node", "React"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      if(response.status === 204){
        const repositoryIndex = repositories.findIndex(repository => repository.id === id);

        repositories.splice(repositoryIndex , 1);

        setRepositories([...repositories]);
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => 
          <>
          <li key={repository.id} id={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          </>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
