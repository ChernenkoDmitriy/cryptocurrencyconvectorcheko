import i18n from 'i18n-js';
import { translations } from './Translation';
import { ILocalization } from './ILocalization';
import { IRepository } from '../../store/IRepository';
import { MobXRepository } from '../../store/MobXRepository';
import { IStorage, storage } from '../../../libraries/storage';

class Localization implements ILocalization {
    constructor(private localizationStore: IRepository<string>, private storage: IStorage) {
        i18n.fallbacks = true;
        i18n.translations = translations;
        this.load();
    }

    private persistLanguage = (data: string | null) => {
        if (data) {
            this.storage.set('LANGUAGE', data);
        } else {
            this.storage.remove('LANGUAGE');
        }
    }

    private load = () => {
        this.storage.get('LANGUAGE')
            .then(data => { data && this.localizationStore.save(data); })
            .catch(error => console.warn('Localization -> load: ', error));
    }

    get locales() {
        return Object.keys(i18n.translations);
    }

    get locale() {
        return this.localizationStore.data || 'en';
    }

    setTranslation = (translations: any) => {
        if (typeof translations === 'object' && translations) {
            i18n.translations = translations;
        }
    }

    t = (key: string) => {
        const locale = this.localizationStore.data;
        return i18n.t(key, { locale: locale });
    }

    setLocale = (locale: string) => {
        this.localizationStore.save(locale);
        this.persistLanguage(locale);
    }

}

const localizationStore = new MobXRepository<string>();
export const localization = new Localization(localizationStore, storage);
