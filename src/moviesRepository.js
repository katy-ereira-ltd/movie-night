

const moviesRepository = {
    storage: {
        movies: [
            {
                id: 1,
                title: `Land Before Time`,
            },
            {
                id: 2,
                title: `The Guardian Brothers`,
            },
            {
                id: 3,
                title: `Teenage Mutant Ninja Turtles`,
            },
            {
                id: 4,
                title: `Daddy Day Care`,
            },
            {
                id: 5,
                title: `Benji`,
            },
            {
                id: 6,
                title: `Ace Ventura`,
            },
            {
                id: 7,
                title: `Big Daddy`,
            },
        ],
        watched: [

        ],
    },
    mount() {
        if (localStorage.movies) {
            this.storage = JSON.parse(localStorage.movies);
        }
    },
    find (id) {
        let found;

        this.storage.movies.forEach((item) => {
            if (item.id === id) {
                found = item;
            }
        });

        return found;
    },
    random () {
        const key = Math.floor(Math.random() * this.storage.movies.length);

        return this.storage.movies[key];
    },
    add (movie) {
        if (!this.find(movie.id)) {
            this.storage.movies.push(movie);
        }

        this.persist();
    },
    remove (movie) {
        this.removeMovieFrom(movie, this.storage.movies);

        this.persist();
    },
    watch (movie) {
        this.storage.watched.push(movie);
        this.remove(movie);

        this.persist();
    },
    unwatch (movie) {
        this.removeMovieFrom(movie, this.storage.watched);

        this.persist();
    },
    persist () {
        localStorage.movies = JSON.stringify(this.storage);
    },
    removeMovieFrom (itemToRemove, array) {
        array.forEach((item, key) => {
            if (item.id === itemToRemove.id) {
                array.splice(key, 1);
            }
        });
    },
};

moviesRepository.mount();

export default moviesRepository;