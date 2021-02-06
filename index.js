let Productos = []
let ban = true

class Producto{

    constructor(title,price,thumbnail){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}


const express = require("express")

const app = express()

app.use(express.json())


app.listen(8080,() => {   
    console.log(`SERVIDOR http://localhost:8080`)
})

//CATCH DE SERVIDOR
process.on('uncaughtException', function(err) {   
    if(err.code === 'EADDRINUSE')
         console.log('Servidor ya iniciado');
         
    else
         console.log(err);

}); 






//CREAR PRODUCTO

app.post('/api/productos/guardar',(req,res) => {
        

        let inc = Productos.length

        let producto =req.body

        producto.id = inc+1

        Productos.push(producto)
        res.sendStatus(201)

})


//LISTAR EN FORMA TOTAL

app.get('/api/productos/listar',function (req,res) {
    
    if(!Productos  || Productos.length===0){
        res.send({error: 'No hay prodcutos cargados'})
    }
    res.send(Productos)
})

//LISTAR EN FORMA INDIVIDUAL

app.get('/api/productos/listar/:id', (req,res) => {
    const id = req.params.id
    const product =Productos.find( prod => prod.id == id)
    if(!product){
        res.send({error: 'Producto no encontrado'})
    }
    res.send(product)
})
