const express = require('express');
const cors = require('cors');
const app = express();

app.listen(4300, ()=>{
    console.log('listen on port 4300')
});

app.use(cors());

app.use(express.json());


app.get("/products", (req, res) =>{
    res.json([
        {
            id: 1,
            name: 'Intel i9 10th Gen',
            price: '75.000',
            category: 'Procesadores',
            image: 'https://www.fullh4rd.com.ar/img/productos/Pics_Prod/micro-intel-core-i9-10900-0.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nostrum culpa mollitia provident.'
        },
        {
            id: 2,
            name: 'Gygabyte h410',
            price: '29.000',
            category: 'Motherboards',
            image: 'https://http2.mlstatic.com/D_NQ_NP_815752-MLA47645127258_092021-W.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nostrum culpa mollitia provident.'
        },
        {
            id: 3,
            name: 'Teclado mecánico Red Dragon',
            price: '6.000',
            category: 'Teclados',
            image: 'https://s3-sa-east-1.amazonaws.com/saasargentina/U7DRqRfkhk5o0J3ERB86/imagen',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nostrum culpa mollitia provident.'
        },
        {
            id: 4,
            name: 'Nvidia Geforce Gtx 1660',
            price: '105.000',
            category: 'Placa de video',
            image: 'https://http2.mlstatic.com/D_NQ_NP_605264-MLA43393347620_092020-O.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nostrum culpa mollitia provident.'
        },
        {
            id: 5,
            name: 'Aorus gtx 1060',
            price: '126.000',
            category: 'Placa de video',
            image: 'https://compuneuquen.com.ar/imagenes/articulos/4813/imagen1.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nostrum culpa mollitia provident.'
        },
        {
            id: 6,
            name: 'Amd Ryzen 5',
            price: '43.500',
            category: 'Procesadores',
            image: 'https://www.techinn.com/f/13743/137434497/amd-procesador-ryzen-5-3600-4.2ghz.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nostrum culpa mollitia provident.'
        }
    ]);
});
