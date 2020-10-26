<p align="center"><img width=675 src="banner.svg" /></p>

## Introduction

Netflix & Chill is the final project for the course Knowledge & Data. It utilises a graph database (with linked data) to present a friendly website which helps you find your perfect match for the night (perfect film that is...).

### Filter & Chill

Netflix & Chill supports a lot of different filters so you can narrow down the results exactly how you like. *All filters work together as one big AND statement.*

#### Persons

- **Actor**. Find films featuring one or multiple actors.\
  *Features Autocomplete as well as a gender-filter.*
- **Director**. Find films directed by one or multiple directors.\
  *Features Autocomplete.*

#### Types

- **Awarded**. Find films which have been awarded one or multiple awards from the largest film festivals: the Academy Awards, the Golden Globes and the Cannes Film Festival.
- **Female Inclusive**. Find films which pass the Bechdel test.
- **Genre**. Find films which are of one or multiple genres.

#### Values

- **Rating**. Find films which have been rated a certain value, or rated between a range of values.
- **Release Year**. Find films which were released in a certain year, or between two user-specified years.
- **Runtime**. Find films of a certain runtime in minutes. Can be a specific value or a range of values.

### Areas of interest

All the code in this repository has been written by hand, without any CSS libraries or external React Components. Now, this is quite a bit to go through, so here are the interesting bits:

- [The master query generation](https://github.com/m-rots/kandd/blob/main/lib/queries/main.ts). In this file, multiple filters are combined based on their current state to craft the magic query returning all the films.\
  *The blacklist was born out of necessity. Too... much... Bollywood.*
- [Actor auto-complete](https://github.com/m-rots/kandd/blob/main/lib/queries/actors.ts) and [Director auto-complete](https://github.com/m-rots/kandd/blob/main/lib/queries/directors.ts).\
  *Also includes the HTTP requests, search and result state and an actor-only gender state!*
- [State management](https://github.com/m-rots/kandd/blob/main/lib/state.ts). React Context would have been a nightmare to use, so instead I opted for the *brand-new, very-alpha* [Recoil](https://recoiljs.org) library which is such a joy to use. All of the state as well as the default values are managed in this file.
- [Types & Enums](https://github.com/m-rots/kandd/tree/main/interfaces). All the different types and enums across the codebase are managed in these three files.
- [Master Query API requests](https://github.com/m-rots/kandd/blob/main/pages/index.tsx). Netflix & Chill has a couple of tricks up its sleeve to make the SPARQL even faster! Each request is stamped with a `X-GraphDB-Track-Alias` so previous in-progress requests are aborted. This significantly sped up the UI as GraphDB only handles two parallel requests on the free version.
- [The Summary Component](https://github.com/m-rots/kandd/blob/main/components/summary.tsx). The text representing the different filters is created in the summary. The summary includes all the buttons at the bottom bar, as well as all the different filters.
- [The Modal Component](https://github.com/m-rots/kandd/blob/main/components/modals/index.tsx). The nice little pop-up you see when adding or editing a filter is managed by the modal. This component tracks which filters should be edited and directly reads and writes the corresponding state changes.

## Configure GraphDB

Netflix & Chill connects to [GraphDB](https://graphdb.ontotext.com) on [http://localhost:7200](http://localhost:7200) and queries the `imdb` repository. Please run the following steps to configure GraphDB correctly:

1. Create a new repository with `imdb` as its repository ID and `OWL-Max (Optimized)` as its Ruleset.
2. Import the `media.ttl` dataset (available in the assignment's zip file).

## Start the server

1. Make sure GraphDB is running and everything is configured.
2. Make sure you have [NodeJS](https://nodejs.org/en/) installed.
3. Clone this repository.
4. Open the terminal and run `npm install` to install all dependencies.
5. Run `npm run build` to compile the code.
6. Run `npm run start` to start the server.

Netflix & Chill is now available at [http://localhost:3000](http://localhost:3000).

## More Netflix & Chill

The entire Netflix & Chill dataset has been hand-crafted by parsing datasets, filtering results, manually creating links between data and inserting data from other SPARQL endpoints. *Oh! And crashing Protégé a lot of times.* The entire process is described in the Netflix & Chill report (not available for the general public).

The tools used for the dataset creation have been hand-crafted as well:

- [Parsing the IMDb dataset in Rust](https://github.com/m-rots/kandd-imdb).
- [Fetching extra data from TMDb](https://github.com/m-rots/kandd-tmdb).