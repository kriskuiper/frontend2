# Handling Events

## Event Handlers
Om een event af te vangen en aan de hand daarvan iets met gebruikersinput te doen (bijv. een click) moet de browser 'luisteren' naar de te verwachten input en aan de hand daarvan een functie uitvoeren. De functie die de browser daarna moet uitvoeren noem je de *Event handler*. Stel je voor je hebt deze HTML:

```html
<p>Klik op het document om de handler te activeren.</p>
```
En deze JS:
```js
window.addEventListener("click", displayKnocked);
//                    | listener |   handler   |
// Luister naar een click, als dit gebeurt voer 
// dan de displayKnocked functie uit.

function displayKnocked() {
    console.log("You knocked?");
}
```
## Events and DOM Nodes
Event listeners worden alleen geregistreerd als er iets gebeurt in de context waarin ze geplaatst zijn. In het vorige voorbeeld was die context het `window` object. In het onderstaande voorbeeld is dat een `button`:

```html
<button>Click me</button>
<p>Ik val buiten de context</p>
```

```js
const button = document.querySelector("button");

button.addEventListener("click", handleClick);
// Hier wordt de 'context' toegekend aan de button.
// Alleen als er op de button geklikt wordt activeert de event handler.

function handleClick() {
    console.log("Clicked!")
}
```
Je kan ook een event handler aan een Node toevoegen door hem bijv. een `onclick` attribuut mee te geven. Echter, een Node kan maar één waarde hebben voor `onclick` maar kan meerdere Event Listeners hebben waardoor er in JavaScript meer handlers geactiveerd kunnen worden bij één click.

Een Event Listener kan je verwijderen door i.p.v. `addEventListener` `removeEventListener` te gebruiken met hetzelfde argument als `addEventListener`.
## Event objects
Hoewel je het niet direct ziet krijgt elke event handler functie een argument `event` mee. Dat object beschikt over meer informatie over het event. Bijvoorbeeld over waar op de button geklikt is met de precieze waarden.
```html
<button>Click me anyway you want.</button>
```
```js
const button = document.querySelector('button');

button.addEventListener("mousedown", (event) => {
    if (event.button === 0) {
        console.log("On the left of the button");
    } else if (event.button === 1) {
        console.log("On the middle of the button");
    } else if (event.button === 2) {
        console.log("On the right of the button");
    }
});
```

## Propagination
*Propagination* houdt in dat als op zowel het parentelement als het childelement een eventhandler zit, dat beide handlers worden uitgevoerd:
```html
<p>Dit is een zin met een <button>button</button>.</p>
```
```js
const zin = document.querySelector("p");
const button = document.querySelector("button");

zin.addEventListener("mousedown", () => {
    console.log("handler for zin");
});

button.addEventListener("mousedown", event => {
    console.log("handler for button");
    if (event.button === 2) event.stopPropagination();
    // Als er rechts op de button geklikt wordt zorgt de event.stopPropagination method ervoor dat de propagination gestopt wordt en de handler op de zin niet meer geactiveerd wordt.
});
```

De meeste event objecten hebben een `target` property dat refereert naar de node waarvanuit ze zijn ontstaan. Je kan de `target` property gebruiken om er zeker van te zijn dat je niet iets handled wat naar boven *propagated* is vanuit een node die je niet wil handlen.

Je kan doormiddel van de `target` property ook een net voor één eventListener maken voor de 'outer' node en die laten activeren als er op 'inner' nodes geklikt wordt:

```html
<button>A</button>
<button>B</button>
<button>C</button>
```
```js
document.body.addEventListener("click", event => {
    if (event.target.nodeName === "BUTTON") {
        console.log("Clicked", event.target.textContent);
    }
});
```
 
## Default actions
Default acties van de browser zoals het gaan naar een andere pagina bij het klikken op een link kan je voorkomen door `event.preventDefault` te gebruiken:

```html
<a href="https://developer.mozilla.org/">
```
```js
const link = document.querySelector("a");

link.addEventListener("click", event => {
    event.preventDefault();
    console.log("I just prevented default Browser behaviour");
});
```

## Key events
Voorbeelden van key-events zijn:
* `keyup` (Wanneer een key van het toetsenbord losgelaten wordt)
* `keydown` (Wanneer een key van het toetsenbord ingedrukt wordt)

Je kan ook kijken naar welke knop is ingedrukt door weer te spelen met het `event` argument:

```html
<p>Press <code>control-space</code> to continue</p>
```
```js
window.addEventListener("keydown", event => {
    if (event.key === " " && event.ctrlKey) {
        console.log("Continuing!");
    }
});
```

Om erachter te komen of iets getypt is in een `<input>` of `<textarea>` element kan je beter een event handler op `"input"` gooien dan op `"keydown"` of `"keyup"`.

## Pointer events
Voorbeelden van pointer-events zijn:
* `mouseup` (Vergelijkbaar met `keyup`)
* `mousedown` (Vergelijkbaar met `keydown`)
* `click` (Wanneer de gebruiker in de context klikt)
* `mousemove` (Wanneer de muis beweegt in elke richting)

## Touch events
Er worden specifieke event types geactiveerd wanneer er 'touch' interactie plaatsvindt, voorbeelden hiervan zijn:
* `touchstart` (Vergelijkbaar met `mousedown`)
* `touchend` (Vergelijkbaar met `mouseup`)
* `touchmove` (Vergelijkbaar met `mousemove`)

De event objecten van een touch event hebben een `touches` property wat gerepresenteerd wordt als een array-achtig object met ieder z'n eigen `clientX`, `clientY`, `pageX` en `pageY` properties.

## Scroll events
Elke keer wanneer er een element gescrolled wordt wordt het `scroll` event geactiveerd. Je kan deze gebruiken voor verschillende zaken zoals erachter komen waar de gebruiker op 't moment naar kijkt of het bijhouden van de progress op de pagina (hoe ver heeft de gebruiker gescrollt). Voor dat laatste geval zou je dus een progress bar aan kunnen maken:

The HTML
```html
<div id="progressBar">
```
CSS
```css
div#progressBar {
    border-bottom: .5em solid blue;
    width: 0;
    position: fixed;
    top: 0;
    left: 0;
}
```
JS
```js
const progressBar = document.querySelector("#progressBar");

window.addEventListener("scroll", showProgressBar);

function showProgressBar() {
    let max = document.body.scrollHeight - innerHeight;
    progressBar.style.width = `${(pageYOffset / max) * 100}%`;
}
```
## Focus events
Wanneer een element zoals een input focus krijgt (a.k.a. de gebruiker wil erin typen) dan wordt het `focus` event geactiveerd, wanneer ze vervolgens uit de input stappen wordt het `blur` event geactiveerd. Met het `focus` event zou je bijvoorbeeld de gebruiker extra kunnen helpen bij het invullen van het zoekveld:

```html
<label>Jouw voornaam
    <input type="text" placeholder="Jouw voornaam">
</label>
<label>Jouw achternaam
    <input type="text" placeholder="Jouw achternaam">
</label>
<p id="helperText"></p>
```
```js
const help = document.querySelector("#helperText");
const fields = document.querySelectorAll("input");

// Add event listeners to all fields
for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener("focus", showHelperText);
    fields[i].addEventListener("blur", hideHelperText);
}

// showHelperText, params: e (event; String)
function showHelperText(e) {
    const text = e.target.getAttribute("placeholder");
    help.textContent = text;
}

// hideHelperText
function hideHelperText() {
    help.textContent = "";
}
```

## Load event
Het `load` event wordt geactiveerd wanneer de pagina klaar is met laden. Je kan dan functies uitvoeren die als voorwaarde hebben dat het document compleet geladen moet zijn. Wanneer een gebruiker weggaat van een pagina wordt het `beforeunload` event geactiveerd welke je bijv. kan gebruiken zodat de gebruiker zijn of haar onopgeslagen gegevens niet verliest:

```js
document.addEventListener("beforeunload", () => {
    alert("Are you sure you want to leave the page? All unsaved actions will be deleted.")
});
```

## Events and the event loop
Wanneer je écht iets wilt doen dat veel tijd inneemt zonder dat je de pagina en alle interactie wil bevriezen kan je gebruik maken van zogenaamde `Workers`. Een `Worker` is een script dat paralel aan de main thread loopt maar je main thread niet stil zet voor die lange tijd, om problemen met verschillende threads die dezelfde data aanpassen heeft een Worker zijn eigen global scope, communiceren gebeurt door 'messages' heen en weer te sturen:

```js
let squareWorker = new Worker("code/squareworker.js");

squareWorker.addEventListener("message", event => {
    console.log("Worker responded: ", event.data);
});

// Activeer een message event:
squareWorker.postMessage(10);
squareWorker.postMessage(24);
```

## Timers
Er zijn twee soorten timer events, elk met hun eigen (de)activatie:
* `setTimeout` / `clearTimeout` (Doe iets na x aantal miliseconden)
* `setInterval` / `clearInterval` (Doe iets **telkens** na x aantal miliseconden)

```js
// Do something every second:
let ticks = 0;

setInterval(clock, 1000);

function clock() {
    console.log("tick", ticks++);
    if (ticks === 10) {
        clearInterval(clock);
        console.log("stopped");
    }
}

// Do something after two seconds:
setTimeout(afterTwoSeconds, 2000);

function afterTwoSeconds() {
    console.log("I've waited two full seconds... :(");
}
```

## Debouncing
Sommige events zoals `scroll` of `mousemove` kunnen vet snel na elkaar geactiveerd worden (elke keer dat er gescrollt wordt of de muis beweegt). 

Als je iets aan de hand van die events doet wat veel tijd in beslag neemt kan de website heel traag aanvoelen. Om dit te voorkomen kan je op die handlers een `setTimeout` zetten.

Dit noem je '*debouncing the event*'.
