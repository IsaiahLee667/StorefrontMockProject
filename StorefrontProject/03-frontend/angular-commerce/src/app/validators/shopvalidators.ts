import { FormControl, ValidationErrors } from "@angular/forms";

export class Shopvalidators {
    //todo: add whitespace validator

    static notOnlyWhiteSpace(control: FormControl): ValidationErrors{

        //check if only white spac
        if ((control.value != null) && (control.value.trim().length === 0)){
            return {'notOnlyWhiteSpace': true}
        }


        return null;
    }
}
