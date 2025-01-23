import bcrypt from 'bcryptjs'

export const hash = (pass: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
}

export const compare = (pass:string , hashPass: string) => {
    return bcrypt.compareSync(pass, hashPass)
}