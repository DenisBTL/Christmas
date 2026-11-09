# Chez Laulau · Noël 2026

Invitation de Laura. Sources : https://github.com/DenisBTL/Christmas

Lien public de consultation : https://noel-laulau-reponses-github.norbertmoutier.chatgpt.site

Lien GitHub prévu après activation de Pages sur main, dossier /docs : https://denisbtl.github.io/Christmas/

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

Le bouton « Musique de Noël » joue un arrangement instrumental de « Vive le vent » (Jingle Bells), avec des clochettes synthétisées directement dans le navigateur. Il démarre uniquement au clic, peut être coupé et s’arrête quand l’onglet est masqué. Aucune piste enregistrée ni service audio externe n’est utilisé. La partition et le moteur audio sont dans `lib/christmas-music.ts`.
Le point d’entrée GitHub est `github/main.tsx`. La construction produit `docs/`, publié par GitHub Pages depuis la branche main. Reconstruire et inclure `docs/` dans chaque commit qui modifie le site.

## Réponses partagées

GitHub Pages héberge le site et les animations. L’enregistrement partagé utilise le Worker déclaré dans `services/replies-hosting.json`, avec une base D1 et les migrations de `drizzle/`. Le code du Worker est conservé dans `services/replies-relay.mjs` et son test SQLite dans `services/check-replies.mjs`.

Le point d’accès est défini dans `vite.github.config.ts`. Son CORS autorise l’origine GitHub Pages et sa propre origine pour la consultation directe. Les erreurs réseau et les réponses invalides sont affichées sans prétendre que l’enregistrement a réussi. `node scripts/prepare-replies-site.mjs` prépare aussi le site public depuis les fichiers construits de `docs/`.

Seul le prénom est demandé et affiché dans le récapitulatif. Un identifiant aléatoire, enregistré sur l’appareil de l’invitée, permet de mettre à jour sa réponse sans doublon. Les nouvelles réponses n’enregistrent aucun nom de famille ; les anciens noms ne sont plus affichés. Changer d’appareil ou effacer les données du navigateur ne permet pas de retrouver cet identifiant.

La préférence de réduction des animations est respectée : neige immobile, pas de pluie de marshmallows ni de déplacement d’animaux, et confirmation immédiate.

## Hébergement

Le site historique Sites de Laura reste inchangé et conserve sa configuration `.openai/hosting.json`. La version GitHub utilise un service de réponses distinct, appartenant au compte Sites actuellement disponible. Aucune réponse n’était présente sur le service historique au moment du passage à GitHub.

Les sources locales et les sources du service de réponses sont conservées. Aucun jeton GitHub ne figure dans le dépôt, les fichiers construits ou le navigateur des invitées.
