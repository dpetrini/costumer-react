import React from 'react'

import '../../../css/components/PricingContainer.css';

const PricingContainer = props => {
  return (
    <div className={'container-fluid'}>
      <div className={'text-center'}>
        <h2>Preços</h2>
        <h4>Escolha uma forma de pagamento que melhor lhe atende:</h4>
      </div>
      <div className={'row'}>
        <div className={'col-sm-4'}>
          <div className={'panel panel-default text-center'}>
            <div className={'panel-heading'}>
              <h1>Basic</h1>
            </div>
            <div className={'panel-body'}>
              <p><strong>20</strong> Propostas mensais</p>
              <p><strong>20</strong> Clientes</p>
              <p><strong>2</strong> Usuários</p>
              <p><strong>Infinitos</strong> Follow-ups</p>
              <p><strong>Infinitos</strong> Acessos</p>
            </div>
            <div className={'panel-footer'}>
              <h3>$29</h3>
              <h4>por mês</h4>
              <button className={'btn btn-lg'}>Assine Já</button>
            </div>
          </div> 
        </div> 
        <div className={'col-sm-4'}>
          <div className={'panel panel-default text-center'}>
            <div className={'panel-heading'}>
              <h1>Pro</h1>
            </div>
            <div className={'panel-body'}>
              <p><strong>50</strong> Propostas mensais</p>
              <p><strong>50</strong> Clientes</p>
              <p><strong>5</strong> Usuários</p>
              <p><strong>Infinitos</strong> Follow-ups</p>
              <p><strong>Infinitos</strong> Acessos</p>
            </div>
            <div className={'panel-footer'}>
              <h3>$49</h3>
              <h4>por mês</h4>
              <button className={'btn btn-lg'}>Assine Já</button>
            </div>
          </div> 
        </div> 
        <div className={'col-sm-4'}>
          <div className={'panel panel-default text-center'}>
            <div className={'panel-heading'}>
              <h1>Premium</h1>
            </div>
            <div className={'panel-body'}>
              <p><strong>Infinitas</strong> Propostas mensais</p>
              <p><strong>Infinitas</strong> Clientes</p>
              <p><strong>20</strong> Usuários</p>
              <p><strong>Infinitos</strong> Follow-ups</p>
              <p><strong>Infinitos</strong> Acessos</p>
            </div>
            <div className={'panel-footer'}>
              <h3>$79</h3>
              <h4>por mês</h4>
              <button className={'btn btn-lg'}>Assine Já</button>
            </div>
          </div> 
        </div> 
      </div>
    </div>
  );
}

export default PricingContainer;
