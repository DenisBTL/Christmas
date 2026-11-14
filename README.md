# Chez Laulau · Noël 2026

Invitation de Laura. Sources : https://github.com/DenisBTL/Christmas

Lien public de consultation : https://denisbtl.github.io/Christmas/

GitHub Pages est activé sur la branche `main`, dossier `/docs`.

Autre lien de consultation : https://noel-laulau-reponses-github.norbertmoutier.chatgpt.site

Maison en pain d’épices à deux niveaux, toit arrondi enneigé et frise en volutes, décor beige à l’arrivée puis bordeaux après le premier clic, neige continue. Une frise de cœurs bordeaux et de glaçage blanc sépare les deux niveaux. Les volets courbes restent ouverts et les deux baies du rez-de-chaussée sont fixes. La porte accueille trois rennes, puis un golden déguisé en renne, et se referme après leur passage.

Les fenêtres affichent leurs contenus devant la maison : bar à hot chocolate avec pluie de marshmallows après six ajouts, décos facultatives pour les cookies préparés par Laura, et rappel de la tenue de Noël. Le formulaire permet de choisir plusieurs dates en décorant un sapin.

## Développement

Node.js 22.13 ou ultérieur. Sous Windows, utiliser npm.cmd si PowerShell bloque npm.ps1.

- Installation : `npm.cmd run install:ci`
- Développement complet local : `npm.cmd run dev`
- Vérification des types : `node node_modules/typescript/bin/tsc --noEmit`
- Publication statique à préparer : `npm.cmd run build:github`
- Aperçu de la version GitHub : `node node_modules/vite/bin/vite.js preview --config vite.github.config.ts`

Les dates sont définies dans `lib/christmas.ts` : 12, 13, 21, 22 et 23 décembre 2026.

Le bouton « Musique de Noël » ouvre le lecteur YouTube de « Santa Claus Is Coming to Town » des Andrews Sisters. La vidéo choisie par Laura contient un album complet : https://www.youtube.com/watch?v=GHaRsbAZiyE. Les repères de sa description délimitent le morceau de 08:41 à 11:20 : le lecteur utilise `start=521&end=680`, sans radio, playlist ou boucle d’album. Le lecteur reste visible, avec les commandes YouTube et un lien direct au début du morceau. Il n’est chargé qu’au clic. Fermer le lecteur ou masquer l’onglet coupe la musique. Le composant est dans `app/christmas-music.tsx` ; aucun enregistrement audio n’est copié dans le dépôt. La disponibilité de la lecture intégrée dépend de YouTube et des réglages de la vidéo.
Le point d’entrée GitHub est `github/main.tsx`. La construction produit `docs/`, publié par GitHub Pages depuis la branche main. Reconstruire et inclure `docs/` dans chaque commit qui modifie le site.

## Réponses partagées

GitHub Pages héberge le site et les animations. L’enregistrement partagé utilise le Worker déclaré dans `services/replies-hosting.json`, avec une base D1 et les migrations de `drizzle/`. Le code du Worker est conservé dans `services/replies-relay.mjs` et son test SQLite dans `services/check-replies.mjs`.

Le point d’accès est défini dans `vite.github.config.ts`. Son CORS autorise l’origine GitHub Pages et sa propre origine pour la consultation directe. Les erreurs réseau et les réponses invalides sont affichées sans prétendre que l’enregistrement a réussi. `node scripts/prepare-replies-site.mjs` prépare aussi le site public depuis les fichiers construits de `docs/`.

Seul le prénom est demandé et affiché dans le récapitulatif. Un identifiant aléatoire, enregistré sur l’appareil de l’invitée, permet de mettre à jour sa réponse sans doublon. Les nouvelles réponses n’enregistrent aucun nom de famille ; les anciens noms ne sont plus affichés. Changer d’appareil ou effacer les données du navigateur ne permet pas de retrouver cet identifiant.

La préférence de réduction des animations est respectée : neige immobile, pas de pluie de marshmallows ni de déplacement d’animaux, et confirmation immédiate.

## Hébergement

Le site historique Sites de Laura reste inchangé et conserve sa configuration `.openai/hosting.json`. La version GitHub utilise un service de réponses distinct, appartenant au compte Sites actuellement disponible. Aucune réponse n’était présente sur le service historique au moment du passage à GitHub.

Les sources locales et les sources du service de réponses sont conservées. Aucun jeton GitHub ne figure dans le dépôt, les fichiers construits ou le navigateur des invitées.


## Invitations personnalisées et carnet privé

Le bouton « Recevez votre invitation » ouvre les lettres personnelles. La liste dans `lib/guests.json` est la source des huit invitées et des dates attribuées : Marie, Lara, Lou et Lucinda le 12 décembre ; Joséphine, Jade, Malou et Victoire le 22 décembre 2026. Laura complète les neuf prénoms de la table. Les anciennes disponibilités restent conservées séparément.

Après la lettre, le parcours propose les films, puis la présence et les allergies/intolérances. `POST /api/invitations` enregistre ces réponses dans `invitation_responses`. Les modifications depuis le même appareil utilisent un identifiant aléatoire ; un autre identifiant ne peut pas écraser une réponse déjà reçue. Les allergies et les films ne sont jamais renvoyés par le récapitulatif public des disponibilités. Le navigateur ne conserve que les identifiants de modification, sans information alimentaire.

Laura consulte `#organisation/<clé privée>` sur le site. La clé de 64 caractères est une valeur secrète de production nommée `ORGANIZER_KEY`, configurée avec Sites et absente du dépôt. Le navigateur transmet cette clé au seul point d’accès `POST /api/organizer`, dans l’en-tête Authorization. Ce lien privé donne accès aux réponses sans compte : ne pas le diffuser aux invitées. Il permet d’actualiser les réponses et de télécharger un CSV compatible Excel et Google Sheets. Aucun compte Google ni connexion Google Drive n’est nécessaire.

Les routes locales Vinext utilisent les mêmes règles. Le Worker hébergé est assemblé depuis `services/invitations.mjs`, le registre des invitées et `services/replies-relay.mjs`. `scripts/prepare-replies-site.mjs` copie aussi les migrations pour la publication Sites. Générer une nouvelle migration pour chaque changement de schéma ; ne pas modifier les migrations déjà appliquées.

Vérifications :
- `node services/check-replies.mjs` : anciennes disponibilités.
- `node services/check-invitations.mjs` : nouvelles réponses, dates canoniques, accès privé, CORS, limites et protection contre l’écrasement.
- `node node_modules/typescript/bin/tsc --noEmit`, puis `npm.cmd run build:github`.
