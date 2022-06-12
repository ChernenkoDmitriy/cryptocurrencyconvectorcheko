import { MobXRepository } from "../../store/MobXRepository";
import { allColors } from './AllColors';
import { IColors, IColorsController } from "./IColorsController";
import { IStorage, storage } from "../../../libraries/storage";
import { IRepository } from "../../store/IRepository";

class ColorsController implements IColorsController {
    constructor(
        private themeStore: IRepository<'dark' | 'light'>,
        private colorsStore: IRepository<IColors>,
        private storage: IStorage) {
        this.load();
    }

    private persistTheme = (data: string | null) => {
        if (data) {
            this.storage.set('COLOR_THEME', data);
        } else {
            this.storage.remove('COLOR_THEME');
        }
    }

    private load = () => {
        this.storage.get('COLOR_THEME')
            .then(data => {
                data && this.colorsStore.save(data);
                data && this.saveTheme(data);
            })
            .catch(error => console.warn('ColorsController -> load: ', error));
    }


    get theme() {
        return this.themeStore.data || 'light';
    }

    get colors() {
        return this.colorsStore.data || allColors.light;
    }

    saveTheme = (data: 'dark' | 'light') => {
        if (this.colorsStore.data && Object.keys(allColors).includes(data)) {
            this.themeStore.save(data);
            this.colorsStore.save(allColors[data]);
            this.persistTheme(data);
        }
    }

}

const colorsStore = new MobXRepository<IColors>(allColors.light);
const themeStore = new MobXRepository<'dark' | 'light'>();
export const colorTheme = new ColorsController(themeStore, colorsStore, storage);
