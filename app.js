//Carregando Módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');
const urlencodeParser=bodyParser.urlencoded({extended:false});
const app = express()
const mysql = require('mysql')
const path = require('path')
const session = require(__dirname+'/node_modules/express-session')
const passport = require('passport')
const crypto = require('crypto')
const flash = require("connect-flash")
require('./config/auth')(passport)
const {Logado} = require('./helpers/Logado')

//sessão
app.use(session({
    secret: "clinica",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Middleware
app.use((req, res, next) => {
    //mensagens ao usuario
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    //armazena dados do usuário autenticado
    res.locals.user = req.user || null;
    next()
})
//Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

//mysql
const sql=mysql.createConnection({
    host:'192.168.0.18',
    user:'master',
    password:'master',
    port:3306
})

//Escolher banco
sql.query('use clinica')

//public
app.use(express.static(path.join(__dirname,"public")))
//ASSETS
        //IMG
        app.use('/img',express.static('public/img'));
        //CSS
        app.use('/css',express.static('public/css'));
        //JS
        app.use('/js',express.static('public/js'));

//<<<<ROTAS>>>>
//PRINCIPAL
app.get('/', (req, res) =>{
    res.render('login')
})

//HOME
app.get('/home',Logado,(req,res)=>{
    res.render('home')
})

app.post('/home',urlencodeParser,Logado,(req,res)=>{
    if(![req.body.nome]){
        res.render('home')
    }else{
        sql.query("select * from paciente where (nome like '%"+[req.body.nome]+"%' or rg like '%"+[req.body.nome]+"%' or cpf like '%"+[req.body.nome]+"%' or id like '%"+[req.body.nome]+"%') order by id desc",(err,results,fields)=>{
            if(!results){
                console.log("error_msg","Não foram encontrados resultados para essa pesquisa!")
                res.render('home')
                return
            }         
            res.render('home',{data: results})
            console.log("success_msg","foram encontrados resultados para essa pesquisa!")     
            
        })
    }
})

//LOGIN
app.get('/login',(req,res)=>{
    res.render('login')
})

//LOGAR
app.post('/logar', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true
    })(req,res,next)
})

//LOGOUT
app.get('/logout',(req,res)=>{
    req.logout()
    req.flash('success_msg', "Deslogado com sucesso")
    res.redirect('/')
})

//CADASTRAR
app.post('/cadastrar',urlencodeParser,Logado,(req,res)=>{
    //VALIDAÇÕES
    var erros = []
    //NOME
    if(!check(req.body.nome).isString()){
        erros.push({texto: "Não são permitidos caracteres especiais"})
    }
    //Telefone
    var str = req.body.tel;
    var busca = eval(/\(/gi);
    var tel = str.replace(busca,"");
    var busca = eval(/\)/gi);
    var tel = str.replace(busca,"");
    var busca = eval(/-/gi);
    var tel = str.replace(busca,"");

    if(!check(tel).isString()){
        erros.push({texto: "Não são permitidos caracteres especiais"})
    }
    //RG
    var str = req.body.rg
    var rg = str.replace(/./gi,'')
    if(!check(rg).isString()){
        erros.push({texto: "Não são permitidos caracteres especiais"})
    }
    //CPF
    var str = req.body.cpf
    var ponto = str.replace(/./gi,'')
    var cpf = ponto.replace(/-/gi,'')
    if(!check(cpf).isString()){
        erros.push({texto: "Não são permitidos caracteres especiais"})
    }
    //NASC
    var str = req.body.nasc
    var nasc = str.replace(/\//gi,'')
    if(!check(nasc).isString()){
        erros.push({texto: "Não são permitidos caracteres especiais"})
    }
    //SEXO
    if(!check(req.body.sexo).isString()){
        erros.push({texto: "Não são permitidos caracteres especiais"})
    }
    //NATURALIDADE
    if(!check(req.body.naturalidade).isString()){
        erros.push({texto: "Não são permitidos caracteres especiais"})
    }
    //UF
    if(!check(req.body.uf).isString()){
        erros.push({texto: "Não são permitidos caracteres especiais"})
    }
    //PROFISSÃO
    if(!check(req.body.profissao).isString()){
        erros.push({texto: "Não são permitidos caracteres especiais"})
    }
    //ENDERECO
    if(!check(req.body.endereco).isString()){
        erros.push({texto: "Não são permitidos caracteres especiais"})
    }
    
    if(erros.length > 0){
        req.flash('error_msg','Há erros nas informações do formulário preencha novamente!')
        res.redirect('/home')
    }else{
        sql.query("insert into paciente values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[
            req.body.id,
            req.body.nome,
            req.body.tel,
            req.body.id,
            req.body.id,
            req.body.rg,
            req.body.id,
            req.body.cpf,
            req.body.nasc,
            req.body.sexo,
            req.body.naturalidade,
            req.body.uf,
            req.body.id,
            req.body.id,
            req.body.profissao,
            req.body.endereco,
            req.body.id,
            req.body.id,
            req.body.id,
            req.body.id,
            req.body.id,
            req.body.id,
            req.body.id,
            req.body.id,
            req.body.id
        ])
        req.flash("success_msg", "Dados salvos com sucesso!")
        res.redirect('/home')
    }
})

//ATUALIZAR
app.get('/update/:id',Logado,(req,res)=>{
    sql.query("select * from paciente where id=?",[req.params.id],(err,results,fields)=>{
        res.render('update',{
            id:results[0].id,
            nome:results[0].nome,
            telefone:results[0].telefone1,
            profissao:results[0].profissao,
            endereco:results[0].errua
        })
    })
})
app.post('/update',Logado,(req,res)=>{
    sql.query("update paciente set nome=?, telefone1=?, profissao=?, errua=? where id=?",
    [
        req.body.nome,
        req.body.tel,
        req.body.profissao,
        req.body.endereco,
        req.body.id
    ])
    req.flash("success_msg","Dados atualizados com sucesso!")
    res.redirect('/home')
})

//APAGAR
app.get('/deletar/:id',Logado,(req,res)=>{
    sql.query("delete from paciente where id=?",[req.params.id])
    req.flash("success_msg","Cadastro deletado com sucesso!")
    res.redirect('/home')
})

//ERROR
app.get('/404', (req,res)=>{
    res.send('erro 404!')
})

//INICIANDO APLICAÇÃO
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor Rodando! Acesse: http://localhost:8081")
})