import { createLocalVue, mount } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import moviesRepository from '@/moviesRepository'
import MoviePicker from '@/components/MoviePicker'

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.mock('@/moviesRepository', () => ({
    watch: jest.fn(),
    random: jest.fn(),
}));

describe('MoviePicker component', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(MoviePicker, { localVue });
    });

    afterEach(() => {
        moviesRepository.random.mockClear();
        moviesRepository.watch.mockClear();
    });

    it(`Is named 'MoviePicker'`, async (done) => {
        expect(MoviePicker.name).toBe('MoviePicker');

        done();
    });

    it(`Has data`, async (done) => {
        expect(typeof MoviePicker.data).toBe('function');
        expect(MoviePicker.data().movie).toEqual(null);
        expect(MoviePicker.data().thinking).toEqual(false);

        done();
    });

    it(`Has a 'think' method`, async (done) => {
        expect(typeof MoviePicker.methods.think).toBe('function');

        done();
    });

    it(`Has a 'pick' method`, async (done) => {
        expect(typeof MoviePicker.methods.pick).toBe('function');

        done();
    });

    it(`Has a 'watch' method`, async (done) => {
        expect(typeof MoviePicker.methods.watch).toBe('function');

        done();
    });

    it('Adds picked movie to the watched list', async (done) => {
        wrapper.vm.movie = 'picked';
        wrapper.vm.watch();

        expect(moviesRepository.watch).toHaveBeenCalledTimes(1);
        expect(moviesRepository.watch.mock.calls[0][0]).toBe('picked');
        expect(wrapper.vm.movie).toBeNull();

        done();
    });

    it('Thinks before picking', async (done) => {
        expect(wrapper.vm.thinking).toBe(false);

        wrapper.vm.think(10).then(() => {
            expect(wrapper.vm.thinking).toBe(false);
            done();
        });

        await setTimeout(() => {
            expect(wrapper.vm.thinking).toBe(true);
        }, 2);
    });

    it('Picks a random movie', async (done) => {
        moviesRepository.random.mockReturnValue('random_pick');

        wrapper.vm.think = jest.fn();
        wrapper.vm.think.mockReturnValue(new Promise(resolve => resolve()));

        wrapper.vm.pick();

        await setTimeout(() => {
            expect(moviesRepository.random).toHaveBeenCalledTimes(1);
            expect(wrapper.vm.movie).toBe('random_pick');

            done();
        }, 2);
    });
});