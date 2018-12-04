'"use strict';


const controller_conta = require("../controllers/controller-conta.js");

module.exports = (app) => {

    app.get('/', (req, res, next) => {
        controller_conta.getAllContas(req, res, next);
    });

    app.post('/api/conta', (req, res, next) => {
        controller_conta.criarNovaConta(req, res, next);
    });

    app.put('/api/deposito', (req, res, next) => {
        controller_conta.depositoConta(req, res, next);
    });

    app.get('/api/conta/:id', (req, res, next) => {
        controller_conta.saldoConta(req, res, next);
    });

    app.put('/api/saque', (req, res, next) => {
        controller_conta.saqueConta(req, res, next);
    });

    app.get('/api/bloqueio/:id', (req, res, next) => {
        controller_conta.bloqueioConta(req, res, next);
    });

    app.get('/api/desbloqueio/:id', (req, res, next) => {
        controller_conta.desbloqueioConta(req, res, next);
    });

    app.get('/api/extrato/:id', (req, res, next) => {
        controller_conta.extratoConta(req, res, next);

    });

}