import { useState, useEffect } from 'react'
import './App.css'

const useImageURL = () => {
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizando ambas solicitudes simultáneamente utilizando Promise.all
        const responses = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/photos/1", { mode: "cors" }),
          fetch("https://jsonplaceholder.typicode.com/photos/2", { mode: "cors" })
        ]);

        const data = await Promise.all(responses.map(response => {
          if (!response.ok) {
            throw new Error("Server error!!");
          }
          return response.json();
        }));

        // Tomando los URL de las imágenes de las respuestas
        const imageURLs = data.map(response => response.url);

        // Actualizando el estado con la primera URL
        setImageURL(imageURLs[0]);

        
        
          setImageURL(imageURLs[1]);
          setLoading(false);
        
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { imageURL, error, loading };
};

function App() {
  const { imageURL, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>
  if (error) return <p>A network error was encountered!</p>

  return (
    imageURL && (
      <>
        <h1>An image</h1>
        <img src={imageURL} alt={"placeholder text"} />
      </>
    )
  )
}

export default App;
