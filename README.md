# Pluginhrnet- Dropdown

Un composant React réutilisable pour une liste déroulante stylisée.

## Installation

Pour installer le pluginhrnet dans votre projet, utilisez la commande npm suivante :

bash: 
npm install pluginhrnet



## Utilisation

1.Importez le composant dans votre fichier React :

 import Dropdown from 'pluginhrnet';

2.Utilisez le composant dans votre code avec les propriétés nécessaires :

<Dropdown
  dropdownData={yourDropdownData}
  onChange={handleDropdownChange}
  onReset={resetDropdown}
  name="yourDropdownName"
  id="yourDropdownId"
/>

## Propriétés

<dropdownData : un tableau de données pour alimenter la liste déroulante.

onChange : une fonction de rappel qui sera appelée lorsque la sélection change.

onReset : une propriété booléenne qui réinitialise le composant lorsque sa valeur change.

name : un nom optionnel pour le composant.

id : un identifiant optionnel pour le composant.

### Exemple
Voici un exemple d'utilisation du composant Dropdown dans votre composant React :

import React, { useState } from 'react';
import Dropdown from 'pluginhrnet';

const VotreComposant = () => {
  const [optionSelectionnee, setOptionSelectionnee] = useState('');

  const gestionChangementDropdown = (selection) => {
    setOptionSelectionnee(selection);
  };

  const donneesDropdown = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <div>
      <Dropdown
        dropdownData={donneesDropdown}
        onChange={gestionChangementDropdown}
        name="exempleDropdown"
        id="exempleDropdownId"
      />
      <p>Option sélectionnée : {optionSelectionnee}</p>
    </div>
  );
};

export default VotreComposant;


## Documentation

Pour plus d'informations sur les fonctionnalités et les options du composant Dropdown, veuillez consulter la documentation du composant.

## Contribuer
Les contributions sont les bienvenues ! Pour toute suggestion ou rapport de bogue, veuillez créer une nouvelle issue sur le dépôt GitHub du projet.

# Licence
Ce projet n'est pas sous licence MIt 