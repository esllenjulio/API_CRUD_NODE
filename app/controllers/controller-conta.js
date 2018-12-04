var model = require("../models/model")();



//  ------------------------------------------------------------------------------------------------------------
//  METODO USADO PARA BUSCAR TODOS AS CONTAS CADASTRADAS

module.exports.getAllContas = (req, res, next) => {

    model.getAllContas(req.body, (err, results, fields) => {

        try {
            if (err) {
                console.log("ERRO: " + err);
                res.sendStatus(500);
            }
            if (results) {
                res.send(results);
            }
        } catch (error) {
            console.log(error);
        }
    });
};
// FIM CRIAR CONTA


//---------------------------------------------------------------------------------------------------------------


// METODO USADO PARA CRIAR UMA NOVA CONTA 

module.exports.criarNovaConta = (req, res, next) => {

    model.novaConta(req.body, (err, results, fields) => {

        try {
            if (err) {
                console.log("ERRO: " + err);
                res.sendStatus(500);
            }
            if (results) {
                res.send(results[0]);
            }
        } catch (error) {
            console.log(error);
        }
    });
};
// FIM CRIAR CONTA

//---------------------------------------------------------------------------------------------------------------

// METODO USADO PARA REALIZAR O DEPOISITO NA CONTA

module.exports.depositoConta = (req, res, next) => {

    model.depositoConta(req.body, (err, results, fields) => {

        try {
            if (err) {
                console.log("ERRO: " + err);
                res.sendStatus(500);
            }
            if (results) {
                res.send(results[0]);
            }
        } catch (error) {
            console.log(error);
        }
    });
};
// FIM DEPOSITO


//---------------------------------------------------------------------------------------------------------------

// MODULO USADO PARA REALIZAR 
// O SAQUE NA CONTA

module.exports.saqueConta = (req, res, next) => {

    model.saqueConta(req.body, (err, results, fields) => {

        try {
            if (err) {
                console.log("ERRO: " + err);
                res.sendStatus(500);
            }
            if (results) {
                if (results == "") {
                    res.json({ msg: "Não encontrado" }).sendStatus(404);
                } else {
                    res.send(results[0]);
                }
            }
        } catch (error) {
            console.log(error);
        }
    });
};
//FIM SAQUE

//---------------------------------------------------------------------------------------------------------------

// MODULO USADO PARA REALIZAR O 
// SALDO DA CONTA PELO ID DA CONTA

module.exports.saldoConta = (req, res, next) => {

    model.saldoConta(req.params.id, (err, results, fields) => {

        try {
            if (err) {
                console.log("ERRO: " + err);
                res.sendStatus(500);
            }
            if (results) {
                if (results == "") {
                    res.json({ msg: "Não encontrado" }).sendStatus(404);
                } else {
                    res.send(results[0]);
                }
            }
        } catch (error) {
            console.log(error)
        }
    });
};
// FIM METODO SALDO CONTA

//---------------------------------------------------------------------------------------------------------------


// MODULO USADO PARA FAZER O 
// BLOQUEIO DA CONTA PELO ID 

module.exports.bloqueioConta = (req, res, next) => {

    model.bloqueioConta(req.params.id, (err, results, fields) => {

        try {
            if (err) {
                console.log("ERRO: " + err);
                res.sendStatus(500);
            }
            if (results.affectedRows == 0) {
                res.json({ msg: " Cliente Não encontrado" }).sendStatus(404);
            } else if (results.affectedRows > 0) {
                res.json({ msg: "Cliente bloqueado" });
            }

        } catch (error) {
            console.log(error)
        }
    });
};
// FIM MODULO BLOQUEIO

//---------------------------------------------------------------------------------------------------------------

// MODULO USADO PARA FAZER O 
// DESBLOQUEIO DA CONTA PELO ID 

module.exports.desbloqueioConta = (req, res, next) => {

    model.desbloqueioConta(req.params.id, (err, results, fields) => {

        try {
            if (err) {
                console.log("ERRO: " + err);
                res.sendStatus(500);
            }
            if (results.affectedRows == 0) {
                res.json({ msg: " Cliente Não encontrado" }).sendStatus(404);
            } else if (results.affectedRows > 0) {
                res.json({ msg: "Cliente desbloqueado" });
            }

        } catch (error) {
            console.log(error)
        }
    });
};
// FIM MODULO BLOQUEIO

//---------------------------------------------------------------------------------------------------------------

// Modulo utilizado para realizar o 
// extrato pelo id da conta do usuario

module.exports.extratoConta = (req, res, next) => {

    model.extratoConta(req.params.id, (err, results, fields) => {

        try {
            if (err) {
                console.log("ERRO: " + err);
                res.sendStatus(500);
            }
            if (results) {
                if (results == "") {
                    res.json({ msg: "Não encontrado" }).sendStatus(404);
                } else {
                    calcular(results);
                }
            }
        } catch (error) {
            console.log(error);
        }

    });


    function calcular(results) {

        let valorAtual = results[0].valor;
        for (let i in results) {

            let saldoAnterior = { "saldoAnterior": '' };
            Object.assign(results[i], saldoAnterior);

            if (results[i].tipo == "Deposito") {
                results[i].saldoAnterior = valorAtual;
                results[i].saldoAtual = results[i].valor + valorAtual;
                valorAtual = results[i].saldoAtual;
            }
            else if (results[i].tipo == "Saque") {
                results[i].saldoAnterior = valorAtual;
                results[i].saldoAtual = valorAtual - results[i].valor;
                valorAtual = results[i].saldoAtual;
            }
        }

        res.send(results)

    }

    // Fim Modulo extrato 


};

