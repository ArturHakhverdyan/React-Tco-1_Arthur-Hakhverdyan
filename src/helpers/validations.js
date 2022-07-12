export const IsRequired = (value) => {
    return value.length ? undefined : "The field must be is required "
}

const MinLength = (length) => (value) => {
    return value.length >= length ? undefined : ` Min length must be ${length}`
}
export const MinLength3 = MinLength(3);
export const MinLength6 = MinLength(6);


const MaxLength = (length) => (value) => {
    return value.length <= length ? undefined : ` Max length must be ${length}`
}

export const MaxLength20 = MaxLength(20)
export const MaxLength30 = MaxLength(30)

//  const  _ValidateEmail = (mail) => (value) =>  {
//    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) 
// }
// export const ValidateEmail = _ValidateEmail()


