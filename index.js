const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
let Teadata = []
let nextId= 1;



// add a new tea
app.post('/teas',(req,res)=>{
   const {name, price} =req.body
   const newTea = {id:nextId++,name,price};
   Teadata.push(newTea);
   res.status(201).send(newTea);
   
})
// get all teas
app.get("/teas",(req,res)=>{
    res.status(200).send(Teadata)
})
// get tea with id
app.get("/teas/:id",(req,res)=>{
    const tea=Teadata.find(t=>t.id=== parseInt(req.params.id))
    if(!tea){
        res.status(404).send("Tea not found")
    }
    else{
        res.status(200).send(tea)
    }
})
// update tea
app.put("/teas/:id",(req,res)=>{
   
    const tea=Teadata.find(t=>t.id=== parseInt(req.params.id))

    if(!tea){
        res.status(404).send("Tea not found")
    }
    const {name,price}=req.body;
    tea.name=name
    tea.price=name
    res.status(200).send(tea)

})
// delete tea
app.delete("/teas/:id",(req,res)=>{
const index = Teadata.findIndex(t=>t.id===parseInt(req.params.id))
if(index===-1){
    return res.status(404).send("tea not found")
}
Teadata.splice(index,1)
res.status(200).send("deleted")

})
// app.get('/', (req, res) => res.send('Hello World!'))
// app.get('/awesocme', (req, res) => res.send('what an awesome day!'))
// app.get('/places', (req, res) => res.send('what a place'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))