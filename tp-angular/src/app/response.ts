export interface Product{
    _id: String | undefined,
    name: String | undefined,
    price: String | undefined,
    category: String | undefined,
    image: String | undefined,
    description: String | undefined,
    quantity: Number
}

export interface Ticket{
    _id: String | undefined,
    products: String[] | undefined,
    total: String | undefined
}