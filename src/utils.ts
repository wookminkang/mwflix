

export function makeImagePath(id:string, format? : string) {
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}


export enum types {
    "now" = "now",
    "popular" = "popular",
    "top" = "top",
    "upcoming" = "upcoming"
}