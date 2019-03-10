import { createLocalVue, mount } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import moviesRepository from '@/moviesRepository'
import WatchedList from '@/components/WatchedList'

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.mock('@/moviesRepository', () => ({
    unwatch: jest.fn(),
    add: jest.fn(),
    storage: {
        watched: []
    },
}));

describe('WatchedList component', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(WatchedList, { localVue });
    });

    afterEach(() => {
        moviesRepository.add.mockClear();
        moviesRepository.unwatch.mockClear();
    });

    it(`Is named 'WatchedList'`, async (done) => {
        expect(WatchedList.name).toBe('WatchedList');

        done();
    });

    it(`Has data`, async (done) => {
        expect(typeof WatchedList.data).toBe('function');
        expect(WatchedList.data().movies).toEqual([]);

        done();
    });

    it(`Has a 'remove' method`, async (done) => {
        expect(typeof WatchedList.methods.remove).toBe('function');

        done();
    });

    it(`Has a 'rewatch' method`, async (done) => {
        expect(typeof WatchedList.methods.rewatch).toBe('function');

        done();
    });

    it('Removes a movie from the watched list', async (done) => {
        wrapper.vm.remove('item');

        expect(moviesRepository.unwatch).toHaveBeenCalledTimes(1);
        expect(moviesRepository.unwatch.mock.calls[0][0]).toBe('item');

        done();
    });

    it('Adds a watched movie to the movie list', async (done) => {
        wrapper.vm.rewatch('item');

        expect(moviesRepository.add).toHaveBeenCalledTimes(1);
        expect(moviesRepository.add.mock.calls[0][0]).toBe('item');

        done();
    });
});