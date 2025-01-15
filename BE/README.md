# Pokedex

Aplikacja służąca do zarządzania Pokemonami.

## Podstawowe informacje

Folder z serwerem aplikacji. Zapisane są tutaj dane logowania użytkowników oraz wszystkie zmiany danych pokemonów w trakcie korzystania z aplikacjii.

## Uruchamianie

Aby uruchomić serwer należy w terminalu ze ścieżką folderu wpisać:

```
json-server --watch db.json
```

## Opis Endpointów

_Wszystkie dane zapisane są pod ścieżką http://localhost:3000_

| Ścieżka           | Metody           | Opis                                                            |
| ----------------- | ---------------- | --------------------------------------------------------------- |
| `/users`          | GET,POST         | Zarządzanie użytkownikami w bazie. Pobieranie i dodawanie.      |
| `/favourites`     | GET, POST        | Pobieranie ulubionych i dodawanie do listy ulubionych.          |
| `/favourites/ID`  | DELETE           | Usuwanie z listy ulubionych pojedyńczego pokemona za pomocą ID. |
| `/battlefield`    | GET,POST         | Pobieranie i dodawanie pokemonówna arene.                       |
| `/battlefield/ID` | DELETE           | Usuwanie pokemona o podanym ID z areny.                         |
| `/ranking`        | GET, POST, PATCH | Pobieranie, wysyłanie, aktualizacja statystyk z walk na arenie. |
| `/pokemon-list`   | GET, POST, PATCH | Pobieranie, wysyłanie, aktualizacja danych pokemonów.           |

### Formaty danych

Wszystkie dane zapisane są jako **string**

- `/users`: {id:"", username:"", password:"", email:""}
- `/favourites`: {id:"", name:""}
- `/battlefield`: {id:"", name:""}
- `/ranking`: {id:"", name:"", stats: {win:"", lose:""}}
- `/pokemon-list`: {id:"", name:"", height:"", base_experience:"", weight:"", ability:"", sprite:""}
