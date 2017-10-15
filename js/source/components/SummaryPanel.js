import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const SummaryPanel = props => {
  return (
    <div>
      <Table striped={true} bordered={true} condensed={true} hover={true}>
        <thead>
          <tr>
            <th>Resumo </th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Média Conta Atual (kWh)</td>
            <td>{props.systemData.avgConsumption}</td>
          </tr>
          <tr>
            <td>HSP</td>
            <td>{props.systemData.hspFinal.toFixed(3).replace('.', ',')}</td>
          </tr>
          <tr>
            <td>Média Conta Atual (R$)</td>
            <td className={'resultadoGeracao'}>{props.systemData.avgCost}</td>
          </tr>
          <tr>
            <td>Estimativa Geração Mensal Neces. (kWp)</td>
            <td className={'resultadoGeracao'}>{props.systemData.sysEstimation.toFixed(1).replace('.', ',')}</td>
          </tr>

          <tr>
            <td>Conta com Geração (R$)</td>
            <td className={'resultadoGeracao'}>{props.systemData.gerCost.toFixed(2).replace('.', ',')}</td>
          </tr>
          <tr>
            <td>Payback (anos)</td>
            <td className={'resultadoGeracao'}>{props.resultData[props.selectedResult].payback.toFixed(1).replace('.', ',')}</td>
          </tr>                
        </tbody>
      </Table>
      <h5>Obs.</h5>
      <p>Estimativas.</p>
    </div>
  );
}

SummaryPanel.Proptypes = {
  resultData: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  systemData: PropTypes.object.isRequired,
  selectedResult: PropTypes.number,
};

export default SummaryPanel;
