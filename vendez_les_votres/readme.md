# Projet JSFS - Vendez Les Votres, *single page application*

# Binôme Ledun Skoczylas

## Commandes

Depuis le dossier `server\database`,  tapez dans votre commande :

```bash
mongod -dbpath .
```

Puis depuis le dossier `\server`, entrez :

```bash
npm run start
```

Enfin allez à `http://localhost:3000` dans votre navigateur (de préférence *Firefox*).

## Etat du projet

* **Nous avons réalisé le projet en entier**.

* L'accueil et la partie authentification ne sont pas en *single page application*. Il est indispensable de se connecter pour accéder à la partie *achat/vente* et y effectuer des opérations (achat, vente, suppression).

* La partie *achat/vente* est faite selon la norme *rest API*, et est en *single page application*. Vous y accéderez depuis l'onglet **Annonces** de la barre de navigation.

* La création d'objet se fait via un formulaire, dans un menu dépliant caché par défaut, sur lequel il faut cliquer pour le déplier. L'implémentation du menu dépliant est fortement inspirée d'une ressource en ligne.

* Il n'est ***pas possible*** de **supprimer l'annonce d'un autre utilisateur**, ni d'**acheter un objet que l'on a mis en vente**, ni d'**acheter un objet trop cher**, ni de **mettre en vente un objet dont le prix est négatif**.

* **Bonus:** Il est ***possible***, à la création d'une annonce, d'**indiquer un lien vers une image** qui consistera en l'image de l'objet dans la liste des annonces. 

* Nous n'avons pas réalisé d'autres options bonus. Il est possible de modifier son *login* sur la page **Gestion de compte**, mais cette fonctionnalité était déjà fournie dans l'exemple du cours...

* La création de la page *achat/vente* n'est pas implémentée en *React*.

* Le style CSS est fortement inspiré des exemples fournis dans le cours ainsi que de ressources en ligne.
