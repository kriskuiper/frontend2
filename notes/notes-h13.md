# JavaScript and the browser
## Networks and the internet
Een computer kan zijn *network* gebruiken om bestandjes door te schieten naar andere computers. Om ditsoort communicatie effectief te kunnen uitvoeren zijn moet zowel de versturende als ontvangende computer weten wat de bits inhouden. De waarde van elk groepje bits hangt af onder andere af van de *encoding* (bijv `utf8`).

Hiervoor is zijn *network protocols* in het leven geroepen. Zij beschrijven de stijl van communicatie over een netwerk. Een aantal voorbeelden van protocollen zijn:
* Hypertext Transfer Protocol (*HTTP*)
* Transmission Control Protocol (*TCP*)
* Email protocol (*SMTP*)

Contact tussen twee 'computers' wordt gelegd door aan de ene kant een *listener* (een nummertje zoals port:80), ook wel de server, aan de andere kant is de vragende computer die probeert connectie te maken (de *client*). 
 
## The web
Om onderdeel van het web te worden hoef je alleen een machine te koppelen aan het internet en hem laten 'luisteren' naar port 80 met een `HTTP` protocol zodat andere computers documenten kunnen opvragen en mappen kunnen openen.

Dat doet een andere computer door een *URL* op te vragen (een Uniform Resource Locator) die als volgt is opgebouwd:
```
https://www.somewebsite.com/index.html
|      |                   |          |
protocol       server          path
(HTTP)      (De listener) (Bestandje op server)
```

## HTML
HTML is zoals bekend de structuur van een webpagina. In HTML heb je echter ook zogenaamde *entities* die opgebouwd zijn uit een `&`, wat tekst, en afgesloten wordt met een `;`. Voorbeelden van entities zijn:
* `&gt;` (greater than)
* `&lt;` (less than)
* `&copy;` (Copyright)

HTML wordt in een erg tolerante manier geparsed. Wanneer er bijv. closing tags missen dan voegt de browser deze zelf toe. Je zou dus bij wijze van spreken zo een HTML document kunnen schrijven:

```html
<!doctype html>
<!-- Geen head tag, de browser weet zelf dat deze info in de <head> hoort -->
<meta charset=utf-8>
<title>My home page</title>

<!-- De closing tags van de <h1> en <p> elementen missen -->
<h1>My home page
<p>Hello, I am Marijn and this is my home page.
<p>I also wrote a book! Read it<a href=http://eloquentjavascript.net>here</a>
```

## HTML and JavaScript
Met de `<script>` tag in HTML kan je twee dingen doen, enerzijds kan je er JavaScript in schrijven (liever niet want dat gaat tegen het principe van het scheiden van bestanden in)...

```html
<script>
    function doSomething() {
        // my code
    }
</script>
```

...anderzijds kan je een extern JavaScript bestand linken, idealiter doe je dit onderaan je `body` (yay, much better):

```html
<script src="scripts/main.js"></script>
```

### In the sandbox
Iets downloaden van internet kan potentieel heel gevaarlijk zijn, je weet vaak niet wie de code voor programma x heeft geschreven en wat die doet, voor het zelfde geld gooit het vet veel virussen op je pc, dat wil je dus niet hebben. Iets wat je kan doen om dat te voorkomen is het isoleren van een programmeer-omgeving, ook wel *sandboxing* genoemd.

Het idee erachter is dat het betreffende programma dat je gedownload hebt zonder nare effecten in een 'zandbak' aan het spelen is en het dus je eigen laptop of pc niet kan schaden. Het programma kan namelijk niet uit de zandbak komen en op het schoolplein (jouw pc of laptop) gaan spelen.

## Compatibility and the browser wars
In het begin van het web waren er verschillende browsers zoals Mosaic/Netscape (tegenwoordig Mozilla Firefox), Internet Explorer, Safari die eigenlijk allemaal net anders reageerden of andere standaarden hanteerden waardoor het bouwen van websites nogal ruk was omdat je daadwerkelijk rekening moest houden met allemaal verschillende implementaties van je code door de verschillende browsers.

Tegenwoordig is dit geharrewar aardig opgeklaard en maken alle browsers ongeveer in gelijke mate gebruik van dezelfde standaard waardoor het bouwen van een website of het web een stuk eenvoudiger is. Echter, je moet wel rekening houden met oudere browsers, niet iedereen draait op de nieuwste browser(versie). ...ugh, IE7, ugh.