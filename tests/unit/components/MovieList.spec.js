import { createLocalVue, mount } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import moviesRepository from '@/moviesRepository'
import MovieList from '@/components/MovieList'

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.mock('@/moviesRepository', () => ({
    remove: jest.fn(),
    watch: jest.fn(),
    storage: {
        movies: []
    },
}));

describe('MovieList component', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(MovieList, { localVue });
    });

    afterEach(() => {
        moviesRepository.remove.mockClear();
        moviesRepository.watch.mockClear();
    });

    it(`Is named 'MovieList'`, async (done) => {
        expect(MovieList.name).toBe('MovieList');

        done();
    });

    it(`Has data`, async (done) => {
        expect(typeof MovieList.data).toBe('function');
        expect(MovieList.data().movies).toEqual([]);

        done();
    });

    it(`Has a 'remove' method`, async (done) => {
        expect(typeof MovieList.methods.remove).toBe('function');

        done();
    });

    it(`Has a 'watch' method`, async (done) => {
        expect(typeof MovieList.methods.watch).toBe('function');

        done();
    });

    it('Removes a movie from the movie list', async (done) => {
        wrapper.vm.remove('item');

        expect(moviesRepository.remove).toHaveBeenCalledTimes(1);
        expect(moviesRepository.remove.mock.calls[0][0]).toBe('item');

        done();
    });

    it('Adds a movie to the watched list', async (done) => {
        wrapper.vm.watch('item');

        expect(moviesRepository.watch).toHaveBeenCalledTimes(1);
        expect(moviesRepository.watch.mock.calls[0][0]).toBe('item');

        done();
    });
});