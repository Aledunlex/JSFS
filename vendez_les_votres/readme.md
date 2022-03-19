#Projet  JSFS

# Binôme Ledun Skoczylas

## Commandes

mongod -dbpath .\tDepuis le dossier server\database
puis

npm run start

depuis le dossier server

puis localhost:3000 dans firefox

### TODO

* pouvoir acheter, mettre à jour en direct l'affichage de mon argent restant + supprimer l'annonce de l'objet acheté en direct
    * sur chaque page itemdetail :
        * déterminer si l'item nous appartient via le userId; si non, afficher un bouton "acheter"; il faut rendre l'action impossible dans ce cas même en tapant manuellement le lien
        * afficher le login de l'utilisateur connecté + la somme d'argent qu'il a avant achat
        * une fois acheté, retour sur la page des annonces, et cette annonce doit avoir été supprimée + l'argent restant mise à jour

* gérer les cas d'erreur :
    * acheter un objet qui n'existe pas (?)
    * acheter un objet trop cher
    * probablement d'autres auxquels j'ai pas pensé...

* Toute la Q6 qui consiste à créer l'app cliente, en implémentant avec React de préférence

* affichage du dernier objet qu'on a acheté (sans le stocker en base -> comment? cookies?)

* (option) ajouter une image à son annonce et peut être la rendre visible sur la liste des items en vente

* (option) faire un truc un peu beau...

### DONE

* Création d'utilisateur, connexion, déconnexion

* Création d'objet lié à celui qui l'a créé, suppression de l'annonce par celui qui l'a créé

* Une barre de navigation...

* Les anciennes pages .html ont été transformées en .pug avec plus ou moins de précision...

* Il est impossible de supprimer ou modifier l'annonce de qqu'un d'autre (du moins pas en passant par une page avec formulaire)

* Affichage distinct entre "mes annonces" et celles des autres

