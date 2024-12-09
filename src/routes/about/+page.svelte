<svelte:head>
	<title>Om oss</title>
	<meta name="description" content="About this app" />
</svelte:head>

<h1>Om FraktHjälpen</h1>
<div class="boxes">
    <div class="box">
        <h2>Bakgrund</h2>
        <p>
            Problemet runt det begränsade utbudet av fysiska butiker på glesbygden är något vi själva  upplevt.
        </p>
        <p>
            I början av vårt UF-år bestämde vi oss för att ta fram en hållbar lösning till problemet.
        </p>
        <p>
            Idag driver vi UF-företaget FraktHjälpen UF, som erbjuder tjänster i form av frakthjälp mellan privatpersoner.
        </p>
    </div>
    <div class="box">
        <h2>Organisation</h2>
        <p>
            FraktHjälpen är ett UF-företag på Sollefteå Gymnasium som har tagit tag i problemet med  det begränsade utbudet av fysiska butiker på glesbygden.
        </p>
        <p>
            Vårt UF-företag består av tre drivna och engagerade flickor: Théa, Felicia och Matilda.
        </p>
    </div>
    <div class="box">
        <h2>Vår tjänst</h2>
        <p>
            FraktHjälpen UF är en mellanhand i transaktionen mellan mottagare och frakthjälpare.
        </p>
        <p>
            Genom vår tjänst kan privatpersoner hjälpa varandra att frakta eller inhandla produkter, mot betalning för vara och frakt.
        </p>
        <p>
            Grundtanken är att personer som redan är ute i butik kan hjälpa grannar och andra genom att inhandla och frakta paket.
        </p>
    </div>
    <div class="box">
        <h2>Vi jobbar med hållbarhet!</h2>
        <p>
            Privatpersoner kommer inte att behöva göra en extra resa för enstaka produkter, vilket underlättar för glesbygdsbor som ofta har långa avstånd till fysiska butiker.
        </p>
        <p>
            Genom att privatpersoner kan hjälpa varandra främjar vi även gemenskap och sociala nätverk, vilket är socialt hållbart. Vår tjänst ger också ekonomiska fördelar för lokalsamhället, då de kan tjäna extrapengar genom att hjälpa varandra.
        </p>
    </div>
</div>
<div class="text-column">
    <h2 id="bp">Köpskydd</h2>
	<p>
        FraktHjälpen UF är en mellanhand som håller i pengar från en köpare tills paketet har levererats. Betalningen sker via kortbetalning till företaget, som i sin tur betalar ut till frakthjälparen när paketet kommit fram i rätt skick, via banköverföring. Ett köpskydd är därför en extra kostnad som tillkommer i priset, det är obligatoriskt på grund av säkerhetsskäl. 
    </p>
    <p>
        Det fasta köpskyddet innebär att en frakthjälpare endast fraktar en produkt, fast köpskydd motsvarar en fjärdedel av viktpriset. Köparen 
        Det rörliga köpskyddet innebär att en frakthjälpare köper en produkt och fraktar den till mottagaren, rörligt köpskydd motsvarar en tiondel av priset för produkten. 
	</p>
</div>

<style>
    .boxes {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .box {
        font-size: 16pt;
        border: 2px solid var(--ctext);
        border-radius: 15px;
        padding: 1em;
        background-color: var(--background-opaque);
        margin: 1em;
        max-width: 18em;
    }

    h2 {
        font-size: 20pt;
        border-bottom: thick solid var(--ctheme-1);
        color: black;
        padding-bottom: 5px;
        min-height: 3em;
    }
    h1 {
        margin-top: 1.5em;
        text-align: left;
        font-weight: 600;
        color: black;
        font-size: 42pt;
        border-bottom: thick solid var(--ctheme-1);
        padding-bottom: 0.3em;
    }
    p {
        text-align: center;
    }
</style>
