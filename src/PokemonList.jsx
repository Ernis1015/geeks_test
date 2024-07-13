import React, { useEffect, useState } from 'react';
import './App.css';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
                const data = await response.json();
                const promises = data.results.map(async (pokemon) => {
                    const result = await fetch(pokemon.url);
                    const pokemonData = await result.json();
                    return {
                        name: pokemon.name,
                        image: pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default
                    };
                });
                const results = await Promise.all(promises);
                setPokemons(results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPokemons();
    }, []);

    return (
        <div className="pokemon-list">
            {pokemons.map((pokemon, index) => (
                <div key={index} className="pokemon-card">
                    <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                    <h3 className="pokemon-name">{pokemon.name}</h3>
                </div>
            ))}
        </div>
    );
}

export default PokemonList;
