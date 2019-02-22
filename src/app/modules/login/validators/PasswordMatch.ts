import {FormControl} from '@angular/forms';

export class PasswordMatch {

    public static matches(c: FormControl) {
        const p1 = c.get('registerPassword').value;
        const p2 = c.get('registerPasswordRepeat').value;
        if (p1 !== p2) {
            c.get('registerPasswordRepeat').setErrors({matchPassword: true});
        } else {
            return null;
        }
    }
}