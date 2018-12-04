"use strict";

var db = require('../../config/db');

module.exports = () => {


    this.getAllContas = (dados, retorno) => {

        let con = db();
        let query = con.query(`
                                SELECT 
                                c.idConta as idConta,
                                c.saldo as saldoAtual,
                                c.limiteSaqueDiario as limiteSaqueDiario,
                                c.flagAtivo as Ativo,
                                c.tipoConta as tipoConta, 
                                c.dataCriacao as dataCriacao,
                                p.idPessoa as idPessoa,
                                p.nome as nome,
                                p.cpf as cpf,
                                p.dataNascimento
                                
                                FROM 
                                tb_contas c, tb_pessoa p 
                                WHERE c.idPessoa = p.idPessoa;`, retorno);
        con.end();
        return query;
    }


    this.novaConta = (dados, retorno) => {

        let con = db();
        let query = con.query(`call CRIAR_CONTA('${dados.nome}', '${dados.cpf}', '${dados.dataNascimento}');`, retorno);
        con.end();
        return query;
    }


    this.depositoConta = (dados, retorno) => {
        let con = db();
        let query = con.query(`call DEPOSITO_CONTA('${dados.idConta}', '${dados.valor}');`, retorno);
        con.end();
        return query;

    }

    this.saqueConta = (dados, retorno) => {
        let con = db();
        let query = con.query(`call SAQUE_CONTA('${dados.idConta}', '${dados.valor}');`, retorno);
        con.end();
        return query;

    }

    this.saldoConta = (id, retorno) => {
        let con = db();
        let query = con.query(`select saldo as saldoAtual from tb_contas where idConta = ?`, id, retorno);
        con.end();
        return query;

    }


    this.bloqueioConta = (id, retorno) => {

        let con = db();
        let query = con.query(`UPDATE tb_contas set flagAtivo = 0 where idConta = ?`, id, retorno);
        con.end();
        return query;

    }


    this.desbloqueioConta = (id, retorno) => {

        let con = db();
        let query = con.query(`UPDATE tb_contas set flagAtivo = 1 where idConta = ?`, id, retorno);
        con.end();
        return query;

    }

    this.extratoConta = (id, retorno) => {

        let con = db();
        let query = con.query(`
                                select 
                                        t.idTransacao as idTransacao,
                                        t.dataTransacao as dataTransacao,
                                        i.tipoTransacao as tipo,
                                        CAST(t.valor AS DECIMAL(10,2)) as valor,
                                        CAST(c.saldo AS DECIMAL(10,2)) as saldoAtual
                                from 
                                      tb_transacoes t, tb_contas c, tb_tipoTransacoes i
                                where t.idConta = c.idConta
                                    and  t.id_tipoTransacoes = i.idTipo
                                    and c.idConta = ?`, id, retorno);
        con.end();
        return query;

    }

    return this;
}