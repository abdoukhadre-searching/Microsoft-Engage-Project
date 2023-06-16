# Face School Tracking ✨ (extension  proctoring) - Un outil de surveillance automatique des examens en ligne

# About Face School 👓 Proctoring
**Face School Proctoring** est un outil de surveillance en ligne que les professeurs peuvent utiliser pour créer des examens surveillés à l'aide de l'IA. Ils peuvent également voir le statut de chaque étudiant qui passe l'examen en temps réel. **Il est rapide, facile à utiliser et incroyablement pratique avec une interface utilisateur minimaliste.
Pour créer un examen, il suffit de s'inscrire et de se connecter à votre compte, de cliquer sur le bouton Créer un examen et d'entrer les détails comme le nom de l'examen, le lien vers l'examan, la date et l'heure de début et la durée. **FSP** génère un code d'examen unique que vous pouvez distribuer aux étudiants. Les étudiants commencent l'examen en se connectant et en entrant le code d'examen pendant que l'examen est en cours. Pendant qu'ils passent l'examen, ils sont **protégés par un système basé sur l'IA**. En entrant le code d'examen, le professeur peut voir le statut de tous les étudiants en **temps réel**.
# Coté Tech Stack
**Frontend-** React.js, Redux, Material-UI, Materialise.css
**Backend-** Node.js, Express.js, Passport.js, JWT
**Database-** MongoDB Atlas, Mongoose
**Deep Learning Model-** Tensorflow Implementation of CocoSSD Object Detection Model

# Video Demo
[![Video Link](https://bseenlive.com/wp-content/uploads/2018/03/Youtube-Logo-Small.png)](https://www.youtube.com/watch?v=P95pdFGkEtE)


# Comment le lancer ?

## Note
Si vous souhaitez l'exécuter sur votre machine,
1. Clone le Repository
2. Deplacer vous sur le dossier **`Face School Tracking Proctoring`**
`cd 'Face School Tracking Proctoring'`
3. Lancer `npm install`
4. Déplacez-vous dans le répertoire `client` et exécutez npm install à nouveau. `cd client` et `npm install`
5. Retourner au répertoire parent `cd ..`
6. Exécuter la commande npm run dev `npm run dev`

Cela permet d'exécuter simultanément le serveur et le frontend. Laissez quelques secondes au frontend pour se charger sur localhost:3000
## Pour le profil Professeur:

1. Ouvrir l'url http://localhost:3000 Le chargement peut prendre un certain temps la première fois, mais il sera plus rapide la fois suivante.
2. Cliquez sur `Creer un compte` , et sur le toggle pour créer un compte professeur.
3. Connectez-vous à votre compte.
4. Cliquez sur le bouton Créer un examen. Remplissez le formulaire. Dans l'option Lien de l'examen, vous pouvez saisir n'importe quel lien (formulaire Google, formulaire Microsoft, etc.) sur lequel vous avez créé le quiz.
5. Une fois que l'examen est en ligne, vous pouvez saisir le code de l'examen sur la page d'accueil et cliquer sur le bouton Vérifier les journaux pour voir le statut des étudiants qui passent l'examen en temps réel. Pour actualiser le tableau, il suffit de cliquer à nouveau sur Vérifier les journaux.

## Pour le profil Etudiant
1. Ouvrir  http://localhost:3000 Le chargement peut prendre un certain temps la première fois, mais il sera plus rapide la fois suivante.
2. Cliquez sur `Creer un compte` , Décocher `etes vous un instructeur ou professeur` pour créer un compte en tant qu'etudiant.
3. Connectez-vous à votre compte.
4. Lorsque l'examen a commencé, entrez le code d'examen fourni par votre professeur et cliquez sur le bouton pour commencer l'examen.
5. Assurez-vous d'être assis dans une salle bien éclairée. N'essayez pas de tricher car vos actions sont enregistrées !

# Liste des Fonctionnalités

## Fonctionnalités sur le Protoring Exam :

1. Détection de personne : Si l'élève quitte le cadre et ne revient pas au bout de quelques secondes, cette action est enregistrée.
2. Détection de plusieurs personnes : Si, à un moment quelconque de l'examen, plus d'une personne est visible à travers la webcam, cette action est enregistrée. Il n'est pas nécessaire que les visages soient visibles, car il s'agit d'une détection de personnes et non d'une détection de visages.
3. Détection des téléphones portables : Si l'étudiant est détecté en train d'utiliser un téléphone portable pendant l'examen, cette action est enregistrée.
4. Détection d'objets interdits : Si l'étudiant tente d'utiliser un objet interdit tel qu'un livre ou un ordinateur portable, cette action est enregistrée.
5. Détection de changement d'onglet : L'outil compte le nombre de fois où l'élève essaie de changer d'onglet ou d'ouvrir une autre application.
6. Détection des touches interdites : L'outil compte le nombre de fois où l'étudiant tente d'appuyer sur une touche interdite (Ctrl, Alt). Il s'agit de décourager le copier-coller et le partage des questions d'examen avec d'autres personnes ou l'utilisation d'autres raccourcis.
7. Prévention du clic droit : Il n'est pas possible de cliquer avec le bouton droit de la souris pendant l'examen.
8. Redémarrage de l'examen : Si, en raison d'un problème de réseau ou autre, l'examen est interrompu, il est possible de le redémarrer dans le temps imparti (entre le début et la fin de l'examen), mais le temps perdu n'est pas récupéré.

Note - Puisque dans l'itération actuelle du projet on utilise le lien actif fourni par le professeur au lieu de faire les questions dans l'application elle-même, il est impossible d'y mettre des `key listeners` et une prévention de clic droit puisque c'est une application tierce et que React l'empêche pour des raisons de sécurité.
Pour tester ces fonctionnalités, merci de faire `ctrl press`, `alt press` et `clic droit` sur le côté gauche de l'écran uniquement.

## Fonctionnalités coté Professeurs:
1. Boîte de dialogue de création d'examen simple à utiliser qui copie automatiquement le code d'examen généré dans le presse-papiers.
2. Tableau dynamique des journaux des étudiants avec fonctionnalité de tri par nom, e-mail, etc., pagination, sélecteur de nombre d'entrées par page et boutons pour aller aux pages suivantes et précédentes.
3. Fonctionnalité de recherche avancée pour le tableau des journaux. Il est possible d'effectuer une recherche sur une partie du nom, de l'adresse électronique, etc. et les résultats de la recherche sont mis à jour au fur et à mesure de la saisie. Il est également possible de trier par ordre croissant ou décroissant sur la base de chaque colonne en cliquant sur l'en-tête de la colonne.
 
