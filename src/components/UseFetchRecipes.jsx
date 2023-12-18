import { useState, useEffect } from 'react';
import { apiKey } from '../Config'

export default function UseFetchRecipes ({ apiEndpoint }) {

  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${apiEndpoint}&apiKey=${apiKey}`);
        const results = await response.json();
        setRecipes(results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return { recipes, loading };
}