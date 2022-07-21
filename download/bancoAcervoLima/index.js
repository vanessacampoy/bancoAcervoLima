const express = require('express')
const mongoose = require('mongoose')
const port = 3000
const app = express()

// app.get('/', (req, res) => {
//   res.send ("Hello world!")
// })

mongoose.connect("mongodb://localhost/formularioConsultoria", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

app.use(express.json()) 

app.use(express.static('publico'))
app.use(express.urlencoded({ extended: true})) //analisa as req recebidas

app.get('/', (req, res) => {
  res.set({
  'Allow-access-Allow-Origin': '*'
}) //permissão de acesso a página de origem

return res.redirect('index.html')
})


app.post('/formFillUp', (req, res) => {
 let nome = req.body.nome
 let telefone = req.body.telefone
 let consultora = req.body.consultora
 let tratamento = req.body.tratamento

 let data = {
    nome: nome,
    telefone: telefone,
    consultora: consultora,
    tratamento: tratamento
  }

  db.collection("agendamento").insertOne(data, (err, collection) => {
    if (err) {
      throw err
    }
    console.log("Conectado com sucesso!")
  })
  return res.redirect("formSubmitted.html")
})



app.listen (port, () => {
  console.log(`Rodando na porta http://localhost:${port}`)
})
