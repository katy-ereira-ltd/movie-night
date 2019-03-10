import { createLocalVue, mount } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import Settings from '@/components/Settings.vue'
import SettingsRepository from '@/settingsRepository';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.mock('@/settingsRepository', () => ({
    get: jest.fn(),
    set: jest.fn(),
}));

SettingsRepository.get.mockReturnValue('test_api_key');

describe('Settings component', () => {
    let wrapper;
    let saveButton;

    beforeAll(() => {
        wrapper = mount(Settings, { localVue });
        saveButton = wrapper.findAll('button').at(0);
    });

    afterEach(() => {
        SettingsRepository.set.mockClear();
        SettingsRepository.get.mockClear();
    });

    it(`Is named 'Settings'`, async (done) => {
        expect(Settings.name).toBe('Settings');

        done();
    });

    it(`Has data`, async (done) => {
        expect(typeof Settings.data).toBe('function');

        const defaultData = Settings.data();

        expect(typeof defaultData.saving).toBe('boolean');
        expect(typeof defaultData.apiKey).toBe('string');
        expect(defaultData.apiKey).toBe('test_api_key');

        expect(SettingsRepository.get).toHaveBeenCalledTimes(1);
        expect(SettingsRepository.get.mock.calls[0][0]).toBe('apiKey');

        done();
    });

    it(`Has a 'save' method`, async (done) => {
        expect(typeof Settings.methods.save).toBe('function');

        done();
    });

    it(`Has a 'think' method`, async (done) => {
        expect(typeof Settings.methods.think).toBe('function');

        Settings.methods.think(1).then(function () {
            done();
        });
    });

    it('Has a save button', async (done) => {
        expect(saveButton.text()).toBe('Save');
        expect(saveButton.attributes('disabled')).toBeUndefined();
        expect(saveButton.isVisible()).toBe(true);

        done();
    });

    it('Disables save button whilst form is submitting', async (done) => {
        wrapper.vm.think = jest.fn();
        wrapper.vm.think.mockReturnValue(new Promise(resolve => resolve()));

        wrapper.vm.save();

        expect(wrapper.vm.saving).toBe(true);

        expect(saveButton.text()).toBe('Saving...');
        expect(saveButton.isVisible()).toBe(true);
        expect(saveButton.attributes('disabled')).toBeDefined();

        await setTimeout(() => {
            expect(wrapper.vm.saving).toBe(false);

            expect(saveButton.text()).toBe('Save');
            expect(saveButton.isVisible()).toBe(true);
            expect(saveButton.attributes('disabled')).not.toBeDefined();

            done();
        }, 2);
    });

    it('Saves the API key setting', async (done) => {
        wrapper.vm.think = jest.fn();
        wrapper.vm.think.mockReturnValue(new Promise(resolve => resolve()));

        wrapper.vm.apiKey = 'new_key';
        wrapper.vm.save();

        await setTimeout(() => {
            expect(SettingsRepository.set).toHaveBeenCalledTimes(1);
            expect(SettingsRepository.set.mock.calls[0][0]).toBe('apiKey');
            expect(SettingsRepository.set.mock.calls[0][1]).toBe('new_key');

            done();
        }, 2);
    });
});