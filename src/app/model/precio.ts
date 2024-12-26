export interface Precio {
    results: Result[];
}

export interface Result {
    DESCRIPCION:  string;
    ID_LIPRE1:    string;
    PRECIO_MIN_1: number;
    ID_ITEM:      string;
}
