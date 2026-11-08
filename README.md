# Chez Laulau · Noël 2026

Invitation de Laura, publiée sur GitHub Pages : https://denisbtl.github.io/Christmas/

Maison en pain d’épices à deux niveaux, décor beige à l’arrivée puis bordeaux après le premier clic, neige continue. Les volets courbes restent ouverts et les deux baies du rez-de-chaussée sont fixes. La porte accueille trois rennes, puis un golden déguisé en renne, et se referme après leur passage.

Les fenêtres affichent leurs contenus devant la maison : bar à hot chocolate avec pluie de marshmallows après six ajouts, décos facultatives pour les cookies préparés par Laura, et rappel de la tenue de Noël. Le formulaire permet de choisir plusieurs dates en décorant un sapin.

## Développement

Node.js 22.13 ou ultérieur. Sous Windows, utiliser npm.cmd si PowerShell bloque npm.ps1.

- Installation : `npm.cmd run install:ci`
- Développement complet local : `npm.cmd run dev`
- Vérification des types : `node node_modules/typescript/bin/tsc --noEmit`
- Publication statique à préparer : `npm.cmd run build:github`
- Aperçu de la version GitHub : `node node_modules/vite/bin/vite.js preview --config vite.github.config.ts`

Les dates sont définies dans `lib/christmas.ts` : 12, 13, 21, 22 et 23 décembre 2026.
Le point d’entrée GitHub est `github/main.tsx`. La construction produit `docs/`, publié par GitHub Pages depuis la branche main. Reconstruire et inclure `docs/` dans chaque commit qui modifie le site.

## Réponses partagées

GitHub Pages héberge le site et les animations. L’enregistrement partagé utilise le Worker déclaré dans `services/replies-hosting.json`, avec une base D1 et les migrations de `drizzle/`. Le code du Worker est conservé dans `services/replies-relay.mjs` et son test SQLite dans `services/check-replies.mjs`.

Le point d’accès est défini dans `vite.github.config.ts`. Son CORS autorise exclusivement l’origine GitHub Pages. Les erreurs réseau et les réponses invalides sont affichées sans prétendre que l’enregistrement a réussi.

Le prénom et l’initiale du nom sont affichés dans le récapitulatif. Le nom complet et un identifiant aléatoire sont conservés côté serveur. L’identifiant, enregistré sur l’appareil de l’invitée, permet de mettre à jour sa réponse sans doublon. Changer d’appareil ou effacer les données du navigateur ne permet pas de retrouver cet identifiant.

La préférence de réduction des animations est respectée : neige immobile, pas de pluie de marshmallows ni de déplacement d’animaux, et confirmation immédiate.

## Hébergement

Le site historique Sites de Laura reste inchangé et conserve sa configuration `.openai/hosting.json`. La version GitHub utilise un service de réponses distinct, appartenant au compte Sites actuellement disponible. Aucune réponse n’était présente sur le service historique au moment du passage à GitHub.

Les sources locales et les sources du service de réponses sont conservées. Aucun jeton GitHub ne figure dans le dépôt, les fichiers construits ou le navigateur des invitées.
