import { createLocalVue, mount } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import MovieData from '@/components/movie/MovieData'

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('MovieData component', () => {
    let wrapper;
    let movie;

    beforeAll(() => {
        movie = {};

        wrapper = mount(MovieData, { localVue, propsData: { movie }});
    });

    it(`Is named 'MovieData'`, async (done) => {
        expect(MovieData.name).toBe('MovieData');

        done();
    });

    it(`Has movie prop`, async (done) => {
        expect(typeof MovieData.props).toBe('object');
        expect(wrapper.props().movie).toEqual(movie);

        done();
    });
});