# Noël chez Laulau

Invitation de Noël interactive : maison en pain d’épices bordeaux et glaçage blanc, enveloppe animée, choix de plusieurs dates et récapitulatif partagé.

La maison cache trois surprises : chocolat et marshmallows, biscuit qui fait un clin d’œil et petits bonheurs à découvrir. Les trois découvertes allument sa guirlande. La neige peut être arrêtée depuis l’en-tête.

Les disponibilités se choisissent en allumant les boules datées d’un sapin. La lettre se personnalise avec le prénom. Après confirmation d’enregistrement par le serveur, une animation livre le petit mot dans la boîte aux lettres. La tablée des réponses affiche les prénoms et initiales des personnes ayant répondu.

## Développement

Node.js 22.13 ou ultérieur. Sous Windows, employer npm.cmd si PowerShell bloque npm.ps1.

- Installer : `npm.cmd run install:ci`
- Démarrer : `npm.cmd run dev`
- Vérifier les types : `node node_modules/typescript/bin/tsc --noEmit`
- Construire : `npm.cmd run build`

Les dates sont définies dans `lib/christmas.ts` : 12, 13, 21, 22 et 23 décembre 2026.
Les réponses sont enregistrées côté serveur dans D1, avec le binding DB déclaré dans `.openai/hosting.json`.
Les migrations figurent dans `drizzle/` et sont appliquées par Sites lors de la publication.

## Réponses

Le prénom et l’initiale du nom sont affichés dans le récapitulatif. Le nom complet est conservé côté serveur.
Un identifiant aléatoire, conservé sur l’appareil de l’invité, permet de modifier sa propre réponse sans en créer une deuxième.
Changer d’appareil ou effacer les données du navigateur ne permet pas de retrouver cet identifiant.

Le formulaire confirme uniquement les envois enregistrés par le serveur. Une erreur de réseau permet de réessayer en conservant les choix.
Le site respecte la préférence de réduction des animations, utilise une boîte de dialogue native et reste accessible au clavier.

## Publication

La configuration et l’identité du site sont conservées dans `.openai/hosting.json`.
Utiliser le flux de publication du plugin Sites pour synchroniser le code et publier une version construite du même commit.
Ne jamais mettre de jeton ou de mot de passe dans ce dépôt.
