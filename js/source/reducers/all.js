import * as SystemActionTypes from '../actiontypes/all';

const initialState = {

  data: [
    ['HSP', '4.510', '4.990', '4.050', '3.600', '3.190', '2.950', '3.210', '3.710', '3.740', '4.030', '4.990', '4.540'],
    ['Cons. (kWh)', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000','1000','1000'],
    ['Custo (R$)', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000','1000','1000'],
  ],

  cityHsp: {
    'São Paulo': ['4.510', '4.990', '4.050', '3.600', '3.190', '2.950', '3.210', '3.710', '3.740', '4.030', '4.990', '4.540'],
    'Santa Cruz do Rio Pardo': ['5.770', '5.460', '5.090', '4.550', '3.910', '3.690', '3.960', '4.510', '5.130', '5.480', '5.890', '6.270'],
    'Ourinhos': ['5.800', '5.480', '5.070', '4.530', '3.890', '3.640', '3.920', '4.510', '5.120', '5.490', '5.900', '6.290'],
    'Valinhos': ['5.330', '5.560', '5.220', '4.530', '4.060', '3.560', '4.190', '4.580', '4.750', '5.580', '5.860', '5.530'],
  },

  costumerData: [
    ['João', 'Pereira', '11 22987 2222', 'joaopereira@gmail.com', ''],
    ['Silvia', 'Joao', '11 3322 22332', 'silviajoao@gmail.com', ''],
  ],

  quotes: [
    ['João', 'Pereira', '8.3', '23/09/2017', 'R$ 985,00', 'Sent'],
    ['Silvia', 'Joao', '5.3', '01/09/2017', 'R$ 12.375,00', 'Follow-up-1'],
  ],


  // overall config system data / parent(here) -> child(many) -> parent(here)
  configData: {
    custokWh: 0.68,
    sombreamento: 0.00,
    azimute: 0.02,
    custoEng: 700,
    custoInsPlaca: 150,
    custoMisc: 0,
    custoEstSolo: 0,
    taxaDisp: 'Bi',
    custoIlumPub: 18,
    eSensor: true,
  },

  // overall calculations system data / parent(here) -> child
  systemData: {
    sysEstimation: 100,
    avgConsumption: 0.00,
    avgCost: 0.00,
    gerCost: 0.00,
    hspFinal: 3.90,
  },

  // result calculations / parent(here) -> child(many) -> parent(here)
  resultData: [ 
    {
      payback: 1,
      panels: 1,
      kitCost: 100,
      sysProposal: 0.00,
      ratio: 0.00,
      generation: 0.00,
      totalCost: 0.00,
    },
    {
      payback: 1,
      panels: 1,
      kitCost: 100,
      sysProposal: 0.00,
      ratio: 0.00,
      generation: 0.00,
      totalCost: 0.00,
    },
  ],

  dataGraph: [
    {name: 'Jan', Geração: 4000, Consumo: 2400 },
    {name: 'Fev', Geração: 3000, Consumo: 1398 },
    {name: 'Mar', Geração: 2000, Consumo: 3800 },
    {name: 'Abr', Geração: 2780, Consumo: 3908 },
    {name: 'Mai', Geração: 1890, Consumo: 4800 },
    {name: 'Jun', Geração: 2390, Consumo: 3800 },
    {name: 'Jul', Geração: 3490, Consumo: 4300 },
    {name: 'Ago', Geração: 3000, Consumo: 1398 },
    {name: 'Sep', Geração: 2000, Consumo: 3800 },
    {name: 'Out', Geração: 2780, Consumo: 3908 },
    {name: 'Nov', Geração: 1890, Consumo: 4800 },
    {name: 'Dez', Geração: 2390, Consumo: 3800 },
    {name: 'Média', Geração: 2390, Consumo: 3800 },
  ],


  selectedCostumer: -1,
  selectedResult: 0,
  selectedCity: 'São Paulo',
  proposalSent: false,
};

export default function System(state=initialState, action) {	

  console.log(state)
  console.log(action)
	
  switch (action.type) {
    case SystemActionTypes.UPDATE_DATA: 
    case SystemActionTypes.UPDATE_RESULT_DATA: // Always updating all. To avoid inconsistences 
    {

      const newData = state.data;
      
      //HSP
      let temp = 0;
      for (let i = 1; i < 13; i++) {
        temp += parseFloat(state.data[0][i]);
      }
      temp = temp/12;
      let hspFinal = temp;

      //AVG Consumption
      temp = 0;
      for (let i = 1; i < 13; i++) {
        temp += parseInt(state.data[1][i], 10);
      }
      temp = Math.ceil(temp/12);
      let avgConsumption = temp;

      //Custo conta - multiply consumo por valor do kWh
      temp = 0;
      let temp2 = 0;
      for (let i = 1; i < 13; i++) {
        temp2 = state.data[1][i] * state.configData.custokWh;     
        newData[2][i] = temp2.toFixed(0);
        temp += temp2;
      }
      // AVG
      temp = Math.ceil(temp/12);
      let avgCost = temp;

      //SYS Estimation
      temp = 0;
      let tempCostGer = 0;
      
      if (state.configData.taxaDisp == 'Bi') {

        // temp = media consumo kwh / HSP * Rendimento AP * dias 
        temp = (avgConsumption - 50) / (hspFinal * 0.9 * 30.41 * // Alterado em 30-09 incluindo as perdas
                                (1 - state.configData.sombreamento) *
                                (1 - state.configData.azimute)
        );

        // Custo mensal kwh com microgeracao
        tempCostGer = state.configData.custokWh * // hWh cost times...
                      (50 + // Tx disp
                      ((avgConsumption - 50) - // avg consumption -tx disp
                      state.resultData[0].generation)) + // Generation part
                      parseInt(state.configData.custoIlumPub); // plus public lighs
        console.log(state.configData.custokWh + ' *(50 + ((' + avgConsumption + '- 50) -' + state.resultData[0].generation + ')) + '+ parseInt(state.configData.custoIlumPub))

      } else if (state.configData.taxaDisp == 'Tri') {

        // temp = media consumo kwh / HSP * Rendimento AP * dias
        temp = (avgConsumption - 100) / (hspFinal * 0.9 * 30.41* // Alterado em 30-09 incluindo as perdas
                                (1 - state.configData.sombreamento) *
                                (1 - state.configData.azimute)
        );

        // Custo mensal kwh com microgeracao -same as above but with TRI tx disp
        tempCostGer = state.configData.custokWh *
                    (100 + ((avgConsumption - 100) - 
                    state.resultData[0].generation)) + 
                    parseInt(state.configData.custoIlumPub);
      }

      let sysEstimation = temp;
      let gerCost = tempCostGer;

      // End sys estimation

      const tempSystemData = {
        hspFinal: hspFinal,
        avgConsumption: avgConsumption,
        avgCost: avgCost,
        sysEstimation: sysEstimation,
        gerCost: gerCost,
      };

      // return {
      //   ...state,
      //   data: newData,
      //   systemData: tempSystemData,
      // };
         
      //}

      // case SystemActionTypes.UPDATE_RESULT_DATA: {

      let resultData = state.resultData;
      let systemData = state.systemData;
      let configData = state.configData;

      // Make calculations for both results
      for (let i = 0; i < resultData.length; i++) {
        resultData[i].generation = resultData[i].sysProposal * 
                        systemData.hspFinal *
                        30.41 *
                        0.9 *
                        (1 - configData.sombreamento) *
                        (1 - configData.azimute);
 
        resultData[i].ratio = 100 * resultData[i].generation / 
                        systemData.avgConsumption;
        
        resultData[i].totalCost = (parseInt(resultData[i].kitCost) * 1.35) +
                        (parseInt(resultData[i].panels) * parseInt(configData.custoInsPlaca) ) +
                        parseInt(configData.custoEng) +
                        parseInt(configData.custoMisc);

        resultData[i].payback= (resultData[i].totalCost / (resultData[i].generation * configData.custokWh) ) / 12;

        // console.log( resultData[i].payback, resultData[i].totalCost, resultData[i].generation, parseFloat(configData.custokWh), configData.custokWh );

      }            

      return {
        ...state,
        data: newData,
        systemData: tempSystemData,
        resultData: resultData,
      };
    }

    case SystemActionTypes.UPDATE_BAR_GRAPH: {

      let localDataGraph = state.dataGraph;
      let row = state.selectedResult;
     
      if (row < 0) 
        row = 0; 

      // Calculate generation and load consumption for each month
      localDataGraph.map((element, index) => {
        if (index < 12) {
          element.Geração = parseInt(state.resultData[row].sysProposal * 
                        parseFloat(state.data[0][index+1]) * // Each month HSP
                        30.41 *
                        0.9 *
                        (1 - state.configData.sombreamento) *
                        (1 - state.configData.azimute));
          element.Consumo = parseInt(state.data[1][index+1]);
        } else {
          element.Geração = parseInt(state.resultData[row].generation);
          element.Consumo = parseInt(state.systemData.avgConsumption);
        }

      })    

      return {
        ...state,
        dataGraph: localDataGraph,
      };
    }

    case SystemActionTypes.UPDATE_SELECTED_RESULT: {
      return {
        ...state,
        selectedResult: action.row - 1, // Selected row in result panel
      };
    }

    case SystemActionTypes.UPDATE_CITY_HSP: {

      const newData = state.data;

      Object.keys(state.cityHsp).map(city => {
        if (city === action.city) {
          for (let i = 0; i < 12; i++) {
            newData[0][i+1] = state.cityHsp[city][i];
          }
        }
      })

      return {
        ...state,
        data: newData,
        selectedCity: action.city, // Selected row in result panel
      };
    }

    case SystemActionTypes.PROPOSAL_SENT: {
      
      const quotes = state.quotes;

      quotes.push([
        action.name, 
        action.lastName, 
        action.sysProposal, 
        action.timeNow, 
        action.totalCost,
        action.status,
      ]);

      return {
        ...state,
        quotes: quotes,
        proposalSent: true,
      };
    }

    //THUNK
    case SystemActionTypes.ITEMS_FETCH_DATA_SUCCESS: {

      console.log('SUCESS FETCH', action.items);

      const costumerData = []; //state.costumerData.slice();

      action.items.forEach(function(element) {
        const tempData = [
          element.firstName, 
          element.lastName, 
          element.contactNumber, 
          element.email,
          '',
        ];
        costumerData.push(tempData);
      }, this);

      console.log(costumerData)

      return {
        ...state,
        costumerData: costumerData,
      };
    }

    case SystemActionTypes.ITEMS_POST_DATA_SUCCESS: {
      
      console.log('SUCESS POST', action.result);
      
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}
