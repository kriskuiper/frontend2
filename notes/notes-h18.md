# HTTP and forms
## The protocol
### Een request
Een request ziet er normaliter als volgt uit:
```
GET /18_http.html HTTP/1.1 < De request
Host: eloquentjavascript.net < Headers
User-Agent: Brave Browser < Headers
```

Een response op het bovenstaande request kan er als volgt uit zien:
```
HTTP/1.1 200 OK < Statuscode
Content-Length: 65575 < Headers
Content-Type: text/html < Mime type (Headers)
Last-Modified: Mon, 10 jan 2019 10:34:57 GMT < Headers

<!doctype html> < Body van de response
... rest van het document < Body van de response
```

### Request methods
Een request naar een server kan verschillende methods hebben, namelijk:
* GET (Verkrijg de opgevraagde resource)
* POST (Verstuur info naar de resource)
* PUT (Creëer een nieuwe instantie van een resource of vervang de resource met iets nieuws)
* DELETE (Verwijder een resource)

### Headers
De eerste lijn van een request of response kan vervolgd worden met een aantal *headers* die meer informatie geven over de request of response.

### Status codes
Er zijn vele verschillende statuscodes. Over het algemeen kan je het volgende als leidraad aannemen:
* Statuscodes die beginnen met een **2** (bijv. 200) geven aan dat de request succesvol is.
* Statuscodes die beginnen met een **4** (bijv. 404) geven aan dat er iets mis is met de request.
* Statuscodes die beginnen met een **5** (bijv. 504) geven aan dat er iets mis is op de server en niet met het request.
## Browsers and HTTP
Doormiddel van een formulier in HTML kan er een request worden gedaan naar een bepaalde server:
```html
<form method="GET" action="example/message.html">
    <label>First name
        <input type="text" name="first-name">
    </label>
    <label>Last name
        <input type="text" name="last-name">
    </label>
    <label>Your message
        <textarea name="message"></textarea>
    </label>
</form>
```

De request naar de server ziet er als volgt uit:
```
GET /example/message.html?name=Kris&lastname=Kuiper&message=Yes%3F HTTP/1.1
    |        path        |             query string              |  
```

Het deel na het vraagteken `?` is de *query string*. Key/value pairs worden uit elkaar gehouden doormiddel van een en-teken `&`. Een vraagteken als leesteken wordt ge-encode (URL encoding), in dit geval staat `%3F` voor een `?` in de zin van de message.
## Fetch
De fetch method gebruik je sinds kort om HTTP requests te doen:
```js
fetch("url/to/fetch.html").then(response => {
    console.log(response.status);
    // > 200
    console.log(response.headers.get("Content-Type"));
    // > text/html
});
```

Wanneer je fetch gebruikt krijg je een promise terug die resolved met een *Response* object dat informatie bevat over de service z'n response zoals de status code en de headers. Een fetcht resolved zelfs als de server antwoord met een error code (bijv. 405).

## HTTP sandboxing


## Appreciating HTTP


## Security and HTTPS


## Form fields


## Focus


## Disabled fields


## The form as a whole


## Text fields


## Checkboxes and radio buttons


## Select fields


## File fields


## Storing data client-side