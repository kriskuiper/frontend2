# The Document Object Model

## The standard
In HTML heb je verschillende soorten `nodes`. Namelijk een textnode en een element node:

```html
<body>
    <!-- Element node -->
    <h1>The title</h1>
    
    <!-- Text node -->
    X times two
</body>
```
## Moving through the tree
Om door de DOM heen te navigeren met JavaScript kan je onder andere de volgende properties gebruiken:
* `childNodes` geeft een nodeArray terug van alle child-elementen van het geselecteerde element (bijv. `body.childNodes`).
* `firstChild` geeft je het eerste child-element van het geselecteerde element.
* `lastChild` geeft je het laatste child-element van het geselecteerde element.
* `nextSibling` geeft je het volgende element in dezelfde DOM hiërarchie.
* `previousSibling` geeft je het *vorige* element in dezelfde DOM hiërarchie.
* `parentNode` geeft je het parent element van het geselecteerde element.

## Finding elements
Om elementen binnen de pagina te vinden heb je ook een aantal properties op het `document` object, namelijk:
* `document.getElementsByTagName('a')` geeft je in dit geval een array van alle `<a>` elementen in het HTML bestand terug.
* `document.getElementById('big-text')` geeft je alle elementen met de `id` big-text terug.
* `document.getElementsByClassName('some')` geeft je een array terug van alle elementen met de class some.

## Changing the document
Zowat alles binnen de structuur van de DOM kan je veranderen met JavaScript:
* `el.appendChild` laat je een child-element toevoegen aan een bepaald element.
* `document.body.insertBefore(element1, element2)` laat je het element dat als eerste argument is ingevoerd voor het element plaatsen dat als tweede argument is ingevoerd. Een side-effect hiervan is, is dat het element eigenlijk van z'n originele plek verwijderd wordt en voor het andere element geplaatst wordt.
* `document.body.replaceChild(newElement, oldElement)` laat je het ene element met het andere element vervangen.

## Creating nodes
* `document.createElement('footer')` maakt een nieuw, leeg element van hetgeen dat als argument is meegegeven, in dit geval een `<footer>` element.

## Attributes
* `element.setAttribute` laat je een 'zelfverzonnen' attributen aan een node toevoegen:
```js
const paras = document.getElementsByTagName('p');
for (let para of Array.from(paras)) {
    para.setAttribute('data-classified');
}
```
Geeft je zo'n soort HTML terug:
```html
<p data-classified="sometext">
```

* `element.getAttribute` laat je de attributes van elementen checken of krijgen:
```js
const paras = document.getElementsByTagName('p');
for (let para of Array.from(paras)) {
    if (para.getAttribute('data-classified') == 'sometext') {
        para.remove();
    }
}
```
Het wordt aangeraden om zelf gemaakte attributes te 'prefixen' met `data-`.

## Layout
* `element.offsetHeight` geeft je de hoogte dat een bepaald element inneemt in pixels.
* `element.offsetWidth` geeft je de breedte dat een bepaald element inneemt in pixels.
* `element.clientHeight` geeft je de hoogte die de binnenkant van het element inneemt in pixels (min de border).
* `element.clientWidth` geeft je de breedte die de binnenkant van het element inneemt in pixels (min de breedte van de border).
* `pageXOffset` geeft je de huidige, relatieve horizontale scroll positie.
* `pageYOffset` geeft je de huidige, relatieve verticale scroll positie.

De meest effectieve manier om de precieze locatie van een element te verkrijgen is door `element.getBoundingClientRect` te gebruiken. Dit geeft je een object terug met properties voor `top, bottom, left, right`.

## Styling
Hoewel het aardig depreciated is om styling aan te passen via JavaScript is het wel mogelijk om de vormgeving van een bestand aan te passen in JavaScript:

```js
const el = document.getElementById('the-text');
let color = 'red';
let fontFamily = 'Arial';

el.style.color = color; // color is red
el.style.fontFamily = fontFamily; // font-family is Arial.
```

## Query selectors
De `document.querySelector` en `document.querySelectorAll` methods maken het makkelijker om elementen uit een HTML bestand te selecteren:

```js
document.querySelector('.btn');
// > geeft je het eerste element met de class btn terug.

document.querySelectorAll('.btn');
// > geeft je alle elementen met de class btn terug.

document.querySelectorAll('a img');
// > geeft je alle img elementen terug die in een a element zitten.

document.querySelector('#hello-text');
// > geeft je het element terug met de id hello-text.
```
In tegenstelling tot methods als `document.getElementsByTagName` is `document.querySelectorAll` **niet** *live*. Dit houdt in dat `document.querySelectorAll` niet veranderd wanneer je het document veranderd (bijv. elementen weg haalt etc.).