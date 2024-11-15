document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    
    // Clear previous data
    document.getElementById('pokemon-name').textContent = 'N/A';
    document.getElementById('pokemon-id').textContent = 'N/A';
    document.getElementById('weight').textContent = 'N/A';
    document.getElementById('height').textContent = 'N/A';
    document.getElementById('hp').textContent = 'N/A';
    document.getElementById('attack').textContent = 'N/A';
    document.getElementById('defense').textContent = 'N/A';
    document.getElementById('special-attack').textContent = 'N/A';
    document.getElementById('special-defense').textContent = 'N/A';
    document.getElementById('speed').textContent = 'N/A';
    document.getElementById('types').innerHTML = ''; // Clear types
    document.getElementById('types').style.display = 'none'; // Hide types initially

    if (query) {
        fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`)
            .then(response => response.json())
            .then(data => {
                // Update Pokémon details
                document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
                document.getElementById('pokemon-id').textContent = data.id;
                document.getElementById('weight').textContent = data.weight;
                document.getElementById('height').textContent = data.height;

                // Update types and show them
                const typesElement = document.getElementById('types');
                typesElement.innerHTML = ''; // Clear previous types
                data.types.forEach((type) => {
                    const typeSpan = document.createElement('span');
                    typeSpan.textContent = type.type.name.toUpperCase();

                    // Style the type span to look like a tag
                    typeSpan.style.backgroundColor = '#ffeb3b'; // Yellow background
                    typeSpan.style.padding = '5px 5px'; // Padding for spacing
                    typeSpan.style.borderRadius = '5px'; // Rounded corners
                    typeSpan.style.marginRight = '8px'; // Space between types
                    typeSpan.style.display = 'inline-block'; // Make it inline-block

                    typesElement.appendChild(typeSpan);
                });

                typesElement.style.display = 'flex'; // Use flexbox for layout


                // Update Pokémon stats
                document.getElementById('hp').textContent = data.stats[0].base_stat;
                document.getElementById('attack').textContent = data.stats[1].base_stat;
                document.getElementById('defense').textContent = data.stats[2].base_stat;
                document.getElementById('special-attack').textContent = data.stats[3].base_stat;
                document.getElementById('special-defense').textContent = data.stats[4].base_stat;
                document.getElementById('speed').textContent = data.stats[5].base_stat;

                // Display the Pokémon image
                const sprite = document.getElementById('sprite');
                sprite.src = data.sprites.front_default;
                sprite.style.display = 'block'; // Show the image
            })
            .catch(error => {
                console.error('Error fetching Pokémon data:', error);
                alert('Pokémon not found');
            });
    } else {
        alert('Please enter a Pokémon name or ID!');
    }
});
