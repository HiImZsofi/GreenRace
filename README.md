<h1>Hogyan indítsd el</h1>
<ul>
<li>Klónozd le a repositoryt</li>
<code>git clone [url]</code>
<li>Navigálj a dev branchre</li>
<code>git checkout dev</code>
<li>Futtasd le az összes adatbázis parancsot</li>
<code>node createTable.js | node loadStopsData.js | node loadRouteData.js | node achievements.js </code>
<li>Menj vissza mainre</li>
<code>git checkout main</code>
<li>Indítsd el a szervert</li>
<code>cd ./server -> npm run start</code>
<li>Indítsd el a reactot</li>
<code>cd ./client -> npm run start</code>
</ul>
<h1>Mi található a repoban?</h1>
<ul>
<li>server -> Backend source kód(express.js)</li>
<li>client -> Frontend source kód(react webapp)</li>
<li>Greenrace_Mobil -> Mobil teljes source kód(kotlin)</li>
<li>dev -> csak dev branchen az adatbázis betöltő scriptek(typescript)</li>
<li>resources -> vizsgához szükséges dokumentáció, dumpok</li>
</ul>
