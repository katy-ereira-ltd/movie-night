import { createLocalVue, mount } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import MovieRating from '@/components/movie/MovieRating'

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('MovieRating component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(MovieRating, {
            localVue,
            propsData: {
                rating: 5,
                max: 10
            }
        });
    });

    it(`Is named 'MovieRating'`, async (done) => {
        expect(MovieRating.name).toBe('MovieRating');

        done();
    });

    it(`Has movie prop`, async (done) => {
        expect(typeof MovieRating.props).toBe('object');
        expect(wrapper.props().rating).toEqual(5);
        expect(wrapper.props().max).toEqual(10);

        done();
    });

    it(`Generates a value string`, async (done) => {
        expect(wrapper.vm.valueString).toBe('5/10');

        done();
    });

    it(`Generates a value string of 'unknown' if no rating`, async (done) => {
        wrapper = mount(MovieRating, { localVue, propsData: { rating: null, max: 10 }});

        expect(wrapper.vm.valueString).toBe('unknown');

        done();
    });

    it(`Uses a maximum of 10 if no max specified`, async (done) => {
        wrapper = mount(MovieRating, { localVue, propsData: { rating: 3, max: null }});

        expect(wrapper.vm.valueString).toBe('3/10');

        done();
    });

    it(`Calculates the number of stars displayed`, async (done) => {
        expect(wrapper.vm.stars.full).toBe(5);
        expect(wrapper.vm.stars.half).toBe(0);
        expect(wrapper.vm.stars.empty).toBe(5);

        done();
    });

    it(`Calculates the number of stars displayed including half stars`, async (done) => {
        wrapper = mount(MovieRating, { localVue, propsData: { rating: 3.5, max: 5 }});

        expect(wrapper.vm.stars.full).toBe(3);
        expect(wrapper.vm.stars.half).toBe(1);
        expect(wrapper.vm.stars.empty).toBe(1);

        done();
    });
});