/**
 * @author: solsun
 * The purpose of this service is to host all the function related with the atomic form validations
 */

import { removeSpacesAndTags } from '../form-validation/regexp-validators';


export class Utils {

    static cleanTagsAndSpaces(text: string): string {
        const sanetizeText = new DOMParser().parseFromString(text, 'text/html').documentElement.textContent;
        return sanetizeText.replace(removeSpacesAndTags, '');
    }

}
