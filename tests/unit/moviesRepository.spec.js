import moviesRepository from '@/moviesRepository'

describe('Movies repository', () => {
    const dummyMovieData = [
        {
            id: 123,
            title: "A movie title",
        },
        {
            id: 456,
            title: "Another movie title",
        }
    ];

    beforeAll(() => {

    });

    beforeEach(() => {
        localStorage.movies = JSON.stringify({
            movies: dummyMovieData,
            watched: [],
        });
        moviesRepository.mount();
    });

    it(`Has storage`, async (done) => {
        expect(typeof moviesRepository.storage).toBe('object');

        expect(moviesRepository.storage).toHaveProperty('movies');
        expect(moviesRepository.storage).toHaveProperty('watched');

        done();
    });

    it(`Has a mount method`, async (done) => {
        expect(typeof moviesRepository.mount).toBe('function');

        moviesRepository.mount();

        expect(moviesRepository.storage.movies).toEqual(dummyMovieData);
        expect(moviesRepository.storage.watched).toEqual([]);

        done();
    });

    it(`Has a find method`, async (done) => {
        const result = moviesRepository.find(123);

        expect(result).toEqual({id: 123, title: "A movie title"});

        done();
    });

    it(`Has a random method`, async (done) => {
        const result = moviesRepository.random();

        expect(moviesRepository.storage.movies).toContainEqual(result);

        done();
    });

    it(`Has an add method`, async (done) => {
        expect(moviesRepository.storage.watched).not.toContainEqual({id: 789, title: "An added movie"});
        expect(moviesRepository.storage.movies.length).toBe(2);

        moviesRepository.add({
            id: 789,
            title: "An added movie"
        });

        expect(moviesRepository.storage.movies).toContainEqual({id: 789, title: "An added movie"});
        expect(moviesRepository.storage.movies.length).toBe(3);

        done();
    });

    it(`Does not add an already-added movie`, async (done) => {
        expect(moviesRepository.storage.movies.length).toBe(2);

        moviesRepository.add(moviesRepository.find(123));

        expect(moviesRepository.storage.movies.length).toBe(2);

        done();
    });

    it(`Has a remove method`, async (done) => {
        expect(moviesRepository.storage.movies).toContainEqual({id: 123, title: "A movie title"});

        moviesRepository.remove(moviesRepository.find(123));

        expect(moviesRepository.storage.movies).not.toContainEqual({id: 123, title: "A movie title"});

        done();
    });

    it(`Has a watch method`, async (done) => {
        moviesRepository.watch(moviesRepository.find(123));

        expect(moviesRepository.storage.watched).toContainEqual({id: 123, title: "A movie title"});
        expect(moviesRepository.storage.movies).not.toContainEqual({id: 123, title: "A movie title"});

        expect(moviesRepository.storage.movies.length).toBe(1);
        expect(moviesRepository.storage.watched.length).toBe(1);

        done();
    });

    it(`Has an unwatch method`, async (done) => {
        const movie = moviesRepository.find(123);

        moviesRepository.watch(movie);

        expect(moviesRepository.storage.watched).toContainEqual({id: 123, title: "A movie title"});

        moviesRepository.unwatch(movie);

        expect(moviesRepository.storage.watched).not.toContainEqual({id: 123, title: "A movie title"});

        done();
    });

    it(`Has as persist method`, async (done) => {
        const movie = moviesRepository.find(123);

        moviesRepository.watch(movie);

        expect(JSON.parse(localStorage.movies).movies).not.toContainEqual({id: 123, title: "A movie title"});
        expect(JSON.parse(localStorage.movies).watched).toContainEqual({id: 123, title: "A movie title"});

        done();
    });
});